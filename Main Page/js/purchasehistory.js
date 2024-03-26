//find the user using the username stored in current user, form the users json
//get all purchase details
//calculate the total price
// const username= JSON.parse(localStorage.currentuser)
const username= 'maria_attili'
purchaseCC= document.querySelector('.purchases-container')
document.addEventListener('DOMContentLoaded', handlePageLoad)

async function handlePageLoad() {
    const users= JSON.parse(localStorage.users)
    const user= users.find(user=>user.username==username)
    const userpurchasesHTML= user.purchases.map(p=> purchaseToHTML(p)).join(' ')
    purchaseCC.innerHTML=userpurchasesHTML}


function purchaseToHTML(p){
    return  `
    <div class="item-purchased">
    <div class="details">
    <p>Purchase ID: ${p.purchaseId}</p>
    <p>Item ID:${p.item.itemId}</p>
    <p>Item Name:${p.item.name}</p>
    <p>Quantity:${p.quantity}</p>
    <p>Total Price: $${p.item.price*p.quantity}</p>
    <p>Seller: ${p.item.seller}</p>
    </div>
    <img src="${p.item.image}">
    </div>
    `
}