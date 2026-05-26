using Microsoft.EntityFrameworkCore;
using Library.API.Models;

namespace Library.API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // This maps your Book class to a "Books" table in PostgreSQL
    public DbSet<Book> Books => Set<Book>();
}