//const API_KEY = "Fjo4LhUKDif7sCbyiZxuDRZpGnMhOn1zGjhEIE4hdkC1WgfZ";


fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`)
.then(res => res.json())
.then(data => {
    const container = document.getElementById("books");

    container.innerHTML = "";

    data.results.books.forEach(book => {

        const image = book.book_image || "https://via.placeholder.com/300x400?text=No+Cover";

        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card p-3 h-100">
                    <img src="${image}" class="card-img-top mb-3">
                    <h5>${book.title}</h5>
                    <p>${book.author}</p>
                    <p>Rank: ${book.rank}</p>
                </div>
            </div>
        `;
    });
});