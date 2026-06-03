using Microsoft.EntityFrameworkCore;
using Library.API.Data;
using Library.API.Models;

namespace Library.API.Services
{
public class BookService : IBookService
{
private readonly AppDbContext _context;


    public BookService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Book>> GetAllAsync(string? search = null)
    {
        var query = _context.Books.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();

            query = query.Where(b =>
                b.BookTitle.ToLower().Contains(search) ||
                b.AuthorName.ToLower().Contains(search) ||
                b.Genre.ToLower().Contains(search)
            );
        }

        return await query.ToListAsync();
    }

    public async Task<Book?> GetByIdAsync(int id)
    {
        return await _context.Books
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<Book?> GetByISBNAsync(string isbn)
    {
        return await _context.Books
            .FirstOrDefaultAsync(b => b.BookISBN == isbn);
    }

    public async Task<Book> CreateAsync(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<Book?> UpdateAsync(int id, Book updated)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return null;
        }

        book.BookTitle = updated.BookTitle;
        book.BookISBN = updated.BookISBN;
        book.AuthorName = updated.AuthorName;
        book.BookPrice = updated.BookPrice;
        book.Genre = updated.Genre;

        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return false;
        }

        _context.Books.Remove(book);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task DeleteAllAsync()
    {
        _context.Books.RemoveRange(_context.Books);

        await _context.SaveChangesAsync();
    }
}


}
