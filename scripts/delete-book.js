function loadBookInfo() {
    //optional chaining operator- If localStorage.getItem('bookToDeleteISBN') returns null (because nothing is stored), calling .trim() would throw an error
    //The ?. checks if the value exists before calling the method.
    //If it’s null or undefined, it just returns undefined instead of crashing.
    //If it exists (a string), it runs .trim() as usual.
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

    // Filter out the book to delete
    const updatedBooks = books.filter(b => b.bookISBN !== bookISBN);


    localStorage.setItem('books', JSON.stringify(updatedBooks));
    localStorage.removeItem('bookToDeleteISBN'); // Clean up

    alert('Book deleted successfully!');
    window.location.href = 'index.html';
}

$(function() {
    loadBookInfo();

    $('#confirmDeleteBtn').on('click', confirmDelete);
});