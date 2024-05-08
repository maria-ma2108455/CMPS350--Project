const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');

// let items= JSON.parse(localStorage.items)
// users= JSON.parse(localStorage.users)
const form = document.querySelector('#addItem-form')
const cancelBTN = document.querySelector('#cancel-btn')
const submitBTN = document.querySelector('#addItem-btn')
const fileInput = document.querySelector('#image')
const preview = document.querySelector("#preview")
const reader = new FileReader()
let update= false

const baseURL='http://localhost:3000'
document.addEventListener('DOMContentLoaded', async() => {
  if (itemId) {
    // fetching
    const response = await fetch(`${baseURL}/api/items/${itemId}`, {method: 'GET'})
     const item = await response.json()
      // const item = items.find(i => i.itemId === itemId)
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
      //  let foundIndex = items.findIndex(i => i.itemId == item.itemId)
      const sellerusername = localStorage.currentUser
      let add = false
      if (item.itemId==''){
        item.name = String(item.name)
        item.category = String(item.category)
        item.price = parseFloat(item.price)
        item.quantity = parseInt(item.quantity)
        item.description = String(item.description)
        item.featured=null
        const itemNo = JSON.parse(localStorage.items).length + 1
          item.itemId=String(Date.now())
          
          // const seller = users.find(u => u.username == sellerusername)
          const response1 = await fetch(`${baseURL}/api/${sellerusername}`, {method: 'GET'})
          user = await response1.json()
          item.sellerUN = String(user.username)   
          // item.sellerUN="canvas_harmony"
        const image = localStorage.getItem('uploadedImage')
        item.image= String(image)
          // item.image="images/ceramics/pink_vase.png"
          // items.push(item)
          const response = await fetch(`${baseURL}/api/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    console.log("added yay")
          localStorage.removeItem('uploadedImage')
          add = true
      }
      else{
        //get the item thats being updated using api to take the image from it 
        console.log("here2")
        const response2 = await fetch(`${baseURL}/api/items/${itemId}`, {method: 'GET'})
        const itemold = await response2.json()
        item.image= String(localStorage.getItem('uploadedImage')) ? localStorage.getItem('uploadedImage') : itemold.image
          // items[foundIndex] = {...items[foundIndex], ...item}
          console.log("here1")
          const response = await fetch(`${baseURL}/api/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          
        })
        console.log("here")
        console.log(item)
          localStorage.removeItem('uploadedImage')
          add = false
      }
      // localStorage.items=JSON.stringify(items)
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


// if(urlParameter.get('item')){
//     update=true
//     const itemid = urlParameter.get('item');
//     const response2 = await fetch(`${baseURL}/api/items/${itemId}`, {method: 'GET'})
//     const item = await response2.json()
//     const itemId= document.querySelector('#itemId')
//     const name= document.querySelector('#item-name')
//     const image= document.querySelector('#image')
//     const category= document.querySelector('#Ceramics')
//     const price= document.querySelector('#item-price')
//     const quantity= document.querySelector('#item-quantity')
//     const description= document.querySelector('#item-description')
//     const categories= document.querySelectorAll('input[name="category"]')
//     itemId.value=item.itemId
//     price.value=item.price
//     quantity.value=item.quantity
//     image.src = item.image
//     name.value=item.name
//     description.value=item.description
//     category.value=item.category
//     categories.forEach(c=> {if(c.value === item.category) {c.checked= true}})
   
// }
cancelBTN.addEventListener('click',cancelSubmit)
function cancelSubmit(){
    window.history.go(-2); //go back two pages
}  
