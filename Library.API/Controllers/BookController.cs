using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Library.API.Data;
using Library.API.Models;

namespace Library.API.Controllers;

[ApiController]
[Route("api/[controller]")] // This makes the URL endpoint: api/books
public class BooksController(AppDbContext db) : ControllerBase
{
    // 1. GET Request: Fetches all books from the database for your frontend
    [HttpGet]
    public async Task<IEnumerable<Book>> Get() =>
        await db.Books.AsNoTracking().ToListAsync();

    // 2. POST Request: Takes a new book sent from your HTML form and saves it
    [HttpPost]
    public async Task<IActionResult> Create(Book book)
    {
        db.Books.Add(book);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
    }
}