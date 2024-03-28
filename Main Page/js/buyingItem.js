const purchaseForm = document.querySelector("#purchase-form");
purchaseForm.addEventListener("submit", confirmedPurchase);


function confirmedPurchase(e) {
  
  e.preventDefault();

  if (confirm("Are you sure about your purchase?")) {
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
      // console.log(foundItem.quantity -= localStorage.custQuantity);
      localStorage.items = JSON.stringify(item);
      localStorage.users = JSON.stringify(user);
      done = true;
    }

    delete localStorage.custQuantity;
    delete localStorage.currentItemId;
   
    alert("Purchase Confirmed");
    window.location.href = "mainpage.html";
    addPurchase(foundUser, foundItem)

  } else {
    alert("Purchase Cancelled");
  }
}

function addPurchase(foundUser, foundItem){
  let purchase = {}

  const purchaseNo = localStorage.purchases.length + 1
  purchase.purchaseId = `P${purchaseNo}`;

  purchase.quantity=localStorage.custQuantity;

  purchase.item=foundItem
  purchase.customer=foundUser

  const totalPrice = foundItem.price * localStorage.custQuantity;
  purchase.totalPrice= totalPrice

  const purchases = JSON.parse(localStorage.purchases);
  purchases.push(purchase)
  localStorage.purchases = JSON.stringify(purchases)
}

