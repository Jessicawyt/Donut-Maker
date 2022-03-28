namespace DonutMaker.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public virtual int DonutId { get; set; }
        public virtual Donut Donut { get; set; }

    }
}
