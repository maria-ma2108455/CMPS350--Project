const purchaseForm = document.querySelector("#purchase-form");
purchaseForm.addEventListener("submit", confirmedPurchase);


function confirmedPurchase(e) {
  e.preventDefault();
  // console.log('purchase works');

  if (confirm("Are you sure about your purchase?")) {
    const users = localStorage.users;
    const user = JSON.parse(users);
    const foundUser = user.find((u) => u.username === localStorage.currentUser);

    let items = [];
    const allItems = localStorage.itemsArray;
    items = JSON.parse(allItems).items;

    
    const foundItem = items.find(
      (it) => it.itemId === localStorage.currentItemId
    );

    const totalPrice = foundItem.price * localStorage.custQuantity;

    let done = false;
    let purchase = false;
    if (!done) {
    //   foundUser.moneyBalance -= totalPrice;
      foundItem.quantity -= localStorage.custQuantity;

      localStorage.itemsArray = JSON.stringify(JSON.parse(allItems));
    //   localStorage.users = JSON.stringify(user);
      done = true;
    } 

    while(done && !purchase){
      window.location.href = "mainpage.html";
      alert("Purchase Confirmed");
      delete localStorage.custQuantity;
      delete localStorage.currentItemId;
      purchase=true
        break
    }
  } else {
    alert("Purchase Cancelled");
  }
}
