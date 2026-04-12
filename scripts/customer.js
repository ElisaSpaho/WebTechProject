function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

function displayBooks(filter = "") {
    const books = getBooks();
    const $container = $('#bookCardsContainer');

    $container.empty();

    const filtered = books.filter(book =>
        book.bookTitle.toLowerCase().includes(filter) ||
        book.authorName.toLowerCase().includes(filter) ||
        book.bookGenre.toLowerCase().includes(filter)
    );

    if (filtered.length === 0) {
        $container.html(`
            <div class="col-12 text-center text-muted py-5">
                <h5>No books found 📚</h5>
            </div>
        `);
        return;
    }
 filtered.forEach(book => {
        const card = `
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm border-0 h-100 hover-shadow">
                <div class="card-body">
                    <h5 class="card-title">${book.bookTitle}</h5>
                    <p class="mb-1"><strong>Author:</strong> ${book.authorName}</p>
                    <p class="mb-1"><strong>Genre:</strong> ${book.bookGenre}</p>
                    <p class="fw-bold text-primary">${book.bookPrice} ALL</p>
                </div>
            </div>
        </div>
        `;
        $container.append(card);
    });
}

$(function () {
    displayBooks();

    $('#searchInput').on('keyup', function () {
        const value = $(this).val().toLowerCase();
        displayBooks(value);
    });
});