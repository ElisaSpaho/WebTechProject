using Microsoft.EntityFrameworkCore;
using Library.API.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container
builder.Services.AddOpenApi();
builder.Services.AddControllers(); // Required to find your BooksController

// 2. Register your PostgreSQL Database Context
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql("Host=localhost; Port=5432; Database=WebTechProject; Username=postgres; Password=Eld@2006")); 

var app = builder.Build();

// 3. Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 4. Serve your HTML, CSS, and JS frontend files from wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

// 5. Map your API controller endpoints so your frontend can call them
app.MapControllers();

app.Run(); 