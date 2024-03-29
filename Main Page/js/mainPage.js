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


const shopBTN= document.querySelector('#shop-btn')
const featuredCC=document.querySelector('#featured-container')
items=JSON.parse(localStorage.items)
document.addEventListener('DOMContentLoaded', addFeatured);
function addFeatured(){
  let featuredItems = items.filter(item => item.featured == true)
  const itemsHTML = featuredItems.map(item => itemToHTML(item)).join(' ')
  featuredCC.innerHTML = itemsHTML

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
shopBTN.addEventListener('click',allItemsPage)
function allItemsPage(){
  window.location.href = `items.html`

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

