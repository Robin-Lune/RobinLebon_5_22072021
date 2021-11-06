//fetching products API
async function getProducts() {
  let rep = await fetch("http://localhost:3000/api/products", {
    method: "GET",
  });
  let response = await rep.json();
  return response;
}


// display JSON in HTML
const displayProducts = (articles) => {
  console.log(articles);
  for (let article in articles) {
    const blocHTML = `<a href="./product.html?id=${articles[article]._id}">
    <article>
      <img src="${articles[article].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${articles[article].name}</h3>
      <p class="productDescription">${articles[article].description}</p>
    </article>
    </a>`;
    document.querySelector(".items").innerHTML += blocHTML;
  }
};


const main = async () => {
 getProducts().then(displayProducts);
};

main();










