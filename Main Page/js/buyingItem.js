const purchaseForm = document.querySelector("#purchase-form");

const cancel = document.querySelector('#cancel-btn')
purchaseForm.addEventListener("submit", confirmedPurchase)

cancel.addEventListener("click", cancelPurchase)




function confirmedPurchase(e) {
  
  e.preventDefault();

  const swalWithBootstrapButtons = Swal.mixin();

  swalWithBootstrapButtons.fire({
    title: "Are you sure about your purchase?",
    // text: "You won't be able to revert this!",
    icon: "warning",
    iconColor: '#d65f83',
    showCancelButton: true,
    confirmButtonText: "Yes, confirm!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: '#d65f83',
    cancelButtonColor: '#d65f83',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

    const users = localStorage.users;
    const user = JSON.parse(users);
    const foundUser = user.find((u) => u.username === localStorage.currentUser);

    const items = localStorage.items;
    const item = JSON.parse(items);
    const foundItem = item.find(it => it.itemId === localStorage.currentItemId);

    const totalPrice = foundItem.price * localStorage.custQuantity;
    let done = false;
    
    if (!done) {
      foundUser.moneyBalance -= totalPrice;
      foundItem.quantity -= localStorage.custQuantity;

      done = true;
    }

    addPurchase(foundUser, foundItem)

    localStorage.users = JSON.stringify(user)
    localStorage.items = JSON.stringify(item)

      swalWithBootstrapButtons.fire({
        title: "Purchase Confirmed!",
        text: "Your purchase has been confirmed and added to purchase history.",
        icon: "success",
        iconColor: '#d65f83',
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
        iconColor: '#d65f83',
        confirmButtonColor: '#d65f83'

      });
    }
  });

  // if (confirm("Are you sure about your purchase?")) {
  //   const users = localStorage.users;
  //   const user = JSON.parse(users);
  //   const foundUser = user.find((u) => u.username === localStorage.currentUser);

  //   const items = localStorage.items;
  //   const item = JSON.parse(items);
  //   const foundItem = item.find(it => it.itemId === localStorage.currentItemId);

  //   const totalPrice = foundItem.price * localStorage.custQuantity;
  //   let done = false;
    
  //   if (!done) {
  //     foundUser.moneyBalance -= totalPrice;
  //     foundItem.quantity -= localStorage.custQuantity;

  //     done = true;
  //   }

  //   addPurchase(foundUser, foundItem)

  //   localStorage.users = JSON.stringify(user)
  //   localStorage.items = JSON.stringify(item)
   
  //   alert("Purchase Confirmed");
  //   window.location.href = "mainpage.html";
    

  // } else {
  //   alert("Purchase Cancelled");
  // }
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


