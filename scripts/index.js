let isCustomerView = false;

// ===============================
// ADMIN TABLE
// ===============================
function displayBooksAsTable() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const $tableBody = $('#bookTableBody');

    $tableBody.empty();

    if (books.length === 0) {
        $tableBody.html(`
            <tr>
                <td colspan="6" class="text-center text-muted">
                    No books available
                </td>
            </tr>
        `);
        return;
    }

    books.forEach((book) => {
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
// CUSTOMER CARDS
// ===============================
function fetchBooksFromLocalStorage(filter = "") {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const $container = $('#bookCardsContainer');

    $container.empty();

    const filteredBooks = books.filter(book =>
        book.bookTitle.toLowerCase().includes(filter) ||
        book.authorName.toLowerCase().includes(filter) ||
        book.bookGenre.toLowerCase().includes(filter)
    );

    if (filteredBooks.length === 0) {
        $container.html(`
            <p class="text-center text-muted">
                No matching books found
            </p>
        `);
        return;
    }

    filteredBooks.forEach((book) => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5>${book.bookTitle}</h5>
                        <p><strong>ISBN:</strong> ${book.bookISBN}</p>
                        <p><strong>Author:</strong> ${book.authorName}</p>
                        <p><strong>Genre:</strong> ${book.bookGenre}</p>
                        <p><strong>Price:</strong> ${book.bookPrice} ALL</p>
                    </div>
                </div>
            </div>
        `;
        $container.append(card);
    });

}

// ===============================
// TOGGLE CUSTOMER VIEW
// ===============================
$(document).ready(function () {

    // 🔄 Customer/Admin toggle
    $('#customerViewBtn').on('click', function () {

        isCustomerView = !isCustomerView;

        if (isCustomerView) {
            $('#bookTableContainer').addClass('d-none');
            $('#bookCardsContainer').removeClass('d-none');
            fetchBooksFromLocalStorage();
            $(this).text('Admin View');
        } else {
            $('#bookCardsContainer').addClass('d-none');
            $('#bookTableContainer').removeClass('d-none');
            displayBooksAsTable();
            $(this).text('Customer View');
        }
    });

    // 📌 Sidebar toggle
    $('#toggleSidebarBtn').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('.main-content').toggleClass('shifted');
});

    // 🔍 SEARCH (👉 ADD THIS PART)
    $('#searchInput').on('keyup', function () {

        const searchValue = $(this).val().toLowerCase();

        if (isCustomerView) {
            fetchBooksFromLocalStorage(searchValue);
        } else {
            displayBooksAsTable(searchValue);
        }

    });

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
// LOAD DEFAULT
// ===============================
$(function () {
    displayBooksAsTable();
});