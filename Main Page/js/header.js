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
        list = [
            {
                name: 'Add Item',
                page: 'addSellerItem.html'
            }, 
            {
                name: 'My Items',
                page: '#',
            },
            {
                name: 'Sale History',
                page: 'history.html'
            },
            {
                name: 'Sign Out',
            }
        ] 
        : list = [
            {
                name: 'Shopping Wallet',
                page: 'wallet.html'
            }, 
            {
                name: 'Purchase History',
                page: 'history.html'
            },
            {
                name: 'Sign Out',
                page: 'mainPage.html'
            }
        ]
        
        dropDownList.innerHTML = list.map(option => optionToHTML(option)). join(' ')
    
    }
    dropDownList.classList.toggle('hidden')    
}

function optionToHTML(option) {

    if (option.name === "Sign Out") return `<a href="mainPage.html" onclick='signOut()'>${option.name}</a>`

    return `
        <a href="${option.page}">${option.name}</a>
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