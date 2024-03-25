

//get the ref of elemnt we want to interact with
//select more than one element 
const categoriesB = document.querySelectorAll('#Ceramics, #Paintings, #jelwery');
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
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
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
