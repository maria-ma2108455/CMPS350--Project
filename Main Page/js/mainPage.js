let users = []
let items = []
let purchases = []

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
      users = await data.json()
      localStorage.users = JSON.stringify(users)
    } else {
        users = JSON.parse(localStorage.users)
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
        items = await data.json()
        localStorage.items = JSON.stringify(items)
    } else {
        items = JSON.parse(localStorage.items)
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
        purchases = await data.json()
        localStorage.purchases = JSON.stringify(purchases)
    } else {
      purchases = JSON.parse(localStorage.purchases)
    }
  } catch (error) {
    console.error("Failed to load purchases:", error);
  } 
}

//get the ref of elemnt we want to interact with
//select more than one element 
const categoriesB = document.querySelectorAll('#Ceramics, #Paintings, #Jewelry');
//add event listener
categoriesB.forEach(c => {
    c.addEventListener('click', handleCategoryClick)})
//the function
function handleCategoryClick(){
    const category = this.id;
    window.location.href = `items.html?category=${category}`;
}

// slide show
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

