//find the user using the username stored in current user, form the users json
//get all purchase details
//calculate the total price

const historyHeading = document.querySelector('#history-heading')
const purchaseCC= document.querySelector('.purchases-container')

// check if user is customer or seller and display accordingly
document.addEventListener('DOMContentLoaded', handlePageLoad)

async function handlePageLoad() {

    const users = JSON.parse(localStorage.users)
    const user = users.find(user => user.username == localStorage.currentUser)

    if (user.type === 'customer') {

        historyHeading.textContent = `Purchase ${historyHeading.textContent}`

        purchaseCC.innerHTML = user.purchases.map( p => purchaseToHTML(p)).join(' ')
    } 
    else {

        historyHeading.textContent = `Sale ${historyHeading.textContent}`

        const purchases = JSON.parse(localStorage.purchases)
        const sales = purchases.filter(purchase => purchase.item.seller === user.companyName)
        purchaseCC.innerHTML = sales.map(sale => purchaseToHTML(sale, 'sale')).join(' ')
    }
}

function purchaseToHTML(p, type){

    const date = new Date(p.date)
    const dateFormat = `${p.date.split('T')[0]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return  `
    <div class="item-purchased">
        <div class="details">
            <p>Purchase ID: ${p.purchaseId}</p>
            <p>Item ID: ${p.item.itemId}</p>
            <p>Item Name: ${p.item.name}</p>
            <p>Quantity: ${p.quantity}</p>
            <p>Unit Price: $${p.item.price}</p>
            <p>Total Price: $${p.item.price*p.quantity}</p>
            ${type === 'sale' ? `<p>Customer: ${p.customer.name} ${p.customer.surname} [${p.customer.username}] </p>` :
                `<p>Seller: ${p.item.seller}</p>`}
            <p>Date: ${dateFormat}</p>
        </div>
        <img src="${p.item.image}">
    </div>
    `
}