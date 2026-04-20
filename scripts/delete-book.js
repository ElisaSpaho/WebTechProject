function loadBookInfo() {
    const bookISBN = localStorage.getItem('bookToDeleteISBN')?.trim();

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
    $('#infoTitle').text(book.bookTitle);
    $('#infoISBN').text(book.bookISBN);
    $('#infoAuthor').text(book.authorName);
}

function confirmDelete() {
    const bookISBN = localStorage.getItem('bookToDeleteISBN');
    let books = JSON.parse(localStorage.getItem('books')) || [];

    const updatedBooks = books.filter(b => b.bookISBN !== bookISBN);


    localStorage.setItem('books', JSON.stringify(updatedBooks));
    localStorage.removeItem('bookToDeleteISBN');

    alert('Book deleted successfully!');
    window.location.href = 'index.html';
}

$(function() {
    loadBookInfo();

    $('#confirmDeleteBtn').on('click', confirmDelete);
});