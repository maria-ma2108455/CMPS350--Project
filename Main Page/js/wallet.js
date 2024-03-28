
//find the user using the username stored in current user, form the users json
//get the balance and display 
balanceCC= document.querySelector('#balance')
document.addEventListener('DOMContentLoaded', handlePageLoad)

async function handlePageLoad() {

    const users = JSON.parse(localStorage.users)
    const user = users.find(user => user.username == localStorage.currentUser)
    balanceCC.innerHTML = walletToHTML(user)

}

function walletToHTML(user){
    return  `
    <p>$${user.moneyBalance}</p>       
    `
}