using Microsoft.AspNetCore.Mvc;
using WhishListReact.Server.Models;
using WhishListReact.Server.Services;

namespace WhishListReact.Server.Controllers
{
    [Controller]
    [Route("[controller]")]
    public class ItemController(ItemService itemService) : Controller
    {
        [HttpGet]
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
