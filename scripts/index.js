function fetchBooksFromLocalStorage() {
    const books   = JSON.parse(localStorage.getItem('books')) || [];
    const $container = $('#bookCardsContainer');
    console.log($container.length);

    // Clear the table body
    $container.empty();

    if (books.length === 0) {
        $container.html(`
            <p class="text-center text-muted py-4">
                No books added yet. Click "+ Add Book" to get started.
            </p>
        `);
        return;
    }

    // Display each member
    books.forEach((book) => {

        // Stores the book's ISBN in the table row so we can easily access it later for edit/delete actions
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${book.bookTitle}</h5>
                        <p><strong>ISBN:</strong> ${book.bookISBN}</p>
                        <p><strong>Author:</strong> ${book.authorName}</p>
                        <p><strong>Genre:</strong> ${book.bookGenre}</p>
                        <p><strong>Price:</strong> ${book.bookPrice} ALL</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary" onclick="editBook('${book.bookISBN}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="prepareDeleteBook('${book.bookISBN}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
        $container.append(card);
    });
}


// Redirect to edit page
function editBook(bookISBN) {
    localStorage.setItem('bookToEditISBN', bookISBN);
    window.location.href = 'edit-book.html';
}

// redirect to delete book page
function prepareDeleteBook(bookISBN) {
    localStorage.setItem('bookToDeleteISBN', bookISBN);
    window.location.href = 'delete-book.html';
}

// Clear all books - might remove ( why would all books get deleted?)
function clearAllBooks() {
    if (confirm("Are you sure you want to delete ALL books?")) {
        localStorage.removeItem('books');
        fetchBooksFromLocalStorage();
    }
}

// event listener for Clear All button
const clearAllBtn = document.getElementById('clearAllBtn');
if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllBooks);
}

// On page load
$(function() {
    fetchBooksFromLocalStorage();
});