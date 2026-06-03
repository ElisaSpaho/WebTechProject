using Microsoft.EntityFrameworkCore;
using Library.API.Data;
using Library.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// Services
builder.Services.AddScoped<IBookService, BookService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Controllers
builder.Services.AddControllers();

var app = builder.Build();

// Auto-migrate database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    try
    {
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.ToString());
    }
}

// Serve files from wwwroot
app.UseStaticFiles();

// CORS
app.UseCors("AllowAll");

// Authorization
app.UseAuthorization();

// Map API controllers
app.MapControllers();

app.Run();