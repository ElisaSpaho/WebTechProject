# Library Web App

A full-stack library management system built with **HTML, CSS, JavaScript, ASP.NET Core Web API, Entity Framework Core, and PostgreSQL**.  
The application allows administrators to manage books and provides a customer-facing view, while book covers are automatically retrieved using the Open Library API.

---

## Features

### Admin Dashboard
- Add new books to the library
- Edit existing book details
- Delete books from the system
- Manage book information:
  - Title
  - Author
  - Price
  - ISBN

### Customer View
- Displays books in a card-based UI
- Shows book details and cover images
- Automatically loads covers using ISBN (Open Library API)
- Reflects real-time database data

### Bestsellers Page
- Displays New York Times Best Sellers
- Uses NYT Best Sellers API
- Shows trending books dynamically

---

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- ASP.NET Core Web API
- Entity Framework Core

### Database
- PostgreSQL

---

## APIs Used

### Open Library Covers API
Used to fetch book cover images using ISBN.

Example:
```text
https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg
```

- No API key required
- Fast image retrieval
- Reliable ISBN-based lookup

---

### New York Times Best Sellers API
Used to fetch current bestseller lists.

- Requires API key
- Returns JSON data of bestselling books

---

## Project Structure

```text
WEBTECHPROJECT/
│
├── Library.API/
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   ├── Models/
│   ├── Services/
│   ├── Properties/
│   ├── wwwroot/
│   ├── Program.cs
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── Library.API.csproj
│   └── Library.API.http
│
├── test-data/
│   └── isbns.txt
│
└── README.md
```

---

## Database Setup

This project uses **Entity Framework Core with PostgreSQL**.

### Important Note
The database is created and updated automatically using EF Core migrations when the application starts.

---

### Steps

1. Make sure PostgreSQL is installed and running.

2. Update the connection string in:

```text
appsettings.json
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=librarydb;Username=postgres;Password=your_password"
  }
}
```

3. Run the application:

```bash
dotnet run
```

The application will:
- Connect to PostgreSQL
- Apply pending migrations automatically
- Create/update database tables if needed

---

## How to Run the Project

### 1. Backend (API)
```bash
cd Library.API
dotnet run
```

### 2. Frontend
Open any of the following files in a browser:
- `index.html` (Admin Dashboard)
- `customer.html` (Customer View)
- `bestsellers.html` (NYT Bestsellers)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get book by ID |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/{id}` | Update a book |
| DELETE | `/api/books/{id}` | Delete a book |

---

## Testing

Sample ISBN data is available in:

```text
test-data/isbns.txt
```

Used for:
- Testing book creation
- Verifying database persistence
- Checking Open Library cover loading

---

## Notes

- Books are stored permanently in PostgreSQL
- No local storage is used
- Book covers are dynamically loaded via Open Library API
- Database schema is managed using EF Core migrations

---

## License

This project is for educational purposes only.