using Microsoft.AspNetCore.Mvc;
using WhishListReact.Server.Models;
using WhishListReact.Server.Services;

namespace WhishListReact.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController(ItemService itemService) : ControllerBase
    {
        [HttpGet(Name = "GetItems")]
        public async Task<List<Item>> Get()
        {
            return await itemService.GetItems();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Item item)
        {
            var id = await itemService.AddItemAsync(item);
            return CreatedAtAction(nameof(Get), new { id });
        }

        [HttpPost]
        [Route("AddMany")]
        public async Task<IActionResult> Post([FromBody] List<Item> items)
        {
            var id = await itemService.AddItemAsync(items);
            return CreatedAtAction(nameof(Get), new { id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] Item item)
        {
            await itemService.UpdateItem(id, item);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await itemService.DeleteItems(i => i.Id == id);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}
