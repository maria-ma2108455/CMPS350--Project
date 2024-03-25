const bookURL =
    "https://gist.githubusercontent.com/abdalabaaji/85d9b4bab2f811663680b8efc5fc3ffb/raw/35a39261d19a7f28a3e0eb34ae57358969dcd5cf/book-repo.json";

const booksList = document.querySelector('#books-list')
const bookForm = document.querySelector('#book-form')
const addBtn = document.querySelector('#add-book')
const searchBox = document.querySelector('#search')
const cancelBtn = document.querySelector('#cancel')

let books = []

addBtn.addEventListener('click', showForm)
searchBox.addEventListener('input', searchBooks)
bookForm.addEventListener('submit', addBook)
cancelBtn.addEventListener('click', hideForm)

document.addEventListener('DOMContentLoaded', async () => {
    try {
        if(!localStorage.books) {
            const data = await fetch(bookURL)
            books = await data.json()
            localStorage.books = JSON.stringify(books)
        } else {
            books = JSON.parse(localStorage.books)
        }
        booksList.innerHTML = books.map(book => bookToHTML(book)).join(' ')
    } catch (error) {
        console.error("Failed to load books:", error);
    }
});

function addBook(e) {
    e.preventDefault()
    const newBook = formToObject(e.target)
    console.log(newBook);
    const index = books.findIndex(book => book._id == newBook._id)
    newBook.authors = newBook.authors.split(',')
    newBook.publishedDate = { $date: newBook.publishedDate }
    if (index == -1) {
        newBook._id = Date.now()
        books.unshift(newBook)
    } else {
        books[index] = {...books[index], ...newBook}
    }
    localStorage.books = JSON.stringify(books)
    showBooks()
    bookForm.reset()
    hideForm()
}

function formToObject(form) {

    const formData = new FormData(form)
    const data = {}

    // the name in html will become the key
    for (const [key, value] of formData) {
        data[key] = value
    }

    return data

} 

function updateBook(id) {

    const book = books.find(book => book._id == id)
    bookForm.elements['_id'].value = book._id
    bookForm.elements['title'].value = book.title
    bookForm.elements['isbn'].value = book.isbn
    bookForm.elements['pageCount'].value = book.pageCount
    bookForm.elements['publishedDate'].value = book.publishedDate.$date.split('T')[0]
    bookForm.elements['thumbnailUrl'].value = book.thumbnailUrl
    bookForm.elements['shortDescription'].value = book.shortDescription
    bookForm.elements['longDescription'].value = book.longDescription
    bookForm.elements['status'].value = book.status
    bookForm.elements['authors'].value = book.authors
    bookForm.elements['categories'].value = book.categories
    showForm()
    bookForm.scrollIntoView()

}

function deleteBook(id) {
    const index = books.findIndex(book => book._id == id)
    books.splice(index, 1)
    localStorage.books = JSON.stringify(books)
    showBooks()  
}

function searchBooks() {
    showBooks(searchBox.value.toLowerCase())
}

function showForm() {
    bookForm.classList.remove('hidden')
    addBtn.classList.add('hidden')
}

function hideForm() {
    bookForm.classList.add('hidden')
    addBtn.classList.remove('hidden')
}

function showBooks(query) {
    
    books = JSON.parse(localStorage.books)
    if (query) books = books.filter(book => book.title.toLowerCase().includes(query) || book.authors.find(author => author.toLowerCase().includes(query)))
    booksList.innerHTML = books.map(book => bookToHTML(book)).join(' ')
}

function bookToHTML(book) {
    return `
    <div class="card">
        <img src="${book.thumbnailUrl}" alt="">
        <p><b>Title: </b>${book.title}</p>
        <p><b>Authors(s): </b>${book.authors.join('<br>')}</p>
        <p><b>ISBN: </b>${book.isbn}</p>
        <p><b>Description: </b>${book.shortDescription}</p>
        <p><b>Status: </b>${book.status}</p>
        <div>
            <button class="delete-btn" id="delete-book" onclick='deleteBook(${book._id})'>Remove</button>
            <button class="update-btn" id="update-book" onclick='updateBook(${book._id})'>Update</button>
        </div>
    </div>
    `
}
