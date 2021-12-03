// Set Dom Variables
let qtty = document.getElementById("quantity");
let clr = document.getElementById("colors");
let btn = document.getElementById("addToCart");
let cart = [];
// check if localStorage.Cart exist and push data to cart array
if (localStorage.getItem("Cart")) {
  cart = JSON.parse(localStorage.getItem("Cart"));
}

//get id from url
let params = (new URL(document.location)).searchParams;
var id = params.get('id');
console.log(id);

btn.addEventListener("click", () => {
  // if clr.value equal of empty or undefined, alert "Sélectionnez une couleur s'il vous plait"
  // if qtty.value equal of empty or undefined, alert "Sélectionnez une quantité valide s'il vous plait"
  // else push product info to array, if product id and clr.value are the same, increment qtty value

      // console.log(cart);
  if (clr.value === "" || clr.value === undefined) {
    alert("Sélectionnez une couleur s'il vous plait");
  } else if (qtty.value < 1 || qtty.value > 100) {
    alert("Sélectionnez une quantité valide s'il vous plait");
  } else {
    //if cart already contains product id and clr.value increment qtty value else push product info to array of object cart
    let data = cart.find((data) => data.id === id && data.clr === clr.value);
    if (data) {
      let index = cart.indexOf(data);
      cart[index] = {
        id: id,
        clr: clr.value,
        qtty: parseInt(cart[index].qtty) + parseInt(qtty.value),
      };
    } else {
      cart.push({ id: id, clr: clr.value, qtty: qtty.value });
    }

    //push cart in Cart LocalStorage vairiable;
    localStorage.Cart = JSON.stringify(cart);
    //put localStorage 'Cart' in an array to visualise the result
    let storedCart = JSON.parse(localStorage.Cart);
    console.log(storedCart);

    alert("Produit ajouté au panier");
  }
});

//fetching product API
async function getProduct() {
  let rep = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "GET",
  });
  let response = await rep.json();
    // console.log(response);
  return response;
}

// display JSON in the HTML
const main = () => {
  getProduct().then((product) => {
      console.log(product);
    let blocImage = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    let blocColors = product.colors.map((color) => {
        console.log(color);
      // console.log(index)
      return `<option value="${color}">${color}</option>`;
    });

    document.getElementById("title").innerText = product.name;
    document.getElementById("price").innerText = product.price;
    document.querySelector(".item__img").innerHTML = blocImage;
    document.getElementById("description").innerText = product.description;
    document.getElementById("colors").innerHTML += blocColors;
  }).catch((error) => {
    console.log(error)
    alert("Lancer le backend || le port 3000 est déja utilisé")
  });
};
main();
