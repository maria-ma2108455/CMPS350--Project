//from local storage cause they cant reach this page without being first the items page which loads from json file
itemsArray = JSON.parse(localStorage.itemsArray);
const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');
const itemDetailsCC = document.querySelector ('.item')

//when the page loads
document.addEventListener('DOMContentLoaded', handlePageLoad);

async function handlePageLoad() {
    const item= itemsArray.items.find(i=>i.itemId==itemId)
    console.log("found item:", item);
    const itemDetailsHTML= itemDetailsToHTML(item)
    itemDetailsCC.innerHTML=itemDetailsHTML
    };

//displaying the item
function itemDetailsToHTML(item){
    return  `
    <div class="item" onclick="handleItemClick('${item.itemId}')">
    <img src="${item.image}" alt="${item.name}">
    <div class="details">
        <h1>${item.price}$</h1>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>${item.seller.companyName}</p>
        <form>
            <div>
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="0" max="${item.quantity}" step="1" value="1">
            </div>
            <input type="submit" value="Buy Now">
        </form>
    </div>`
}
    


