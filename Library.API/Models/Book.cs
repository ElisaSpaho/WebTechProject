namespace Library.API.Models
{
    public class Book
    {
        public int Id { get; set; }

        public string BookTitle { get; set; } = string.Empty;

        public string BookISBN { get; set; } = string.Empty;

        public string AuthorName { get; set; } = string.Empty;

        public decimal BookPrice { get; set; }

        public string Genre { get; set; } = string.Empty;
    }
}