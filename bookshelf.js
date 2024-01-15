document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

function loadBooks() {
  const unfinishedList = document.getElementById("unfinishedList");
  const finishedList = document.getElementById("finishedList");

  const books = getBooksFromStorage();

  unfinishedList.innerHTML = "";
  finishedList.innerHTML = "";

  const searchQuery = document
    .getElementById("searchQuery")
    .value.toLowerCase();

  books.forEach((book) => {
    if (book.title.toLowerCase().includes(searchQuery)) {
      const li = createBookListItem(book);
      if (book.isComplete) {
        finishedList.appendChild(li);
      } else {
        unfinishedList.appendChild(li);
      }
    }
  });
}

function createBookListItem(book) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${book.title}</strong> (${book.author}, ${book.year}) 
      <button onclick="toggleBookStatus(${book.id})">${
    book.isComplete ? "Belum Selesai" : "Selesai Dibaca"
  }</button>
      <button class="edit" onclick="editBook(${book.id})">Edit</button>
      <button class="delete" onclick="deleteBook(${book.id})">Hapus</button>`;
  return li;
}

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const isComplete = document.getElementById("isComplete").checked;

  if (title && author && year) {
    const newBook = {
      id: Date.now(),
      title,
      author,
      year,
      isComplete,
    };

    const books = getBooksFromStorage();
    books.push(newBook);
    saveBooksToStorage(books);
    loadBooks();

    // Clear the input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("isComplete").checked = false;
  } else {
    alert("Silakan lengkapi data buku terlebih dahulu!");
  }
}

function toggleBookStatus(bookId) {
  const books = getBooksFromStorage();
  const index = books.findIndex((book) => book.id == bookId);

  if (index !== -1) {
    books[index].isComplete = !books[index].isComplete;
    saveBooksToStorage(books);
    loadBooks();
  }
}

function editBook(bookId) {
  const books = getBooksFromStorage();
  const index = books.findIndex((book) => book.id == bookId);

  if (index !== -1) {
    const editedTitle = prompt("Edit Judul Buku:", books[index].title);
    const editedAuthor = prompt("Edit Penulis:", books[index].author);
    const editedYear = prompt("Edit Tahun Terbit:", books[index].year);

    if (editedTitle !== null && editedAuthor !== null && editedYear !== null) {
      books[index].title = editedTitle;
      books[index].author = editedAuthor;
      books[index].year = editedYear;

      saveBooksToStorage(books);
      loadBooks();
    }
  }
}

function deleteBook(bookId) {
  const books = getBooksFromStorage();
  const filteredBooks = books.filter((book) => book.id != bookId);
  saveBooksToStorage(filteredBooks);
  loadBooks();
}

function getBooksFromStorage() {
  const storedBooks = localStorage.getItem("books");
  return storedBooks ? JSON.parse(storedBooks) : [];
}

function saveBooksToStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function searchBooks() {
  const searchQuery = document
    .getElementById("searchQuery")
    .value.toLowerCase();
  const unfinishedList = document.getElementById("unfinishedList");
  const finishedList = document.getElementById("finishedList");

  const books = getBooksFromStorage();

  unfinishedList.innerHTML = "";
  finishedList.innerHTML = "";

  books.forEach((book) => {
    if (book.title.toLowerCase().includes(searchQuery)) {
      const li = createBookListItem(book);
      if (book.isComplete) {
        finishedList.appendChild(li);
      } else {
        unfinishedList.appendChild(li);
      }
    }
  });
}
