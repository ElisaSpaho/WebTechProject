function loadBookInfo() {
    const bookISBN = localStorage.getItem('bookToDeleteISBN').trim();

    if (!bookISBN) {
        alert('No book selected for deletion');
        window.location.href = 'index.html';
        return;
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.bookISBN === bookISBN);

    if (!book) {
        alert('Book not found !');
        window.location.href = 'index.html';
        return;
    }

    // Display book info
    document.getElementById('infoTitle').textContent = book.bookTitle;
    document.getElementById('infoISBN').textContent = book.bookISBN;
    document.getElementById('infoAuthor').textContent = book.authorName;
}

function confirmDelete() {
    const bookISBN = localStorage.getItem('bookToDeleteISBN');
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // Filter out the book to delete
    const updatedBooks = books.filter(b => b.bookISBN !== bookISBN);


    localStorage.setItem('books', JSON.stringify(updatedBooks));
    localStorage.removeItem('bookToDeleteISBN'); // Clean up

    alert('Book deleted successfully!');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    loadBookInfo();

    const deleteBtn = document.getElementById('confirmDeleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', confirmDelete);
    }
});