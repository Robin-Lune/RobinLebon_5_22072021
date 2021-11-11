let totalQtty = 0;
let productsPrice = 0;
let cart = [];


// check if localStorage.Cart exist and push data to cart array 
// if localStorage.Cart doesn't exist, display "Aucun article dans le paniers"
if (localStorage.getItem('Cart')) {
    cart = JSON.parse(localStorage.getItem('Cart'));
} else {
    let VoidHTML = `
    <article class="cart__item" >
        <h2>Aucun article dans le panier</h2>
    </article>
    `;
    document.getElementById('cart__items').innerHTML = VoidHTML;
}


// console.log(cart);

let productsList = async () => {
   

    // for each product in cart array display product in cart
    cart.forEach(function (product) {
        let idProduct = product.split(' ')[0];
        let ClrProduct = product.split(' ')[1];
        let qttyProduct = product.split(' ')[2];
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
        getProduct().then(data => {
        
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
            document.getElementById('cart__items').innerHTML += blocHTML;
           
            

            console.log("PRICE :" + parseInt(data.price)+ "   "+"QTTY :" +   parseInt(qttyProduct));        
            productsPrice += parseInt(qttyProduct) * parseInt(data.price);
            console.log(productsPrice);

            //display total price and total quantity
            document.getElementById('totalQuantity').innerText = totalQtty;
            document.getElementById('totalPrice').innerText = productsPrice;

            //Listen for change on quantity input
            const inputs = [...document.getElementsByName('itemQuantity')];
            console.log(inputs);
            inputs.forEach(input => input.addEventListener('change', changeQuantity));

            //Listen for click on "supprimer"
            const deletes = [...document.getElementsByClassName('deleteItem')];
            console.log(deletes);
            deletes.forEach(del => del.addEventListener('click', deleteItem));

        });
        
    });

    
    
}
productsList();

// Change quantity of product in cart, update localStorage and display new total price and total quantity
// Check if quantity is a valid number
const changeQuantity = (e) => {
    console.log(cart);
    if (e.target.value < 1 || e.target.value > 100){
        alert("Quantité non valide!")
    } else {
        let idTarget = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        console.log(idTarget + " " +"QTTY: "+ e.target.value);
        let data = cart.find(data => data.includes(idTarget));
        if (data) {
        let index = cart.indexOf(data);
        cart[index] = idTarget + ' ' + e.target.value;
        };
        console.log('New Cart :' + cart);
        //update localStorage.Cart
        localStorage.setItem('Cart', JSON.stringify(cart));
        window.location.reload();
    }
}

// Delete product in cart, update localStorage and display new total price and total quantity

const deleteItem =(e)=> {
    console.log('Supprimer');
    console.log(cart);
    let idTarget = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    console.log(idTarget + " " +"QTTY: "+ e.target.value);
    let data = cart.find(data => data.includes(idTarget));
    if (data) {
      let index = cart.indexOf(data);
      cart.splice(index, 1)
    };
    console.log('New Cart :' + cart);
    //update localStorage.Cart
    localStorage.setItem('Cart', JSON.stringify(cart));
    window.location.reload();
}


// ----------FORMS VALIDATOR---------

const firstName =  document.getElementById('firstName').value;
const lastName =  document.getElementById('lastName').value;
const adress =  document.getElementById('address').value;
const city =  document.getElementById('city').value;
const email = document.getElementById('email').value;
const order = document.getElementById('order');

order.addEventListener("submit", function(event){
    event.preventDefault()
    lettersAndSpaceCheck(firstName)
  });

// Check if name contain only space and letters
function lettersAndSpaceCheck(name)
 {
    var regEx = /^[a-z][a-z\s]*$/;
    if(name.match(regEx))
      {
       return true;
      }
    else
      {
      alert("N'entrez que des lettres et des espaces s'il vous plait.");
      return false;
      }
 }

