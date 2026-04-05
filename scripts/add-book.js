function saveBookInfo(event) {

    event.preventDefault(); // Prevent form submission

    let bookTitle      = document.getElementById('bookTitle').value;
    let bookISBN       = document.getElementById('bookISBN').value.trim();
    let authorName     = document.getElementById('authorName').value;
    let bookGenre      = document.getElementById('bookGenre').value;
    let bookPrice      = document.getElementById('bookPrice').value;

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