using System.Linq.Expressions;
using WhishListReact.Server.Models;

namespace WhishListReact.Server.Services
{
    public class ItemService
    {
        private readonly MongoDbService _dbService;
        private int _itemCount;

        public ItemService(MongoDbService dbService)
        {
            _dbService = dbService;

            var result = dbService.GetRecords<Item>();
            _itemCount = result.Count();
        }

        /// <summary>
        /// Add a new item in the DB 
        /// </summary>
        /// <param name="item">The item to be added</param>
        /// <returns>The item's id generated</returns>
        public async Task<int> AddItemAsync(Item item)
        {
            item.Id = ++_itemCount;
            await _dbService.InsertRecordAsync(item);
            return _itemCount;
        }

        public async Task<int> AddItemAsync(List<Item> items)
        {
            foreach (var item in items)
            {
                item.Id = ++_itemCount;
            }

            await _dbService.InsertManyRecordAsync(items);
            return _itemCount;
        }

        public async Task<List<Item>> GetItems(Expression<Func<Item, bool>>? filter = null)
        {
            return await _dbService.GetRecordsAsync<Item>(filter);
        }

        public async Task<int> DeleteItems(Expression<Func<Item, bool>> filter)
        {
            return await _dbService.DeleteRecordsAsync(filter);
        }

        public async Task UpdateItem(int id, Item item)
        {
            await _dbService.UpsertAsync(item, i => i.Id == id);
        }
    }
}
