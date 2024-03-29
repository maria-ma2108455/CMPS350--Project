


const urlParameter = new URLSearchParams(window.location.search);
const uploadImage= document.querySelector('#item-image')
// let items=[]
// let users=[]
items= JSON.parse(localStorage.items)
users= JSON.parse(localStorage.users)
const form = document.querySelector('#addItem-form')
form.addEventListener('submit',addForm)
function addForm(e){
    console.log("Form submitted");
    e.preventDefault()
    const item= formToObject(e.target)
    let foundIndex = items.findIndex(i => i.itemId == item.ItemId)
    if(foundIndex<0){
        const itemNo = JSON.parse(localStorage.items).length + 1
        item.itemId = `I${itemNo}`;
        const sellerusername=localStorage.currentUser
        const seller= users.find(u=>u.username== sellerusername)
        item.seller = {
            username: seller.username,   
            companyName: seller.companyName
        }
        item.image = localStorage.getItem('uploadedImage')
        items.push(item)
    }
    else{
        items[foundIndex] = {...items[foundIndex], ...item};

    }
    localStorage.items=JSON.stringify(items)
    form.reset()
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