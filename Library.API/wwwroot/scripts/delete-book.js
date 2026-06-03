const API_URL = "/api/books";

function getBookIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadBookInfo() {
    const bookId = getBookIdFromUrl();

    if (!bookId) {
        alert("No book selected for deletion.");
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${bookId}`);

        if (!response.ok) {
            alert("Book not found.");
            window.location.href = "index.html";
            return;
        }

        const book = await response.json();

        $('#infoTitle').text(book.bookTitle);
        $('#infoISBN').text(book.bookISBN);
        $('#infoAuthor').text(book.authorName);

    } catch (error) {
        console.error("Error loading book:", error);
        alert("Error connecting to server.");
    }
}

async function confirmDelete() {
    const bookId = getBookIdFromUrl();

    if (!bookId) {
        alert("No book selected for deletion.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${bookId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            alert("Failed to delete book.");
            console.error(await response.text());
            return;
        }

        alert("Book deleted successfully!");
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error deleting book:", error);
        alert("Error connecting to server.");
    }
}

$(function () {
    loadBookInfo();

    $('#confirmDeleteBtn').on('click', confirmDelete);
});