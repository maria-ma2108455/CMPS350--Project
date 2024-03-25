

const usersFile = "json/users.json";    
const buyNow = document.querySelector('#buy-now')

document.addEventListener('DOMContentLoaded', handlePageLoad)

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

buyNow.addEventListener('click', checkLoggedIn)



//currentUser in localStorage that has user info
//if currentUser true then take the username and search by user name to find balance


function checkLoggedIn(){

    if(localStorage.currentUser){
        const localUser = localStorage.getItem("currentUser")
        // const custUser = users.find(u => localStorage.getItem(u.username) == localUser)
        const custUser = users.find(u => u.username == localUser)
        const balance = custUser.moneyBalance
        const itemTotalPrice =30;
        if(balance < itemTotalPrice){
            window.alert("Not Enough Balance");
        }
        else{
            
        }
    }
}

