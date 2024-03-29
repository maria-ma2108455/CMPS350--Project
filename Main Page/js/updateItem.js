// let items=[]
// let users=[]
items= JSON.parse(localStorage.items)
users= JSON.parse(localStorage.users)

const urlParameter = new URLSearchParams(window.location.search);
const itemid = urlParameter.get('item');

    const item = items.find(b=> b.itemId==itemid)
    const itemId= document.querySelector('#itemId')
    const name= document.querySelector('#item-name')
    const image= document.querySelector('#item-image')
    const category= document.querySelector('#Ceramics')
    const price= document.querySelector('#item-price')
    const quantity= document.querySelector('#item-quantity')
    const description= document.querySelector('#item-description')
    itemId.value=item.itemId
    price.value=item.price
    quantity.value=item.quantity
    image.src = item.image
    name.value=item.name
    description.value=item.description
    category.value=item.category
    
    

