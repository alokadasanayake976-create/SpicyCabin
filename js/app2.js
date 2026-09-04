const products2 = [

    {
        id: 1,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp" width="250" height="200" alt="Black Pepper">`,
        qty: 1000,
        price: 2000.00
    },

    {
        id: 2,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp" width="250" height="200" alt="Black Pepper">`,
        qty: 500,
        price: 1000.00
    },

    {
        id: 3,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp" width="250" height="200" alt="Black Pepper">`,
        qty: 250,
        price: 500.00
    },

    {
        id: 4,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp" width="250" height="200" alt="Black Pepper">`,
        qty: 100,
        price: 200.00
    },

    {
        id: 5,
        name: "Ginger",
        image: `<img src="assets/images/photo14.jpg" width="250" height="200" alt="Ginger">`,
        qty: 1000,
        price: 1200.00
    },

    {
        id: 6,
        name: "Turmeric",
        image: `<img src="assets/images/photo11.jpg" width="250" height="200" alt="Turmeric">`,
        qty: 1000,
        price: 2000.00
    }

];
//  Data Array
let cart = [];

// DOM Element Selectors
const productList = document.getElementById("product-list");
const cartSidebar = document.getElementById("cart-sidebar");
const cartIconBtn = document.getElementById("cart-icon-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCountDisplay = document.getElementById("cart-count");
const cartTotalPriceDisplay = document.getElementById("cart-total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// 1. Render Product Cards inside UI Layout Grid
function renderProducts() {
    productList.innerHTML = products2.map(product => `
        <div class="product-card">
            <h3>${product.image}</h3>
            <p class="product-qty">${product.qty.toFixed()}g</p>
            <p class="product-price">Rs.${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// 2. Add Item or Increment its Current Quantity State
function addToCart(productId) {
    const product = products2.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// 3. Remove Item Group Entirely From Cart array
function removeFromCart(productId) {

    const item = cart.find(item => item.id === productId);

    if (!item) {
        return;
    }

    // Reduce quantity by 1
    item.quantity--;

    // If quantity becomes 0, remove product
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCartUI();
}
///////////////////////////////////////////////
// 4. Recalculate Subtotals and Regenerate Cart Panel DOM Trees
function updateCartUI() {
    // Re-render Cart Item Rows
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.image}</h4>
                <small>Rs.${item.price.toFixed(2)} x ${item.quantity}</small>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    // Compute Totals
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCartCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Counter Badges and Footers
    cartCountDisplay.textContent = totalItemsCount;
    cartTotalPriceDisplay.textContent = totalCartCost.toFixed(2);
}


cartIconBtn.addEventListener("click", () => cartSidebar.classList.add("active"));
closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("active"));


checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Put cart products into the checkout form
    displayOrderDetails();

    // Open checkout form
    formSidebar.classList.add("active");

    // Close cart
    cartSidebar.classList.remove("active");

});
// Initial Run Sequence
renderProducts();


const formSidebar =
    document.getElementById("form-sidebar");

const closeFormBtn =
    document.getElementById("close-form-btn");

const checkoutForm =
    document.getElementById("checkout-form");
    const orderDetails = document.getElementById("order-details");


checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    // Show products and quantities
    displayOrderDetails();

    // Open checkout form
    formSidebar.classList.add("active");

    // Close cart
    cartSidebar.classList.remove("active");

});

closeFormBtn.addEventListener("click", function () {

    formSidebar.classList.remove("active");

});


checkoutForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();


    // Get customer name
    const customerName =
        document.getElementById("customer-name").value;


    // Get other customer details
    const customerEmail =
        document.getElementById("customer-email").value;

    const customerPhone =
        document.getElementById("customer-phone").value;

    const customerAddress =
        document.getElementById("customer-address").value;

    const customerCity =
        document.getElementById("customer-city").value;

    const customerMessage =
        document.getElementById("customer-message").value;
        


    
    console.log("Customer Name:", customerName);
    console.log("Email:", customerEmail);
    console.log("Phone:", customerPhone);
    console.log("Address:", customerAddress);
    console.log("City:", customerCity);
    console.log("Message:", customerMessage);

    console.log("Order:", cart);


    // Show confirmation
    alert(
        "Thank you " +
        customerName +
        "! Your order has been received."
    );


    // Clear form
    checkoutForm.reset();


    // Clear cart
    cart = [];

    updateCartUI();


    // Close checkout form
    formSidebar.classList.remove("active");

});
////////////////////////////////////////////////
function displayOrderDetails() {

    orderDetails.innerHTML = "";

    cart.forEach(item => {

        orderDetails.innerHTML += `
            <div class="order-item">

                <p>
                    <strong>Product ID:</strong>
                    ${item.id}
                </p>

                <p>
                    <strong>Product:</strong>
                    ${item.name}
                </p>

                <p>
                    <strong>Ordered Quantity:</strong>
                    ${item.quantity}
                </p>

                <p>
                    <strong>Package Size:</strong>
                    ${item.qty}g
                </p>

                <p>
                    <strong>Price:</strong>
                    Rs. ${item.price.toFixed(2)}
                </p>

                <p>
                    <strong>Subtotal:</strong>
                    Rs. ${(item.price * item.quantity).toFixed(2)}
                </p>

            </div>
        `;

    });
}
/////////////////////connect with emailjs //////////////////////////////////

emailjs.init("OldQspqGeoUKb5zbH");

checkoutForm.addEventListener("submit", function(event) {

// Get customer details
const customerName = document.getElementById("customer-name").value.trim();

const customerEmail = document.getElementById("customer-email").value.trim();

const customerPhone = document.getElementById("customer-phone").value.trim();

const customerAddress = document.getElementById("customer-address").value.trim();

const customerCity = document.getElementById("customer-city").value.trim();

const customerMessage = document.getElementById("customer-message").value.trim();


// Create the order details
let orderText = "";

cart.forEach(function(item) {

    const subtotal = item.price * item.quantity;

    orderText +=
        "Product ID: " + item.id + "\n" +
        "Product: " + item.name + "\n" +
        "Package Size: " + item.qty + "g\n" +
        "Ordered Quantity: " + item.quantity + "\n" +
        "Price: Rs. " + item.price.toFixed(2) + "\n" +
        "Subtotal: Rs. " + subtotal.toFixed(2) +
        "\n\n";
});


// Calculate total
const total = cart.reduce(function(sum, item) {

    return sum + (item.price * item.quantity);

}, 0);


// EmailJS variables
const templateParams = {

    customer_name: customerName,

    customer_email: customerEmail,

    customer_phone: customerPhone,

    customer_address: customerAddress,

    customer_city: customerCity,

    customer_message: customerMessage,

    order_details: orderText,

    total_price: "Rs. " + total.toFixed(2)

};


// Send email
emailjs.send(
    "service_7lz49mq",
    "template_bqtsfia",
    templateParams
)
.then(function(response) {

    console.log("Email sent successfully!");
    console.log(response);

    alert("Order sent successfully!");

    checkoutForm.reset();

    cart = [];

    updateCartUI();

    formSidebar.classList.remove("active");

})
.catch(function(error) {

    console.error("EmailJS Error:", error);

    alert("Failed to send order.");

});



});