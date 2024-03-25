const signInBtn = document.querySelector('#signInBtn')
const profileIcon = document.querySelector('#profile-icon')

let currentUser = {}

// check if user is logged in or not
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.currentUser) {
        signInBtn.classList.add('hidden')
        profileIcon.classList.remove('hidden')
    }
})

signInBtn.addEventListener('click', signIn)

function signIn() {
    window.location.href = "signin.html"
}