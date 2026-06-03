using Microsoft.AspNetCore.Mvc;
using Library.API.Models;
using Library.API.Services;

namespace Library.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET api/books?search=harry
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search)
        {
            var books = await _bookService.GetAllAsync(search);
            return Ok(books);
        }

        // GET api/books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var book = await _bookService.GetByIdAsync(id);
            if (book is null) return NotFound();
            return Ok(book);
        }

        // GET api/books/isbn/978-3-16-148410-0
        [HttpGet("isbn/{isbn}")]
        public async Task<IActionResult> GetByISBN(string isbn)
        {
            var book = await _bookService.GetByISBNAsync(isbn);
            if (book is null) return NotFound();
            return Ok(book);
        }

        // POST api/books
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Book book)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _bookService.CreateAsync(book);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT api/books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _bookService.UpdateAsync(id, book);
            if (updated is null) return NotFound();
            return Ok(updated);
        }

        // DELETE api/books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _bookService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        // DELETE api/books/all
        [HttpDelete("all")]
        public async Task<IActionResult> DeleteAll()
        {
            await _bookService.DeleteAllAsync();
            return NoContent();
        }
    }
}