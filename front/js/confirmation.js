//get id from url
let params = (new URL(document.location)).searchParams;
var id = params.get('orderId');
console.log(id);
// Pass id to html  
document.getElementById("orderId").innerText = id;
