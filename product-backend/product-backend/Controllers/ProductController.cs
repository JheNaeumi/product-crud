
using Microsoft.AspNetCore.Mvc;
using product_backend.Dto;
using product_backend.Models;
using product_backend.Service;

namespace product_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        [Route("CreateProduct")]
        public async Task<ActionResult<Product>> CreateProduct(ProductDto productDto) {
            
            var product = await _productService.CreateProduct(productDto);
            return product;

        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<ActionResult<List<Product>>> GetProducts() {

            var products = await _productService.GetProducts();
            return products;
          
        }

        [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDto productdto) {

            var result = await _productService.UpdateProduct(id, productdto);
            if (!result) { 
                
                return NotFound();

            }
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id) {

            var result = await _productService.DeleteProduct(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok();

        }
    }
}
