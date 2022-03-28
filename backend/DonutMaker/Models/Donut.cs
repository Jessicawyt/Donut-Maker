using System.Collections.Generic;

namespace DonutMaker.Models
{
    public class Donut
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public virtual IEnumerable<Ingredient> Ingredients { get; set; }

    }
}
