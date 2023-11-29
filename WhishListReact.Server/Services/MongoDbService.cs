using System.Linq.Expressions;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using WhishListReact.Server.Models;

namespace WhishListReact.Server.Services
{
    public class MongoDbService
    {
        #region private

        private readonly object _locker = new();
        private IMongoDatabase? _database;
        private MongoClient? _client;
        private readonly ILogger<MongoDbService> _logger;

        //Use to store all collection
        private readonly Dictionary<string, object>? _collectionFactory;

        #endregion

        #region Prop
        public bool MongoDbStartedOk { get; }

        #endregion

        public MongoDbService(ILogger<MongoDbService> logger, IOptions<MongoDBSettings> settings)
        {
            _logger = logger;
            try
            {
                _collectionFactory = new Dictionary<string, object>();
                MongoDbStartedOk = InitMongoDb(settings.Value);

                if (MongoDbStartedOk)
                    _logger.LogInformation("MongoDB initialized OK.");
                else
                    _logger.LogError("Error. Failed to init Mongo DB.");
            }
            catch (Exception? ex)
            {
                _logger.LogError(ex, $"Exception in InitMongoDB. {ex.Message}");
            }
        }

        #region InitMongo

        private bool InitMongoDb(MongoDBSettings settings)
        {
            try
            {
                _client = new MongoClient(settings.ConnectionURI);

                _database = _client.GetDatabase(settings.DatabaseName);

                if (_database == null)
                    return false;

                return _database.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait(1000);
            }
            catch (Exception? ex)
            {
                _logger.LogError(ex, $"Exception in InitMongoDB. {ex.Message}");
                return false;
            }
        }

        #endregion

        #region generic method for DB request

        /// <summary>
        /// Insert a record in a Mongo collection
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="record"></param>
        public async Task InsertRecordAsync<T>(T record)
        {
            try
            {
                RegisterCollection<T>();
                await ((IMongoCollection<T>)_collectionFactory![typeof(T).Name]).InsertOneAsync(record);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error - Cannot insert record of type {typeof(T)}:\r\n {ex}");
            }
        }

        /// <summary>
        /// Insert multiple record in MongoDB
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="records"></param>
        /// <returns></returns>
        public async Task InsertManyRecordAsync<T>(List<T> records)
        {
            try
            {
                RegisterCollection<T>();
                await ((IMongoCollection<T>)_collectionFactory![typeof(T).Name]).InsertManyAsync(records);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error - Cannot insert many record of type {typeof(T)}:\r\n {ex}");
            }
        }

        /// <summary>
        /// Upsert a record in a Mongo collection if no record match searchParam, new record is created
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="record"></param>
        /// <param name="condition"></param>
        public async Task UpsertAsync<T>(T record, Expression<Func<T, bool>>? condition)
        {
            try
            {
                RegisterCollection<T>();

                if (condition != null)
                {
                    await ((IMongoCollection<T>)_collectionFactory![typeof(T).Name]).ReplaceOneAsync<T>(condition,
                        record,
                        new ReplaceOptions { IsUpsert = true });
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Cannot update record of type {typeof(T)}:\r\n {ex}");
            }
        }

        /// <summary>
        /// Get Records from a specific collection. If searchParams == null => all records from the collection.
        /// </summary>
        /// <typeparam name="T">Object collection used</typeparam>
        /// <param name="filter">To filter the result</param>
        /// <returns></returns>
        public async Task<List<T>> GetRecordsAsync<T>(FilterDefinition<T>? filter = null)
        {
            try
            {
                RegisterCollection<T>();
                filter ??= Builders<T>.Filter.Empty;
                return (await ((IMongoCollection<T>)_collectionFactory![typeof(T).Name]).FindAsync(filter)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error - Cannot get records of type {typeof(T)}:\r\n {ex}");
            }
        }

        /// <summary>
        /// Get Records from a specific collection.
        /// </summary>
        /// <typeparam name="T">Object collection used</typeparam>
        /// <param name="condition">Lambda of the search expression</param>
        public IQueryable<T> GetRecords<T>(Expression<Func<T, bool>>? condition = null)
        {
            try
            {
                RegisterCollection<T>();

                if (condition != null)
                    return ((IMongoCollection<T>)_collectionFactory![typeof(T).Name]).AsQueryable()
                        .Where(condition);
                else
                    return ((IMongoCollection<T>)_collectionFactory![typeof(T).Name]).AsQueryable();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error - Cannot get records of type {typeof(T)}:\r\n {ex}");
            }
        }

        /// <summary>
        /// Delete record(s) matching searchParams.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="condition">Lambda of the search expression</param>
        public async Task<int> DeleteRecordsAsync<T>(Expression<Func<T, bool>> condition)
        {
            try
            {
                RegisterCollection<T>();
                var result =
                    await ((IMongoCollection<T>)_collectionFactory![typeof(T).Name]).DeleteManyAsync<T>(condition);
                return (int)result.DeletedCount;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error - Cannot delete record(s) of type {typeof(T)}:\r\n {ex}");
            }
        }

        public async Task<bool> DropOneCollectionAsync(string collection)
        {
            try
            {
                await _database!.DropCollectionAsync(collection);
                return true;
            }
            catch (Exception? ex)
            {
                _logger.LogError(ex, ex.Message);
                return false;
            }
        }

        #endregion

        #region factory

        /// <summary>
        /// Add the Collection to a dictionary based on object type to use generic CRUD
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="currentCollection"></param>
        private void AddToFactory<T>(IMongoCollection<T> currentCollection)
        {
            _collectionFactory!.Add(typeof(T).Name, currentCollection);
        }

        private void RegisterCollection<T>()
        {
            lock (_locker)
            {
                if (!_collectionFactory!.ContainsKey(typeof(T).Name))
                {
                        //Get Collections
                    var collection = _database!.GetCollection<T>(typeof(T).Name);
                    if (collection == null)
                    {
                        Console.WriteLine($"Cannot create \"{typeof(T).Name}\" collection in MongoDB database.");
                    }
                    else
                    {
                        //Add Collections To factory
                        AddToFactory(collection);
                    }
                }
            }
        }
        #endregion
    }
}
