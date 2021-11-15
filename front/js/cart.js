let totalQtty = 0;
let productsPrice = 0;
let cart = [];

let VoidHTML = `
    <article class="cart__item" >
        <h2>Aucun article dans le panier</h2>
    </article>
    `;

// check if localStorage.Cart exist and push data to cart array
// if localStorage.Cart doesn't exist or if cart is empty, display "Aucun article dans le paniers"
if (localStorage.getItem("Cart")) {
  cart = JSON.parse(localStorage.getItem("Cart"));
} else {
  document.getElementById("cart__items").innerHTML = VoidHTML;
}
if (cart.length === 0) {
  document.getElementById("cart__items").innerHTML = VoidHTML;
}

// console.log(cart);

let productsList = async () => {
  // for each product in cart array display product in cart
  cart.forEach(function (product) {
    let idProduct = product.split(" ")[0];
    let ClrProduct = product.split(" ")[1];
    let qttyProduct = product.split(" ")[2];
    totalQtty += parseInt(qttyProduct);

    //fetching product API ///// Possibilité de faire un fetch sur la liste et de filtre les produits en fonction de l'index de l'id
    async function getProduct() {
      let rep = await fetch(`http://localhost:3000/api/products/${idProduct}`, {
        method: "GET",
      });
      let response = await rep.json();
      // console.log(response);
      return response;
    }
    getProduct().then((data) => {
      // create blocHTML for each product
      let blocHTML = `
            <article class="cart__item" data-id="${idProduct} ${ClrProduct}">
                <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${data.name}, ${ClrProduct}</h2>
                        <p>${data.price}€</p>
                    </div>
                     <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${qttyProduct}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qttyProduct}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
        </article>
            `;
      // append blocHTML to cart-products
      document.getElementById("cart__items").innerHTML += blocHTML;

      console.log(
        "PRICE :" +
          parseInt(data.price) +
          "   " +
          "QTTY :" +
          parseInt(qttyProduct)
      );
      productsPrice += parseInt(qttyProduct) * parseInt(data.price);
      console.log(productsPrice);

      //display total price and total quantity
      document.getElementById("totalQuantity").innerText = totalQtty;
      document.getElementById("totalPrice").innerText = productsPrice;

      //Listen for change on quantity input
      const inputs = [...document.getElementsByName("itemQuantity")];
      console.log(inputs);
      inputs.forEach((input) =>
        input.addEventListener("change", changeQuantity)
      );

      //Listen for click on "supprimer"
      const deletes = [...document.getElementsByClassName("deleteItem")];
      console.log(deletes);
      deletes.forEach((del) => del.addEventListener("click", deleteItem));
    });
  });
};
productsList();

// Change quantity of product in cart, update localStorage and display new total price and total quantity
// Check if quantity is a valid number
const changeQuantity = (e) => {
  console.log(cart);
  if (e.target.value < 1 || e.target.value > 100) {
    alert("Quantité non valide!");
  } else {
    let idTarget =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset
        .id;
    console.log(idTarget + " " + "QTTY: " + e.target.value);
    let data = cart.find((data) => data.includes(idTarget));
    if (data) {
      let index = cart.indexOf(data);
      cart[index] = idTarget + " " + e.target.value;
    }
    console.log("New Cart :" + cart);
    //update localStorage.Cart
    localStorage.setItem("Cart", JSON.stringify(cart));
    window.location.reload();
  }
};

// Delete product in cart, update localStorage and display new total price and total quantity

const deleteItem = (e) => {
  console.log("Supprimer");
  console.log(cart);
  let idTarget =
    e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
  console.log(idTarget + " " + "QTTY: " + e.target.value);
  let data = cart.find((data) => data.includes(idTarget));
  if (data) {
    let index = cart.indexOf(data);
    cart.splice(index, 1);
  }
  console.log("New Cart :" + cart);
  //update localStorage.Cart
  localStorage.setItem("Cart", JSON.stringify(cart));
  window.location.reload();
};

// ----------FORMS VALIDATOR---------

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const adress = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const order = document.getElementById("order");

// Check if string contain only space and letters (except for special characters)
const lettersAndSpaceCheck = (data) => {
  const regEx1 =
    / [^A-Za-zéèêëçàäâôòöùûüìîï] \`|\"|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s /g;
  if (data.match(regEx1)) {
    return true;
  } else {
    return false;
  }
};
// Check if string contain space, letters and numbers (except for special characters)
const lettersAndNumbersCheck = (data) => {
  //regex for letters space and numbers
  const regEx2 =
    / [^A-Za-z0-9éèêëçàäâôòöùûüìîï] \`|\"|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s /g;
  if (data.match(regEx2)) {
    return true;
  } else {
    return false;
  }
};
// check email validity
const emailValidation = (data) => {
  if (
    data.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  ) {
    console.log("Email valide");
    return true;
  } else {
    return false;
  }
};

const checkFormValidity = () => {
  if (lettersAndSpaceCheck(lastName.value)) {
    document.getElementById("lastNameErrorMsg").innerText = "Nom non valide";
  }
  if (lettersAndSpaceCheck(firstName.value)) {
    document.getElementById("firstNameErrorMsg").innerText =
      "Prénom non valide";
  }
  if (lettersAndNumbersCheck(adress.value)) {
    document.getElementById("addressErrorMsg").innerText = "Adresse non valide";
  }
  if (lettersAndNumbersCheck(city.value)) {
    document.getElementById("cityErrorMsg").innerText = "Ville non valide";
  }
  if (emailValidation(email.value) != true) {
    document.getElementById("emailErrorMsg").innerText = "Email non valide";
  }
};
// prevent event default on submit button
order.addEventListener("click", function (event) {
  event.preventDefault();
  // console.log("PRENOM: " + firstName.value+" " + "NOM: " + lastName.value + " " + "ADRESSE: " + adress.value + " " + "VILLE: " + city.value + " " + "EMAIL: " + email.value);    lettersAndSpaceCheck(firstName.value);
  document.getElementById("lastNameErrorMsg").innerText = "";
  document.getElementById("firstNameErrorMsg").innerText = "";
  document.getElementById("addressErrorMsg").innerText = "";
  document.getElementById("cityErrorMsg").innerText = "";
  document.getElementById("emailErrorMsg").innerText = "";
  checkFormValidity();
  if (
    lettersAndSpaceCheck(lastName.value) != true &&
    lettersAndSpaceCheck(firstName.value) != true &&
    lettersAndNumbersCheck(adress.value) != true &&
    lettersAndNumbersCheck(city.value) != true &&
    emailValidation(email.value)
  ) {
    alert("Formulaire valide");
    const order = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            adress: adress.value,
            city: city.value,
            email: email.value
        },
        products: ['test']
      };

    console.log(order);

    const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {'Content-Type': 'application/json'},
    };
    fetch( 'http://localhost:3000/api/products/order', options )
        .then( response => response.json() )
        .then( response => {
            // Do something with response.
            console.log( response );
        } );
    
//     // make a post request with form datas object and cart array 
// const postData = async (url = 'http://localhost:3000/api/products/order') => {
//     const response = await fetch(url, {
//         method: 'POST', 
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(order), 
//     });
//     try {
//         const newData = await response.json();
//         console.log(newData);
//         return newData;
//     } catch(error) {
//         console.log("error", error);
//     }
// }
// postData();   

  }


});




