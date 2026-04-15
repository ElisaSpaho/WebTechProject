// ===============================
// ADMIN TABLE
// ===============================
function displayBooksAsTable(filter = "") {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const $tableBody = $('#bookTableBody');

    $tableBody.empty();

    const search = filter.toLowerCase();

    const filteredBooks = books.filter(book =>
        `${book.bookTitle} ${book.authorName} ${book.bookGenre}`
            .toLowerCase()
            .includes(search)
    );

    if (filteredBooks.length === 0) {
        $tableBody.html(`
            <tr>
                <td colspan="6" class="text-center text-muted">
                    No books available
                </td>
            </tr>
        `);
        return;
    }

    filteredBooks.forEach((book) => {
        const row = `
            <tr>
                <td>${book.bookTitle}</td>
                <td>${book.bookISBN}</td>
                <td>${book.authorName}</td>
                <td>${book.bookGenre}</td>
                <td>${book.bookPrice} ALL</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editBook('${book.bookISBN}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="prepareDeleteBook('${book.bookISBN}')">Delete</button>
                </td>
            </tr>
        `;
        $tableBody.append(row);
    });
}

// ===============================
// SEARCH (ADMIN ONLY)
// ===============================
$('#searchInput').on('keyup', function () {
    const searchValue = $(this).val().toLowerCase();
    displayBooksAsTable(searchValue);
});

// ===============================
// EDIT
// ===============================
function editBook(bookISBN) {
    localStorage.setItem('bookToEditISBN', bookISBN);
    window.location.href = 'edit-book.html';
}

// ===============================
// DELETE
// ===============================
function prepareDeleteBook(bookISBN) {
    localStorage.setItem('bookToDeleteISBN', bookISBN);
    window.location.href = 'delete-book.html';
}

// ===============================
// CLEAR ALL
// ===============================
function clearAllBooks() {
    if (confirm("Are you sure you want to delete ALL books?")) {
        localStorage.removeItem('books');
        displayBooksAsTable();
    }
}

document.getElementById('clearAllBtn')?.addEventListener('click', clearAllBooks);

// ===============================
// SIDEBAR TOGGLE
// ===============================
$('#toggleSidebarBtn').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('.main-content').toggleClass('shifted');
});

// ===============================
// LOAD DEFAULT
// ===============================
$(function () {
    displayBooksAsTable();
});