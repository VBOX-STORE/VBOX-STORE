// GET PRODUCT ID FROM URL

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));


// FIND PRODUCT

const product = products.find(item => item.id === productId);


// DISPLAY PRODUCT

const productDetails = document.getElementById("productDetails");


if(product){

productDetails.innerHTML = `

<div class="single-product">

<img src="${product.image}" alt="${product.name}">

<h1>${product.name}</h1>

<p>${product.description}</p>

<h2>&euro;${product.price}</h2>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>

`;

}


// ADD TO CART

function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let product = products.find(item => item.id === id);


cart.push(product);


localStorage.setItem("cart", JSON.stringify(cart));


alert("Added to cart");

}