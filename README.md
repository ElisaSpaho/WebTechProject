# Library Web App

A front-end web application built with HTML, CSS, and JavaScript that allows a library owner to manage books and preview how they appear to customers.

---

## Features

### Admin View
- Add, edit, and delete books
- Enter book details (title, author, price, ISBN)
### Customer View
- Displays books as cards
- Automatically loads book covers using ISBN
- Preview of the user-facing interface
### Bestsellers Page
Displays top books using the New York Times Best Sellers API


## APIs Used
**Open Library API**
Does not require an API key.It works by using the ISBN in a URL to directly return the book cover image.

**NYT Best Sellers API**
Requires an API key and returns a JSON list of current bestselling books.

 ## Project Structure
project-root/
├── scripts/
├── styles/
├── test-data/isbns.txt
├── index.html
├── add-book.html
├── edit-book.html
├── delete-book.html
├── customer.html
├── bestsellers.html


## How to use

1. Open `index.html` (Admin Dashboard)  
2. Add books using ISBN  
3. Edit or delete books  
4. Open `customer.html` to preview customer view  
5. Open `bestsellers.html` for NYT bestsellers  

---
## Testing 
Sample ISBNs are provided in: test-data/isbns.txt
