const API_URL = "/api/books";

async function getBooks(search = "") {
    try {
        const response = await fetch(`${API_URL}?search=${encodeURIComponent(search)}`);

        if (!response.ok) {
            console.error("Failed to load books:", await response.text());
            return [];
        }

        return await response.json();

    } catch (error) {
        console.error("Error connecting to API:", error);
        return [];
    }
}

async function displayBooksAsTable(filter = "") {
    const books = await getBooks(filter);
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
                    <button class="btn btn-sm btn-primary" onclick="editBook(${book.id})">
                        Edit
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="prepareDeleteBook(${book.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        $tableBody.append(row);
    });
}

$('#searchInput').on('keyup', function () {
    const searchValue = $(this).val().toLowerCase();
    displayBooksAsTable(searchValue);
});

function editBook(bookId) {
    window.location.href = `edit-book.html?id=${bookId}`;
}

function prepareDeleteBook(bookId) {
    window.location.href = `delete-book.html?id=${bookId}`;
}

async function clearAllBooks() {

    if (!confirm("Are you sure you want to delete ALL books?")) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/all`, {
            method: "DELETE"
        });

        if (!response.ok) {
            console.error(await response.text());
            alert("Failed to delete all books.");
            return;
        }

        alert("All books deleted successfully!");
        displayBooksAsTable();

    } catch (error) {
        console.error(error);
        alert("Error connecting to server.");
    }
}

document.getElementById('clearAllBtn')?.addEventListener('click', clearAllBooks);

$('#toggleSidebarBtn').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('.main-content').toggleClass('shifted');
});

$(function () {
    displayBooksAsTable();
});