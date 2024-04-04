using Microsoft.EntityFrameworkCore;

namespace product_backend.Models
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Product { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = "server=127.0.0.1;port=3306;database=productDb;uid=root;password=LOLkilledBYM!";
            optionsBuilder.UseMySQL(connectionString);
        }
    }
}
