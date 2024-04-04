using System.ComponentModel.DataAnnotations;

namespace product_backend.Models
{
    public class Product
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string description { get; set; }
        [Required]
        public Double price { get; set; }

    }
}
