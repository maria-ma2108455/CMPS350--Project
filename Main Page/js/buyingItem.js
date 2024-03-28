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

  } else {
    alert("Purchase Cancelled");
  }
}


// function formToObject(purchaseForm){
//   const formData = new FormData(purchaseForm)
//   console.log(formData);
//   const data = {}

//   for (const [key, value] of formData){
//       data[key] = value
//   }

//   return data;
// }

// function addPurchase(p){
//     p.preventDefault()
//     const purchase = formToObject(p.target)
//     // book._id= Date.now();
//     // books.unshift(book)
//     localStorage.purchases = JSON.stringify(purchases)
//     hideForm()
// } 
