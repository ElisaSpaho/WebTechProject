function fetchBooksFromLocalStorage() {
    const books   = JSON.parse(localStorage.getItem('books')) || [];
    const $tableBody = $('#bookstableBody');

    // Clear the table body
    $tableBody.empty();

    if (books.length === 0) {
        $tableBody.html(`
            <tr>
                <td colspan="7" class="text-center text-muted py-4">
                    No books added yet. Click "+ Add Book" to get started.
                </td>
            </tr>
        `);
        return;
    }

    // Display each member
    books.forEach((book) => {

        // Stores the book's ISBN in the table row so we can easily access it later for edit/delete actions
        const row = `
            <tr data-isbn="${book.bookISBN}>
                <td>${book.bookTitle}</td>
                <td>${book.bookISBN}</td>
                <td>${book.authorName}</td>
                <td>${book.bookGenre}</td>
                <td>${book.bookPrice}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="editBook('${book.bookISBN}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="prepareDeleteBook('${book.bookISBN}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
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