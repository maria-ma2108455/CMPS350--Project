

let items=[]
let users=[]
items= JSON.parse(localStorage.items)
users= JSON.parse(localStorage.users)
const form = document.querySelector('#searchForm')
form.addEventListener('submit',addForm)
function addForm(e){
    e.preventDefault()
    const item= formToObject(e.target)
    item.itemId= Date.now()
    const sellerusername=JSON.parse(localStorage.currentuser)
    const seller= users.find(u=>u.username== sellerusername)
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
