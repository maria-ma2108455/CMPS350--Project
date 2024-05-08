const purchaseForm = document.querySelector("#purchase-form");

const cancel = document.querySelector('#cancel-btn')

// const users = localStorage.users
// const user = JSON.parse(users)
// const foundUser = user.find((u) => u.username === localStorage.currentUser)

const response1 = await fetch(`api/${localStorage.currentUser}`,{ method: 'GET'})
const user = await response1.json()

document.addEventListener('DOMContentLoaded', showFormFields)
purchaseForm.addEventListener("submit", confirmedPurchase)

cancel.addEventListener("click", cancelPurchase)

async function showFormFields() {
  if (user.customer.shippingAddress) {
    purchaseForm.elements['name'].value = user.customer.name
    purchaseForm.elements['surname'].value = user.customer.surname
    purchaseForm.elements['phoneNumber'].value = user.customer.phoneNumber
    purchaseForm.elements['address'].value = user.customer.shippingAddress.split(',')[0]
    purchaseForm.elements['city'].value = user.customer.shippingAddress.split(',')[1]
  }
}



async function confirmedPurchase(e) {
  
  e.preventDefault();
  const response2 = await fetch(`api/items/${itemId}`,{ method: 'GET'})
  const item = await response2.json()

  const swalWithBootstrapButtons = Swal.mixin();

  swalWithBootstrapButtons.fire({
    title: "Are you sure about your purchase?",
    // text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, confirm!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: '#d65f83',
    cancelButtonColor: '#d65f83',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      const purchaseDetails = formToObject(e.target)

      const totalPrice = item.price * localStorage.custQuantity;

      user.customer.moneyBalance -= totalPrice;
      item.quantity -= localStorage.custQuantity;


      user.customer.name = purchaseDetails.name
      user.customer.surname = purchaseDetails.surname
      user.customer.phoneNumber = purchaseDetails.phoneNumber
      user.customer.shippingAddress = `${purchaseDetails.address}, ${purchaseDetails.city}`
      

      addPurchase(user.customer, item)

      // localStorage.users = JSON.stringify(user)
      // localStorage.items = JSON.stringify(item)

      swalWithBootstrapButtons.fire({
        title: "Purchase Confirmed!",
        text: "Your purchase has been confirmed and added to purchase history.",
        icon: "success",
        confirmButtonColor: '#d65f83'

      }).then(()=>{
        window.location.href="mainpage.html"
      });
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your attempt to purchase has been cancelled.",
        icon: "error",
        confirmButtonColor: '#d65f83'

      });
    }
  });

}

function formToObject(form) {

  const formData = new FormData(form)
  const data = {}

  // the name in html will become the key
  for (const [key, value] of formData) {
      data[key] = value
  }

  return data

} 


async function addPurchase(foundUser, foundItem){

  let purchase = {}

  const response = await fetch(`api/purchases`,{ method: 'POST'})
  const adding = await response.json()

  // const purchaseNo = JSON.parse(localStorage.purchases).length + 1
  // purchase.purchaseId = `P${purchaseNo}`;

  purchase.quantity = JSON.parse(localStorage.custQuantity);

  const { seller, ...item } = foundItem //?
  const sellerCompany = seller.companyName
  item.seller = sellerCompany
  purchase.item = { ...item } 

  const { purchases, ...customer } = foundUser
  purchase.customer = { ...customer }

  const totalPrice = foundItem.price * localStorage.custQuantity;
  purchase.totalPrice= totalPrice

  purchase.date = new Date()

  // const updatedPurchases = JSON.parse(localStorage.purchases);
  // updatedPurchases.push(purchase)
  // localStorage.purchases = JSON.stringify(updatedPurchases)

  //use the post


  delete purchase.totalPrice
  foundUser.purchases.push(purchase) //?

  delete localStorage.custQuantity;
  delete localStorage.currentItemId;

}


function cancelPurchase(){
  window.location.href=`itemdetail.html?item=${localStorage.currentItemId}`

  delete localStorage.custQuantity;
  delete localStorage.currentItemId
}


