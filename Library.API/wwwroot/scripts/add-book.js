const API_URL = "/api/books";

async function saveBookInfo(event) {

    event.preventDefault();

    let newBook = {
        bookTitle: $('#bookTitle').val(),
        bookISBN: $('#bookISBN').val()?.trim(),
        authorName: $('#authorName').val(),
        bookGenre: $('#bookGenre').val(),
        bookPrice: Number($('#bookPrice').val())
    };

    console.log("Sending book:", newBook);

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            const error = await response.text();
            console.error(error);
            alert("Failed to save book.");
            return;
        }

        alert("Book saved successfully!");
        window.location.href = "index.html";

    } catch (error) {
        console.error(error);
        alert("Error connecting to server.");
    }
}

$(function () {
    $('#addBookForm').on('submit', saveBookInfo);
});