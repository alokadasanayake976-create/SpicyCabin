const products2 = [

    //pepper----
    { id: 1, image:innerHTML=`<img src="assets/images/photo9.webp" width="250" height="200" alt="" />`,qty:1000, price: 2000.00 },
    { id: 2, image:innerHTML=`<img src="assets/images/photo9.webp" width="250" height="200" alt="" />`,qty:500, price: 1000.00 },
    { id: 3, image:innerHTML=`<img src="assets/images/photo9.webp" width="250" height="200" alt="" />`,qty:250, price: 500.00 },
    { id: 4, image:innerHTML=`<img src="assets/images/photo9.webp" width="250" height="200" alt="" />`,qty:100, price: 200.00 },
    //ginger----
    { id: 5, image:innerHTML=`<img src="assets/images/photo14.jpg" width="250" height="200" alt="" />`,qty:1000, price: 1200.00 },
    //turmeric---
    { id: 5, image:innerHTML=`<img src="assets/images/photo11.jpg" width="250" height="200" alt="" />`,qty:1000, price: 2000.00 }


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


checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    //test
    checkoutBtn.addEventListener("click", () => formSidebar.classList.add("active"));
    //

    
    alert("Thank you for your purchase! Checkout completed.");
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove("active");
});

// Initial Run Sequence
renderProducts();
//-----------checkout form -------------

// =====================================
// CHECKOUT FORM ELEMENTS
// =====================================

const formSidebar =
    document.getElementById("form-sidebar");

const closeFormBtn =
    document.getElementById("close-form-btn");

const checkoutForm =
    document.getElementById("checkout-form");


// =====================================
// CHECKOUT BUTTON
// =====================================

checkoutBtn.addEventListener("click", function () {

    // Check if cart is empty
    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    // Show checkout form
    formSidebar.classList.add("active");


    // Close cart
    cartSidebar.classList.remove("active");

});


// =====================================
// CLOSE CHECKOUT FORM
// =====================================

closeFormBtn.addEventListener("click", function () {

    formSidebar.classList.remove("active");

});


// =====================================
// SUBMIT ORDER
// =====================================

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


    // Test in console
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

