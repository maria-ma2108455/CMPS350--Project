//from local storage cause they cant reach this page without being first the items page which loads from json file
let items = JSON.parse(localStorage.items);
const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');
const itemDetailsCC = document.querySelector('.item-container')
const itemLink = document.querySelector('#item-link')

//when the page loads
document.addEventListener('DOMContentLoaded', handlePageLoad);

async function handlePageLoad() {    

    const users = JSON.parse(localStorage.users)
    const currentUser = users.find(user => user.username === localStorage.currentUser)
    console.log(currentUser);
    const item = items.find(i => i.itemId == itemId)
    console.log("found item:", item);
    const itemDetailsHTML= itemDetailsToHTML(item, currentUser)
    itemDetailsCC.innerHTML = itemDetailsHTML

    itemLink.innerHTML = `<a href="items.html?category=${item.category}">${item.category}</a> > ${item.name}`
    
    const form = document.querySelector('#quantity-form')
    const quantityItem = document.querySelector('#quantity');
    const priceOfItem = document.querySelector('#price');

    form.addEventListener('submit', buyItem)

    quantityItem.addEventListener('input', () => {
        
        const quantity = parseInt(quantityItem.value);
        const price = parseInt(item.price);
        if(!quantity) {
            priceOfItem.textContent = `${price}` + '$';  
        }
        else{
            const totalPrice = quantity * price;
            priceOfItem.textContent = totalPrice + '$';
            // const buyNow = document.querySelector('#buy-btn')
            // buyNow.addEventListener('click', checkLoggedIn)
        }

    });
    
    
};

function buyItem(e) {

    e.preventDefault()

    checkLoggedIn()

}

//displaying the item
function itemDetailsToHTML(item, user){
    if (!item) {
        return `<div class="details">Item details not available.</div>`;}
    return  `
    <div class="item">
    <img src="${item.image}" alt="${item.name}">
    <div class="details">
        <h1 id="price">${item.price}$</h1>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>${item.seller.companyName}</p>
        <form id="quantity-form">
            <input type="text" id="itemId" name="itemId" hidden>
            <input type="text" id="itemPrice" name="itemPrice" hidden>
            <input type="text" id="user" name="user" hidden>
            <p>Unit Price: ${item.price}$</p>
            <div>
                <label for="quantity">Quantity:</label>
                ${user && user.type === 'seller' && user.username === item.seller.username ? `<p>${item.quantity}</p>` :
                `<input type="number" id="quantity" name="quantity" min="1" max="${item.quantity}" step="1" value="1">`
                }
            </div>
            ${user && user.type === 'seller' && user.username === item.seller.username ? `<input type="button" value="Update Item" id="update-btn" >` :
            `<input type="submit" value="Buy Now" id="buy-btn" ></input>` }
        </form>
    </div>`
}


function checkLoggedIn(){

    if (!localStorage.currentUser) window.location.href = "signin.html"

    const users = localStorage.users
    const user = JSON.parse(users)
    const foundUser = user.find(u => u.username === localStorage.currentUser)

    if (foundUser.type === 'seller') {
        alert('Please sign in as a customer to buy items')
        return
    } 

    const items = JSON.parse(localStorage.items)
    const item = items.find(i => i.itemId === itemId)

    const quantityItem = document.querySelector('#quantity').value
    const priceOfItem = item.price
    const totalPrice = quantityItem * priceOfItem


    console.log(quantityItem);

    if(foundUser.moneyBalance < totalPrice){
        
        alert("Not Enough Balance");
        return
    }

    localStorage.custQuantity = quantityItem
    localStorage.currentItemId = itemId
    window.location.href = "purchasedetails.html"
    
}