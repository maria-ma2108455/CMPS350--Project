//from local storage cause they cant reach this page without being first the items page which loads from json file
let items = JSON.parse(localStorage.items);
const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');
const itemDetailsCC = document.querySelector('.item-container')
const itemLink = document.querySelector('#item-link')


// const buyNow = document.querySelector('#buy-btn')
// buyNow.addEventListener('click', checkLoggedIn)

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

    const quantityItem = document.querySelector('#quantity');
    const priceOfItem = document.querySelector('#price');

    itemLink.innerHTML = `<a href="items.html?category=${item.category}">${item.category}</a> > ${item.name}`
    

    if (quantityItem && priceOfItem) {
        // Calculate total price and update displayed price when quantity changes
        quantityItem.addEventListener('input', () => {
            const quantity = parseInt(quantityItem.value);
            const price = parseInt(item.price);
            if(!quantity || window.itemQuantity==0){
                priceOfItem.textContent = '0' + '$';  
                alert('Minimum value is 1')      
                quantityItem.value = 1     
            }
            else{
                const totalPrice = quantity * price;
                priceOfItem.textContent = totalPrice + '$';
                window.itemQuantity = quantity;
                window.totalPrice = totalPrice;
                const buyNow = document.querySelector('#buy-btn')
                buyNow.addEventListener('click', checkLoggedIn)
            }

            
            
        });

        const totalPrice = quantity * price;
        window.itemQuantity = quantity.value;
        window.totalPrice = totalPrice.value;
        const buyNow = document.querySelector('#buy-btn')
        buyNow.addEventListener('click', checkLoggedIn)


    }
};


function assignNeededAttributes(){
    localStorage.currentItemId = itemId
    localStorage.custQuantity = window.itemQuantity
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
        <p>${item.seller.companyName} [${item.seller.username}]</p>
        <form>
            <p>Unit Price: ${item.price}$</p>
            <div>
                <label for="quantity">Quantity:</label>
                ${user.type === 'seller' && user.username === item.seller.username ? `<p>${item.quantity}</p>` :
                `<input type="number" id="quantity" name="quantity" min="1" max="${item.quantity}" step="1" value="1">`
                }
            </div>
            ${user.type === 'seller' && user.username === item.seller.username ? `<input type="button" value="Update Item" id="update-btn" >`:
            `<input type="button" value="Buy Now" id="buy-btn" ></input>` }
        </form>
    </div>`
}


function checkLoggedIn(){
    if(localStorage.currentUser){

        const totalPrice = window.totalPrice
        const users = localStorage.users
        const user = JSON.parse(users)
        const foundUser = user.find(u => u.username === localStorage.currentUser)

        const items = localStorage.items;
        const item = JSON.parse(items);
        const foundItem = item.find(it => it.itemId === itemId);
        
        if(foundUser.moneyBalance < totalPrice){
            alert("Not Enough Balance");
        }
        else if(foundItem.quantity<window.itemQuantity){
            alert(`Quanitity can't be over ${foundItem.quantity}`)
        }
        else{
            assignNeededAttributes()
            window.location.href = "purchasedetails.html"
        }
        
    }
    else{
        window.location.href = "signin.html"
    
    }
}