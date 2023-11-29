using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WhishListReact.Server.Models
{
     public enum StatusEnum
     {
        Wanted = 0,
        Reserved = 1,
        Owned = 2,
     }

    public class Item
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        [System.Text.Json.Serialization.JsonIgnore]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("category")]
        public string Category { get; set; }
        [JsonProperty("price")]
        public string? Price { get; set; }
        [JsonProperty("rate")]
        public float Rate { get; set; }
        [JsonProperty("link")]
        public string? Link { get; set; }
        [JsonProperty("status")]
        [JsonConverter(typeof(StringEnumConverter))] 
        [BsonRepresentation(BsonType.String)] 
        public StatusEnum? Status { get; set; } = StatusEnum.Wanted;

        //Need a default constructor for JSON conversion 
        public Item()
        { }

        public Item(int id, string name, string category, string price, float rate, string link, StatusEnum status)
        {
            Id = id;
            Name = name;
            Category = category;
            Price = price;
            Rate = rate;
            Link = link;
            Status = status;
        }

        public Item(string name, string category, string price, float rate, string link, StatusEnum status)
        { 
            Name = name;
            Category = category;
            Price = price;
            Rate = rate;
            Link = link;
            Status = status;
        }

        public Item(string name, string category, string price, float rate, string link)
        { 
            Name = name;
            Category = category;
            Price = price;
            Rate = rate;
            Link = link;
        }

        public Item(string name, string category, string price, float rate, StatusEnum status)
        {
            Name = name;
            Category = category;
            Price = price;
            Rate = rate;
            Status = status;
        }

        public Item(string name, string category, string price, StatusEnum status)
        {
            Name = name;
            Category = category;
            Price = price;
            Status = status;
        }
    }
}
