// VBOX STORE APP


// DISPLAY PRODUCTS
function displayProducts() {

    const productContainer = document.getElementById("products");

    if (!productContainer) return;

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `
        <div class="product-card">

            <a href="product.html?id=${product.id}">
<img src="${product.image}" alt="${product.name}">
</a>

            <a href="product.html?id=${product.id}">
<h3>${product.name}</h3>
</a>

            <p>${product.description}</p>

            <div class="price">
               &euro;${product.price}
            </div>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>
        `;

    });

}


// ADD TO CART
function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = products.find(item => item.id === id);

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");

}


// LOAD PRODUCTS
document.addEventListener("DOMContentLoaded", function(){

    displayProducts();

});

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartContainer = document.getElementById("cartContainer");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

    if(!item.quantity){
        item.quantity = 1;
    }

    cartContainer.innerHTML += `

    <div class="cart-item">

        <img src="${item.image}" width="120">

        <h3>${item.name}</h3>

        <p>&euro;${item.price} each</p>

<p>Subtotal: &euro;${item.price * item.quantity}</p>

        <div class="quantity-box">

<button onclick="decreaseQuantity(${index})">-</button>

<span class="quantity-number">${item.quantity}</span>

<button onclick="increaseQuantity(${index})">+</button>

</div>

        <br><br>

        <button onclick="removeFromCart(${index})">
        Remove
        </button>

    </div>

    <hr>

    `;

    total += item.price * item.quantity;

});

    cartTotal.innerHTML = "Total: &euro;" + total
}


function removeFromCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

function placeOrder(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let payment = document.getElementById("payment").value;
    console.log(name, email, phone, address, payment);

    if(name === "" || email === "" || phone === "" || address === ""){
        alert("Please fill all details");
        return;
    }


    let order = {
        name:name,
        email:email,
        phone:phone,
        address:address,
        payment:payment,
        cart: JSON.parse(localStorage.getItem("cart")) || []
    };


    localStorage.setItem("order", JSON.stringify(order));

  if(payment === "Bank Transfer"){
    window.location.href = "bank-transfer.html";
}
else if(payment === "Card Payment"){
    window.location.href = "card-payment.html";
}

}
  
  let total = order.cart.reduce((sum, item) => {
  return sum + (item.price * (item.quantity || 1));
}, 0);




function increaseQuantity(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(!cart[index].quantity){
        cart[index].quantity = 1;
    }

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


function decreaseQuantity(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(!cart[index].quantity){
        cart[index].quantity = 1;
    }

    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

function displayCheckout(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let checkoutItems = document.getElementById("checkoutItems");
    let checkoutTotal = document.getElementById("checkoutTotal");

    if(!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        let quantity = item.quantity || 1;

        let subtotal = item.price * quantity;

        total += subtotal;

        checkoutItems.innerHTML += `
        <div class="checkout-item">

            <img src="${item.image}" width="100">

            <h3>${item.name}</h3>

            &euro;${item.price}

            <p>Quantity: ${quantity}</p>

            <p>Subtotal: &euro;${subtotal}</p>

        </div>
        <hr>
        `;

    });


 checkoutTotal.innerHTML = "Total: &euro;" + total; 

}

function goToCheckout(){
    window.location.href = "checkout.html";
}

function filterProducts(category) {

    const productContainer = document.getElementById("products");

    productContainer.innerHTML = "";

    let filteredProducts;

    if (category === "All") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => 
            product.category === category
        );
    }


    filteredProducts.forEach(product => {

        productContainer.innerHTML += `
        
        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="price">
                &euro;${product.price}
            </div>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>

        `;

    });

}

function searchProducts(){

    const searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const productContainer = document.getElementById("products");

    productContainer.innerHTML = "";


    const filteredProducts = products.filter(product => {

        return (
            product.name.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue)
        );

    });


    filteredProducts.forEach(product => {

        productContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="price">
                &euro;${product.price}
            </div>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>

        `;

    });

}