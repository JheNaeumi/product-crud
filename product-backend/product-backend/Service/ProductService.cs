using Microsoft.EntityFrameworkCore;
using product_backend.Dto;
using product_backend.Models;

namespace product_backend.Service
{
    public class ProductService
    {
        private readonly ProductDbContext _Dbcontext;

        public ProductService (ProductDbContext dbcontext)
        {
            _Dbcontext = dbcontext;
        }
        public async Task<Product> CreateProduct(ProductDto productDto) {

            var product = new Product
            {
                name = productDto.name,
                description = productDto.description,
                price = productDto.price
            };
            _Dbcontext.Product.Add(product);
            await _Dbcontext.SaveChangesAsync();
            return product;
        }
        public async Task<List<Product>> GetProducts() { 
            
            return await _Dbcontext.Product.ToListAsync();
        
        }
        public async Task<bool> UpdateProduct(int id, ProductDto productDto) { 
            
            var product = await _Dbcontext.Product.FindAsync(id);
            if(product == null)
            {
                return false;
            }
            product.name = productDto.name;
            product.description = productDto.description;
            product.price = productDto.price;

            _Dbcontext.Entry(product).State = EntityState.Modified;
            await _Dbcontext.SaveChangesAsync();
            return true;

        }   
        public async Task<bool> DeleteProduct(int id) { 
            
            var product = await _Dbcontext .Product.FindAsync(id);
            if (product ==null)
            {
                return false;
            }
            _Dbcontext.Product.Remove(product);
            await _Dbcontext.SaveChangesAsync();   
            return true;
        }
    }
}
