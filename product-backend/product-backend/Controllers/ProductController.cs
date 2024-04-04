using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using product_backend.Models;

namespace product_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDbContext _productDbContext;

        public ProductController(ProductDbContext productDbContext)
        {
            this._productDbContext = productDbContext;
        }

        [HttpPost]
        [Route("CreateProduct")]
        public async Task<Product> CreateProduct(Product product) {

            _productDbContext.Product.Add(product);
            await _productDbContext.SaveChangesAsync();
            return product;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts() {
            var products = await _productDbContext.Product.ToListAsync();
            return Ok(products);
        }

        [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(Product product) {
         
            _productDbContext.Entry(product).State = EntityState.Modified;
            await _productDbContext.SaveChangesAsync();
            return Ok(product);
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id) {
            var product = _productDbContext.Product.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _productDbContext.Product.Remove(product);
            await _productDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
