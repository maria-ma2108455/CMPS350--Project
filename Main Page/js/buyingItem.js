

const usersFile = "../json/users.json";
const buyNow = document.querySelector('#buy-now')
const quantity = document.querySelector('#quantity')
const confirmPurchase = document.querySelector('#purchase-btn')

//assuming
const itemId = document.querySelector('#itemId')

document.addEventListener('DOMContentLoaded', handlePageLoad)
buyNow.addEventListener('click', checkLoggedIn)
confirmPurchase.addEventListener('click', confirmedPurchase)

users = []
async function handlePageLoad(){
    try {
        // const data = await fetch(bookURL)
        // books = await data.json()    
        // localStorage.books = JSON.stringify(books)
        if(!localStorage.users){
            const data = await fetch(usersFile)
            users = await data.json()
            localStorage.users = JSON.stringify(users)
        }
        else{
            users=JSON.parse(localStorage.users)
        }   

    } catch (error) {
        console.error("Failed to load books:", error);
    }
}

//currentUser in localStorage that has user info
//if currentUser true then take the username and search by user name to find balance


function checkLoggedIn(){

    if(localStorage.currentUser){
        // const localUser = localStorage.getItem("currentUser")
        // const custUser = users.find(u => localStorage.getItem(u.username) == localUser)
        const custUser = users.find(u => u.username === localStorage.currentUser)
        const balance = custUser.moneyBalance
        if(balance < quantity){
            alert("Not Enough Balance");
        }
        else{
            window.location.href = "purchasedetails.html"
        }
    }
    else{
        window.location.href = "signin.html"
    }
}


function confirmedPurchase(){

    if(confirm("Are you sure about your purchase?")){
        
        const custUser = users.find(u => u.username === localStorage.currentUser)

        custUser.moneyBalance -= totalPrice;
        const item = localStorage.items.find(item=> item.itemId === itemId)
        item.quantity -= quantity;

        window.location.href = "mainpage.html"
        alert("Purchase Confirmed")
        
    }
    else{
        alert("Purchase Cancelled")
    }
}

