const itemsFile= "json/items.json"; 

const urlParameter = new URLSearchParams(window.location.search);
const category = urlParameter.get('category');
const search = decodeURIComponent(urlParameter.get('searchValue'));
const sellerItems = urlParameter.get('items')

const itemsContainer = document.querySelector('#items-container')
const dropdown = document.querySelector('#dropdown-items')
const dropdownList = document.querySelector('#dropdownlist-items')
const title = document.querySelector('#title')

document.addEventListener('DOMContentLoaded', handlePageLoad);
document.addEventListener('change', showSellerItems)

async function handlePageLoad() {
   
    try {

        const items = JSON.parse(localStorage.items);

        let itemsHTML = ''
        let filteredItems = []

        if (category){
            if (category === 'all') filteredItems = items
            else filteredItems = items.filter(item => item.category === category)
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        } else if (sellerItems) {
            title.classList.remove('hidden')
            dropdown.classList.remove('hidden')
            filteredItems = items.filter(item => item.seller.username === localStorage.currentUser)
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        } else if (search){
            let filteredItems = items.filter(i=> i.name.toLowerCase().includes(search))
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        }
        else {
            itemsHTML = items.map(item => itemToHTML(item)).join(' ')
        }
        
        itemsContainer.innerHTML = itemsHTML

        
    } catch (error) {
        console.error("Failed to load items:", error);  
    }
}

function showDropDown(type) {
    if (type === 'seller') {
        
    }
}

function showSellerItems() {

    const items = JSON.parse(localStorage.items);

    let filteredItems = []

    if (dropdownList.value === 'available') {
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser && item.quantity > 0)
    } else if (dropdownList.value === 'sold-out') {
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser && item.quantity <= 0)
    } else if (dropdownList.value === 'all'){
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser)
    }

    let itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
    itemsContainer.innerHTML = itemsHTML

}

function itemToHTML(item){
    return `
    <div class="item" onclick="handleItemClick('${item.itemId}')">
    <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
    </div>`
}

function handleItemClick(itemId){
    window.location.href = `itemdetail.html?item=${itemId}`
}
