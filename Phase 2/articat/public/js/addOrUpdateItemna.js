const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');

 let items= JSON.parse(localStorage.items)
users= JSON.parse(localStorage.users)
const form = document.querySelector('#addItem-form')
const cancelBTN = document.querySelector('#cancel-btn')
const submitBTN = document.querySelector('#addItem-btn')
const fileInput = document.querySelector('#image')
const preview = document.querySelector("#preview")
const reader = new FileReader()
let update= false


 document.addEventListener('DOMContentLoaded', async() => {
  if (itemId) {
    // fetching
    const response = await fetch(`api/items/${itemId}`, {method: 'GET'})
     const item = await response.json()
      submitBTN.textContent = 'Update Item'
      preview.src = item.image
      preview.classList.remove('hidden')
  }
})


form.addEventListener('submit',addForm)
async function addForm(e){
  e.preventDefault()
  let imageFile = document.querySelector('#image')

  if (!imageFile.value && !update) {
    Swal.fire({
      title: 'No Image Uploaded!',
      text: 'Please upload an image for your item',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d65f83'
    }).then((result) => {
      if(result.value){
        this.props.submitUser(this.state)
      }
    })
    } else {
      console.log("Form submitted")
      e.preventDefault()
      const item = formToObject(e.target)      
      console.log(item)
      //fetch
      const response = await fetch(`api/item/${item.itemId}`, { method: 'GET' })
      let add = false
      if((response.ok)){
       const itemNo= '33'
          item.itemId = `I${itemNo}`;
          const sellerusername = localStorage.currentUser
          const response1 = await fetch(`api/${sellerusername}`, {method: 'GET'})
          user = await response1.json()
          item.seller = {
              username: user.seller.username,   
              companyName: user.seller.companyName
          }
          item.image = localStorage.getItem('uploadedImage')
          const response = await fetch('api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    const responseData = await response.json();
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
}
function formToObject(form){
    const formData= new FormData(form)
    const data={}
    for (const [key, value] of formData){
        data[key] =value
    }
    return data
}

function handleEvent(event) {
  if (event.type === "load") {
    localStorage.setItem('uploadedImage', reader.result); //Store image
    preview.src = reader.result;
    preview.classList.remove('hidden')
  }
}

function addListeners(reader) {
  reader.addEventListener("load", handleEvent);
}

fileInput.addEventListener("change", handleSelected);
function handleSelected(e) {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    addListeners(reader);
    reader.readAsDataURL(selectedFile);
  }
}


if(urlParameter.get('item')){
    update=true
    const itemid = urlParameter.get('item');
    const item = items.find(b=> b.itemId==itemid)
    const itemId= document.querySelector('#itemId')
    const name= document.querySelector('#item-name')
    const image= document.querySelector('#image')
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
    window.history.go(-2); //go back two pages
}  
