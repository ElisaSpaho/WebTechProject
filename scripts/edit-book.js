document.addEventListener('DOMContentLoaded', function() {
    const bookISBN = localStorage.getItem('bookToEditISBN');
    if (!bookISBN) {
        alert('No book selected to edit');
        window.location.href = 'index.html';
        return;
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.bookISBN === bookISBN);

    if (!book) {
        alert('Book not found');
        window.location.href = 'index.html';
        return;
    }

    // Populate the form
    document.getElementById('bookTitle').value  = book.bookTitle;
    document.getElementById('bookISBN').value   = book.bookISBN;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('bookGenre').value  = book.bookGenre;
    document.getElementById('bookPrice').value  = book.bookPrice;

    // Handle form submission
    // Ensure form ID matches HTML
    const form = document.getElementById('editMemberForm'); // your HTML ID
    if (!form) {
        console.error('Form element not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Update the book object
        book.bookTitle  = document.getElementById('bookTitle').value;
        book.bookISBN   = document.getElementById('bookISBN').value;
        book.authorName = document.getElementById('authorName').value;
        book.bookGenre  = document.getElementById('bookGenre').value;
        book.bookPrice  = document.getElementById('bookPrice').value;

        localStorage.setItem('books', JSON.stringify(books));
        localStorage.removeItem('bookToEditISBN');

        alert('Book updated successfully!');
        window.location.href = 'index.html';
    });
});