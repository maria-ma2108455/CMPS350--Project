


const uploadImage= document.querySelector('#item-image')
let items=[]
let users=[]
items= JSON.parse(localStorage.items)
users= JSON.parse(localStorage.users)
const form = document.querySelector('#addItem-form')
form.addEventListener('submit',addForm)
function addForm(e){
    console.log("Form submitted");
    e.preventDefault()
    const item= formToObject(e.target)
    item.itemId= Date.now()
    const sellerusername=JSON.parse(localStorage.currentuser)
    // const sellerusername="craftsworld_user"
    const seller= users.find(u=>u.username== sellerusername)
    item.seller = {
        username: seller.username,   
        companyName: seller.companyName
    }
    item.image = localStorage.getItem('uploadedImage')
    items.push(item)
    localStorage.items=JSON.stringify(items)
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