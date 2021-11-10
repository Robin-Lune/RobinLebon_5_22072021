// Set Dom Variables 
let qtty = document.getElementById('quantity');
let clr = document.getElementById('colors');
let btn = document.getElementById('addToCart');
let cart = [];
// check if localStorage.Cart exist and push data to cart array
if (localStorage.getItem('Cart')) {
    cart = JSON.parse(localStorage.getItem('Cart'));
}



//get id from url 
var url = window.location.href;
var id = url.substring(url.lastIndexOf('=') + 1);
console.log(id);



btn.addEventListener('click', () => {
  // if clr.value equal of empty or undefined, alert "please select a color"
  // if qtty.value equal of empty or undefined, alert "please select a quantity"
  // else push product info to array, if product id and clr.value are the same, increment qtty value

  // console.log(cart);
  if (clr.value === '' || clr.value === undefined) {
      alert('Please select a color');
   } else if ( qtty.value < 1 || qtty.value > 100) {
    alert('Please select a quantity');
   } else {

    let data = cart.find(data => data.includes(id + ' ' + clr.value));
    if (data) {
      let index = cart.indexOf(data);
      cart[index] = id + ' ' + clr.value + ' ' + (parseInt(cart[index].split(' ')[2]) + parseInt(qtty.value));
    } else {
      cart.push(id + ' ' + clr.value + ' ' + qtty.value);
      
    }
      //push cart in Cart LocalStorage vairiable;
      localStorage.Cart = JSON.stringify(cart);
      //put localStorage 'Cart' in an array to visualise the result
      let storedCart = JSON.parse(localStorage.Cart);
      console.log(storedCart);
      
    alert('Product added to cart');      

  };

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
    getProduct().then(product => {
        console.log(product);
        let blocImage = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        let blocColors = product.colors.map((color)=> {  
            console.log(color)
            // console.log(index)
            return `<option value="${color}">${color}</option>`
        });

        
   
        document.getElementById('title').innerText = product.name;
        document.getElementById('price').innerText = product.price;
        document.querySelector('.item__img').innerHTML = blocImage;
        document.getElementById('description').innerText = product.description;
        document.getElementById('colors').innerHTML += blocColors;
       

    })
}
main();
