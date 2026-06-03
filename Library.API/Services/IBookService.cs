using Library.API.Models;

namespace Library.API.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllAsync(string? search = null);
        Task<Book?> GetByIdAsync(int id);
        Task<Book?> GetByISBNAsync(string isbn);
        Task<Book> CreateAsync(Book book);
        Task<Book?> UpdateAsync(int id, Book book);
        Task<bool> DeleteAsync(int id);
        Task DeleteAllAsync();
    }
}