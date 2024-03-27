//from local storage cause they cant reach this page without being first the items page which loads from json file
itemsArray = JSON.parse(localStorage.itemsArray);
const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');
const itemDetailsCC = document.querySelector ('.item-container')


// const buyNow = document.querySelector('#buy-btn')
// buyNow.addEventListener('click', checkLoggedIn)

//when the page loads
document.addEventListener('DOMContentLoaded', handlePageLoad);

async function handlePageLoad() {

    const item= itemsArray.items.find(i=>i.itemId==itemId)
    console.log("found item:", item);
    const itemDetailsHTML= itemDetailsToHTML(item)
    itemDetailsCC.innerHTML=itemDetailsHTML

    const quantityItem = document.getElementById('quantity');
    const priceOfItem = document.getElementById('price');

    if (quantityItem && priceOfItem) {
        // Calculate total price and update displayed price when quantity changes
        quantityItem.addEventListener('input', () => {
            const quantity = parseInt(quantityItem.value);
            const price = parseInt(item.price);
            if(!quantity){
                priceOfItem.textContent = '0' + '$';             
            }
            else{
                const totalPrice = quantity * price;
                priceOfItem.textContent = totalPrice + '$';
                window.itemQuantity = quantity;
                window.totalPrice = totalPrice;
                
                
            }
            
        });

        const buyNow = document.querySelector('#buy-btn');
        buyNow.addEventListener('click', () => checkLoggedIn());
    }
};


function assignNeededAttributes(){
    localStorage.currentItemId = itemId
    localStorage.custQuantity = window.itemQuantity
}




//displaying the item
function itemDetailsToHTML(item){
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
        <form>
            <div>
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" max="${item.quantity}" step="1" value="1">
            </div>
            <input type="button" value="Buy Now" id="buy-btn" >
        </form>
    </div>`
}


function checkLoggedIn(){
    if(localStorage.currentUser){

        const totalPrice = window.totalPrice
        const users = localStorage.users
        const user = JSON.parse(users)
        const foundUser = user.find(u => u.username === localStorage.currentUser)

        if(foundUser.moneyBalance < totalPrice){
            alert("Not Enough Balance");
        }
        else if(!window.itemQuantity){
            // console.log(window.itemQuantity);
            // window.itemQuantity=1
            // console.log(window.itemQuantity);
            
        }
        else if(window.itemQuantity===0){
            // alert("Minimum Quantity is 1.")
            // console.log(window.itemQuantity);
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