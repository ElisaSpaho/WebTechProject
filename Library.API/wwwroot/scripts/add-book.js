function saveBookInfo(event) {

    event.preventDefault();

    let bookTitle      = $('#bookTitle').val();
    let bookISBN       = $('#bookISBN').val()?.trim();
    let authorName     = $('#authorName').val();
    let bookGenre      = $('#bookGenre').val();
    let bookPrice      = $('#bookPrice').val();

    console.log('Book Title:', bookTitle);

    let newBook = {
        bookTitle:          bookTitle,
        bookISBN:           bookISBN,
        authorName:         authorName,
        bookGenre:          bookGenre,
        bookPrice:          bookPrice,
    };

    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    console.log('New Book Object:', newBook);

    alert('Book information saved successfully!');
    window.location.href = 'index.html';

}
$(function() {
    $('#addBookForm').on('submit', saveBookInfo);
});