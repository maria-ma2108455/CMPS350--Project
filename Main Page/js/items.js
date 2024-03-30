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
dropdownList.addEventListener('change', showItems)

async function handlePageLoad() {
   
    try {

        const items = JSON.parse(localStorage.items);

        let itemsHTML = ''
        let filteredItems = []

        // if (sellerItems) {
        //     title.textContent = "My Items"
        //     showDropDown('seller')
        //     filteredItems = items.filter(item => item.seller.username === localStorage.currentUser)
        //     itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        // } else if (search) {
        //     let filteredItems = items.filter(i=> i.name.toLowerCase().includes(search))
        //     itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        // } else {
        //     showDropDown()
        //     dropdownList.value = category
        // }

        if (category) {
            title.textContent = "Product Catalogue"
            showDropDown()
            if (category === 'all') filteredItems = items
            else filteredItems = items.filter(item => item.category === category)
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
            dropdownList.value = category.toLowerCase()
        } else if (sellerItems) {
            title.textContent = "My Items"
            showDropDown('seller')
            filteredItems = items.filter(item => item.seller.username === localStorage.currentUser)
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        } else if (search) {
            let filteredItems = items.filter(i=> i.name.toLowerCase().includes(search))
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        }

        // if (category){
        //     if (category === 'all') filteredItems = items
        //     else filteredItems = items.filter(item => item.category === category)
        //     itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
        // } else if (sellerItems) {
        //     title.classList.remove('hidden')
        //     dropdown.classList.remove('hidden')

        // } else if (search){

        // }
        // else {
        //     itemsHTML = items.map(item => itemToHTML(item)).join(' ')
        // }
        
        itemsContainer.innerHTML = itemsHTML

        
    } catch (error) {
        console.error("Failed to load items:", error);  
    }
}

function showDropDown(type) {
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

function showItems() {

    const items = JSON.parse(localStorage.items);

    let filteredItems = []

    if (dropdownList.value === 'available') {
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser && item.quantity > 0)
    } else if (dropdownList.value === 'sold-out') {
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser && item.quantity <= 0)
    } else if (dropdownList.value === 'all'){
        filteredItems = items.filter(item => item.seller.username === localStorage.currentUser)
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
