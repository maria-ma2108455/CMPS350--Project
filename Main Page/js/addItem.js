const urlParameter = new URLSearchParams(window.location.search);
const uploadImage= document.querySelector('#item-image')
const itemId = urlParameter.get('item');

items= JSON.parse(localStorage.items)
users= JSON.parse(localStorage.users)
const form = document.querySelector('#addItem-form')
const cancelBTN = document.querySelector('#cancel-btn')
const submitBTN = document.querySelector('#addItem-btn')
const imageInputs = document.querySelector('#image-inputs')

document.addEventListener('DOMContentLoaded', () => {
    if (itemId) {
        submitBTN.textContent = 'Update Item'
    }
})

form.addEventListener('submit',addForm)
function addForm(e){
    console.log("Form submitted");
    e.preventDefault()
    const item = formToObject(e.target)
    console.log(item)
    let foundIndex = items.findIndex(i => i.itemId == item.itemId)
    let add = false
    if(foundIndex<0){
        const itemNo = JSON.parse(localStorage.items).length + 1
        item.itemId = `I${itemNo}`;
        const sellerusername = localStorage.currentUser
        const seller = users.find(u => u.username == sellerusername)
        item.seller = {
            username: seller.username,   
            companyName: seller.companyName
        }
        item.image = localStorage.getItem('uploadedImage')
        items.push(item)
        localStorage.removeItem('uploadedImage')
        add = true
    }
    else{
        item.image= localStorage.getItem('uploadedImage') ? localStorage.getItem('uploadedImage') : items[foundIndex].image
        items[foundIndex] = {...items[foundIndex], ...item}
        localStorage.removeItem('uploadedImage')
        add = false
        
    }
    localStorage.items=JSON.stringify(items)
    form.reset()
    Swal.fire({
        title: add ? 'Added!' : 'Updated!',
        text: add ? 'Item successfully added' : 'Item successfully updated',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d65f83'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `items.html?items=myItems`;
        }
      })
    
}
function formToObject(form){
    const formData= new FormData(form)
    const data={}
    for (const [key, value] of formData){
        data[key] =value
    }
    return data
}

uploadImage.addEventListener('change', function() {getImageAsUrl(this)})

function getImageAsUrl(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        localStorage.setItem('uploadedImage', reader.result); //Store image
        imageInputs.innerHTML = imageInputs.innerHTML + `<img src=${localStorage.uploadedImage} alt="Item Image">` 
    }
    reader.readAsDataURL(file);
}

if(urlParameter.get('item')){
    const itemid = urlParameter.get('item');
    const item = items.find(b=> b.itemId==itemid)
    const itemId= document.querySelector('#itemId')
    const name= document.querySelector('#item-name')
    const image= document.querySelector('#item-image')
    const category= document.querySelector('#Ceramics')
    const price= document.querySelector('#item-price')
    const quantity= document.querySelector('#item-quantity')
    const description= document.querySelector('#item-description')
    const categories= document.querySelectorAll('input[name="category"]')
    itemId.value=item.itemId
    price.value=item.price
    quantity.value=item.quantity
    image.src = item.image
    name.value=item.name
    description.value=item.description
    category.value=item.category
    categories.forEach(c=> {if(c.value === item.category) {c.checked= true}})
   
}
cancelBTN.addEventListener('click',cancelSubmit)
function cancelSubmit(){
    // window.history.back() //go to prev page
    window.history.go(-2); //go back two pages
}  