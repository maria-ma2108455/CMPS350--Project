// const usersFile = "../json/users.json";
// const confirmPurchase = document.querySelector('#purchase-btn')
const purchaseForm = document.querySelector('#purchase-form')

//assuming
// document.addEventListener('DOMContentLoaded', handlePageLoad)

// const quantity = document.querySelector('#quantity')
purchaseForm.addEventListener('submit', confirmedPurchase)

// users = []
// async function handlePageLoad(){
//     try {
//         // const buyNow = document.querySelector('#buy-btn')
//         // const quantity = document.querySelector('#quantity')
//         // buyNow.addEventListener('click', checkLoggedIn)

//         // const data = await fetch(usersFile)
//         // users = await data.json()
//         // localStorage.users = JSON.stringify(users)
//         if(!localStorage.users){
//             const data = await fetch(usersFile)
//             users = await data.json()
//             localStorage.users = JSON.stringify(users)
//         }
//         else{
//             users=JSON.parse(localStorage.users)
//         }   

//     } catch (error) {
//         console.error("Failed to load:", error);
//     }
// }


function confirmedPurchase(e){
    e.preventDefault()
    // console.log('purchase works');

    if(confirm("Are you sure about your purchase?")){
        
        const users = localStorage.users
        const user = JSON.parse(users)
        const foundUser = user.find(u => u.username === localStorage.currentUser)
        
        // parseItems = JSON.parse(allItems)
        // items = parseItems.items


        let items =[]
        const allItems = localStorage.itemsArray
        items = JSON.parse(allItems).items

        const foundItem = items.find(it => it.itemId === localStorage.currentItemId)

        const totalPrice = foundItem.price * localStorage.custQuantity

        foundUser.moneyBalance = JSON.parse(foundUser.moneyBalance) - totalPrice
        // localStorage.setItem('users', JSON.stringify(users))

        foundItem.quantity = JSON.parse(foundItem.quantity) - localStorage.custQuantity
        // localStorage.setItem('itemsArray', JSON.stringify(items))

        window.location.href = "mainpage.html"
        alert("Purchase Confirmed")

        // delete localStorage.custQuantity
        // delete localStorage.currentItemId
        
    }
    else{
        alert("Purchase Cancelled")
    }
}

