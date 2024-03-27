// Get all information from files and save in localStorage
document.addEventListener('DOMContentLoaded', async () => {

  loadUsers()

  loadItems()

  loadPurchases()

});

async function loadUsers() {
  
  try {
    if(!localStorage.users) {
      const usersURL = '../json/users.json'
      const data = await fetch(usersURL)
      const users = await data.json()
      localStorage.users = JSON.stringify(users)
    } 

  } catch (error) {
    console.error("Failed to load users:", error);
  }
}

async function loadItems() {
  try {
    if(!localStorage.items) {
        const itemsURL = '../json/items.json'
        const data = await fetch(itemsURL)
        const items = await data.json()
        localStorage.items = JSON.stringify(items)
    } 

  } catch (error) {
    console.error("Failed to load items:", error);
  }
}

async function loadPurchases() {
  try {
    if(!localStorage.purchases) {
        const purchasesURL = '../json/purchases.json'
        const data = await fetch(purchasesURL)
        const purchases = await data.json()
        localStorage.purchases = JSON.stringify(purchases)
    } 
  } catch (error) {
    console.error("Failed to load purchases:", error);
  } 
}