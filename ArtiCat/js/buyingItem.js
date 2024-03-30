const purchaseForm = document.querySelector("#purchase-form");

const cancel = document.querySelector('#cancel-btn')

const users = localStorage.users;
const user = JSON.parse(users);
const foundUser = user.find((u) => u.username === localStorage.currentUser);

document.addEventListener('DOMContentLoaded', showFormFields)
purchaseForm.addEventListener("submit", confirmedPurchase)

cancel.addEventListener("click", cancelPurchase)

function showFormFields() {
  if (foundUser.shippingAddress) {
    purchaseForm.elements['name'].value = foundUser.name
    purchaseForm.elements['surname'].value = foundUser.surname
    purchaseForm.elements['phoneNumber'].value = foundUser.phoneNumber
    purchaseForm.elements['address'].value = foundUser.shippingAddress.split(',')[0]
    purchaseForm.elements['city'].value = foundUser.shippingAddress.split(',')[1]
  }
}



function confirmedPurchase(e) {
  
  e.preventDefault();

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
      
      const items = localStorage.items;
      const item = JSON.parse(items);
      const foundItem = item.find(it => it.itemId === localStorage.currentItemId);

      const totalPrice = foundItem.price * localStorage.custQuantity;

      foundUser.moneyBalance -= totalPrice;
      foundItem.quantity -= localStorage.custQuantity;


      foundUser.name = purchaseDetails.name
      foundUser.surname = purchaseDetails.surname
      foundUser.phoneNumber = purchaseDetails.phoneNumber
      foundUser.shippingAddress = `${purchaseDetails.address}, ${purchaseDetails.city}`
      
      addPurchase(foundUser, foundItem)

      localStorage.users = JSON.stringify(user)
      localStorage.items = JSON.stringify(item)

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


function addPurchase(foundUser, foundItem){

  let purchase = {}

  const purchaseNo = JSON.parse(localStorage.purchases).length + 1
  purchase.purchaseId = `P${purchaseNo}`;

  purchase.quantity = JSON.parse(localStorage.custQuantity);

  const { seller, ...item } = foundItem
  const sellerCompany = seller.companyName
  item.seller = sellerCompany
  purchase.item = { ...item } 

  const { purchases, ...customer } = foundUser
  purchase.customer = { ...customer }

  const totalPrice = foundItem.price * localStorage.custQuantity;
  purchase.totalPrice= totalPrice

  purchase.date = new Date()

  const updatedPurchases = JSON.parse(localStorage.purchases);
  updatedPurchases.push(purchase)
  localStorage.purchases = JSON.stringify(updatedPurchases)

  delete purchase.totalPrice
  foundUser.purchases.push(purchase)

  delete localStorage.custQuantity;
  delete localStorage.currentItemId;

}


function cancelPurchase(){
  window.location.href=`itemdetail.html?item=${localStorage.currentItemId}`

  delete localStorage.custQuantity;
  delete localStorage.currentItemId
}


