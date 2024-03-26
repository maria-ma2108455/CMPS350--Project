const signInBtn = document.querySelector('#signInBtn')
const profileIcon = document.querySelector('#profile-icon')
const dropDownList = document.querySelector('#drop-down-list')

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

function showDropDown() {
    if (localStorage.currentUser) {
        let list = []

        const users = JSON.parse(localStorage.users)

        const currentUser = users.find(user => user.username == localStorage.currentUser)
        
        currentUser.type == "seller" ? 
        list = ['Add Item', 'Current Items', 'Sale History', 'Sign Out'] 
        : list = ['Purchase History','Shopping Wallet','Sign Out']
        
        dropDownList.innerHTML = list.map(option => optionToHTML(option)). join(' ')
    
    }
    dropDownList.classList.toggle('hidden')    
}

function optionToHTML(option) {

    const id = option.toLowerCase().replace(' ','-')
    if (option === "Sign Out") return `<a href="#" id=${id} onclick='signOut()'>${option}</a>`

    return `
        <a href="#" id=${id}>${option}</a>
    `
}

function signOut() {
    signInBtn.classList.remove('hidden')
    profileIcon.classList.add('hidden')
    delete localStorage.currentUser
}

// to hide the drop down list when clicking outside the area
window.onclick = event => {
    if (!event.target.matches('.profile-icon')) {
        var dropdowns = document.getElementsByClassName("drop-down-list");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (!openDropdown.classList.contains('hidden')) {
                openDropdown.classList.add('hidden');
            }
        }
    }
}