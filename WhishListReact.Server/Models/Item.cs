using System.Text.Json.Serialization;
using MongoDB.Bson.Serialization.Attributes;

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
        [JsonIgnore]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string? Price { get; set; }
        public float Rate { get; set; } = 0;
        public string? Link { get; set; }
        public StatusEnum Status { get; set; } = StatusEnum.Wanted;

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
