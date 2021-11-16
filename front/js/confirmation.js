//get id from url
var url = window.location.href;
var id = url.substring(url.lastIndexOf("=") + 1);
console.log(id);
// Pass id to html  
document.getElementById("orderId").innerText = id;
