
let itemsFile
const urlParameter = new URLSearchParams(window.location.search)
const category = urlParameter.get('category')
const search = decodeURIComponent(urlParameter.get('searchValue'))
const sellerItems = urlParameter.get('items')

const itemsContainer = document.querySelector('#items-container')
const dropdown = document.querySelector('#dropdown-items')
const dropdownList = document.querySelector('#dropdownlist-items')
const title = document.querySelector('#title')

document.addEventListener('DOMContentLoaded', handlePageLoad);
dropdownList.addEventListener('change', showItems)

async function handlePageLoad() {
   
    try {
        let itemsHTML = ''
        let filteredItems = []

        //this can be uncommented late after doing the... i think aisha knows when
        if (sellerItems) {

            title.textContent = "My Items"
            showCategoryDropDown('seller')
            filteredItems = items.filter(item => item.seller.username === localStorage.currentUser)

        } else if (category) {

            title.textContent = "Product Catalogue"
            showCategoryDropDown()
            const response = await fetch(`api/items?category=${category}`,{ method: 'GET'})
            filteredItems = await response.json()
            dropdownList.value = category.toLowerCase()
            // /api/items?category=${category}

        } else if (search) {
            title.classList.add('hidden')
            dropdown.classList.add('hidden')
            const response = await fetch(`api/items?searchValue=${search}`, {
                method: 'GET'})
            filteredItems = await response.json()
        }
        
        if (!filteredItems.length) noItemsErrorMsg()
        
            else {
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
            itemsContainer.innerHTML = itemsHTML
        }

        
    } catch (error) {
        console.error("Failed to load items:", error);  
    }
}

function noItemsErrorMsg() {
    title.classList.remove('hidden')
    title.textContent = 'No items found!'
}

function showCategoryDropDown(type) {
    let listHTML = ``

    if (type === 'seller') {
        title.textContent = 'My Items'
        listHTML = `
        <option value="available">Available Items</option>
        <option value="sold-out">Sold Out Items</option>
        `
    } else {
        listHTML = `
        <option value="ceramics">Ceramics</option>
        <option value="jewelry">Jewelry</option>
        <option value="paintings">Paintings</option>
        `
    }

    dropdownList.innerHTML = dropdownList.innerHTML + listHTML
    
}

//also aisha here:
async function showItems() {

    const items = JSON.parse(localStorage.items);

    let filteredItems = []

    if (dropdownList.value === 'available') {
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser && item.quantity > 0)
    } else if (dropdownList.value === 'sold-out') {
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser && item.quantity <= 0)
    } else if (dropdownList.value === 'all' && sellerItems){
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser)
    } else if (dropdownList.value === 'all') {
        filteredItems = items
    } else {
        filteredItems = items.filter(item => item.category.toLowerCase() === dropdownList.value)
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
