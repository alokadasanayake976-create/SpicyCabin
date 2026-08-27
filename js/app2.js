const products2 = [
    { id: 1, image:innerHTML=`<img src="assets/images/photo8.jpeg" width="250" height="200" alt="" />`, price: 2000.00 },
    { id: 2, image:innerHTML=`<img src="assets/images/photo9.webp" width="250" height="200" alt="" />`, price: 1000.00 },
    { id: 3, image:innerHTML=`<img src="assets/images/photo10.jpg" width="250" height="200" alt="" />`, price: 500.00 },
    { id: 4, image:innerHTML=`<img src="assets/images/photo11.jpg" width="250" height="200" alt="" />`, price: 200.00 },
    
    { id: 5, image:innerHTML=`<img src="assets/images/photo11.jpg" width="250" height="200" alt="" />`, price: 200.00 },

];

// Shopping Cart State Application Data Array
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
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

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

// 5. Drawer UI Toggle Interactions
cartIconBtn.addEventListener("click", () => cartSidebar.classList.add("active"));
closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("active"));

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase! Checkout completed.");
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove("active");
});

// Initial Run Sequence
renderProducts();
