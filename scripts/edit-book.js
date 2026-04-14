$(function() {
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

    // ✅ Populate form fields
    $('#bookTitle').val(book.bookTitle);
    $('#bookISBN').val(book.bookISBN);
    $('#authorName').val(book.authorName);
    $('#bookGenre').val(book.bookGenre);
    $('#bookPrice').val(book.bookPrice);

    // ✅ Handle form submit
    $('#editMemberForm').on('submit', function(e) {
        e.preventDefault();

        book.bookTitle  = $('#bookTitle').val();
        book.bookISBN   = $('#bookISBN').val();
        book.authorName = $('#authorName').val();
        book.bookGenre  = $('#bookGenre').val();
        book.bookPrice  = $('#bookPrice').val();

        localStorage.setItem('books', JSON.stringify(books));
        localStorage.removeItem('bookToEditISBN');

        alert('Book updated successfully!');
        window.location.href = 'index.html';
    });
});