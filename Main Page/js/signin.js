const form = document.querySelector('#signin-form')

form.addEventListener('submit', signIn)

function signIn(e) {
    e.preventDefault()
    const signInData = formToObject(e.target)
    const users = JSON.parse(localStorage.users)
    const user = users.find(user => user.username == signInData.username && user.password == signInData.password)
    if (user) {
        localStorage.currentUser = user.username
        window.location.href = "mainPage.html"
    } else {
        form.elements['password'].value = ''
        alert('Incorrect username or password!')
    }
}

// Converting the form data to an object
function formToObject(form) {

    const formData = new FormData(form)
    const data = {}

    // the name in html will become the key
    for (const [key, value] of formData) {
        data[key] = value
    }

    return data

} 