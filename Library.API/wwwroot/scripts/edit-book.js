const API_URL = "/api/books";

function getBookIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

$(async function () {

    const bookId = getBookIdFromUrl();

    if (!bookId) {
        alert("No book selected to edit.");
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

        $('#bookTitle').val(book.bookTitle);
        $('#bookISBN').val(book.bookISBN);
        $('#authorName').val(book.authorName);
        $('#bookGenre').val(book.bookGenre);
        $('#bookPrice').val(book.bookPrice);

        $('#editMemberForm').on('submit', async function (e) {

            e.preventDefault();

            const updatedBook = {
                id: book.id,
                bookTitle: $('#bookTitle').val(),
                bookISBN: $('#bookISBN').val(),
                authorName: $('#authorName').val(),
                bookGenre: $('#bookGenre').val(),
                bookPrice: Number($('#bookPrice').val())
            };

            const updateResponse = await fetch(`${API_URL}/${bookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBook)
            });

            if (!updateResponse.ok) {
                alert("Failed to update book.");
                console.error(await updateResponse.text());
                return;
            }

            alert("Book updated successfully!");
            window.location.href = "index.html";
        });

    } catch (error) {
        console.error(error);
        alert("Error connecting to server.");
    }
});