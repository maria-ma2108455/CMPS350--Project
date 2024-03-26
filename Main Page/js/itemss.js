const itemsFile= "json/ceramic.json"; 
let itemsArray=[]
const urlParameter = new URLSearchParams(window.location.search);
const category = urlParameter.get('category');
const search = decodeURIComponent(urlParameter.get('searchValue'));

// localStorage.removeItem('itemsArray')
const itemsContainer = document.querySelector ('#items-container')

document.addEventListener('DOMContentLoaded', handlePageLoad);

async function handlePageLoad() {
   
    try {
        if(!localStorage.items){
            const data = await fetch(itemsFile);
            const allitems = await data.json();
            itemsArray=allitems 
            localStorage.itemsArray= JSON.stringify(itemsArray) 
    }
        else{
            itemsArray = JSON.parse(localStorage.itemsArray);
        }
        if(category){
            const filteredItems = itemsArray.items.filter(item => item.category === category)
            const itemsHTML= filteredItems.map(item=> itemToHTML(item)).join(' ')
            itemsContainer.innerHTML=itemsHTML}
        else if(search){
            let filteredItems= itemsArray.items.filter(i=> i.name.toLowerCase().includes(search))
            const itemsHTML= filteredItems.map(i=> itemToHTML(i)).join(' ')
            itemsContainer.innerHTML=itemsHTML
        }
        
    }
         catch (error) {
        console.error("Failed to load items:", error);
        
    }
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
