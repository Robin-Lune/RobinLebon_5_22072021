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

            //fetching product API
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
            <article class="cart__item" data-id="${idProduct}">
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
        });
    });
    
}





productsList();




