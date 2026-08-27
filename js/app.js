//--------------- Store Data ------------------

const products = [
    {
        name: "Ginger",
        category: "spices",
        description: " 🌿 Fresh Ginger add a natural kick to your meals with our fresh, aromatic ginger. Carefully selected for its bold flavor and refreshing aroma, it is perfect for cooking, herbal drinks, teas, and everyday wellness. Fresh, flavorful, and packed with character.",
        stock:" Current stock of Ginger: 50kg",
        moreinfo: innerHTML=`<a href="products.html">products</a>`
    },
    {
        name: "Pepper",
        category: "spices",
        description: " 🌶️ Premium Black Pepper bring rich flavor and a gentle heat to every dish with our premium black pepper. Carefully selected for its strong aroma and distinctive taste, it's an excellent choice for seasoning curries, soups, meats, vegetables, and more.",
        stock:"Current stock of Pepper: 50kg",
         moreinfo: innerHTML=`<a href="products.html">products</a>`
    },
    {
        name:"Turmreric",
        category:"",
        description:" 🌿 Premium Turmeric discover the natural goodness of our high-quality turmeric, carefully selected for its vibrant golden color, rich aroma, and earthy flavor. Perfect for curries, rice dishes, teas, and traditional recipes, our turmeric adds beautiful color and delicious depth to every meal. **Pure, flavorful, and naturally wholesome — straight from the farm to your kitchen.",
        stock:"Current stock of Turmreric: 50kg",
         moreinfo: innerHTML=`<a href="products.html">products</a>`
    }
];


//--------------- Get HTML Elements ------------------

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");


//--------------- Display Results ------------------

function displayResults(data) {

    results.innerHTML = "";

    data.forEach(function(product) {

        results.innerHTML += `
            <div class="result">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>${product.description}</p>
                <p>${product.stock}</p>
                <p>${product.moreinfo}</p>
            </div>
        `;

    });
}


//--------------- Live Search ------------------

searchInput.addEventListener("input", function() {

    // Get user's input
    const searchText = searchInput.value.trim().toLowerCase();

    console.log(searchText);


    // If search box is empty
    if (searchText === "") {

        results.innerHTML = "";

        return;
    }


    // Filter products
    const filteredProducts = products.filter(function(product) {

        return (
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText)||
            product.stock.toLocaleLowerCase().includes(searchText)||
            product.moreinfo.toLocaleLowerCase().includes(searchText)
        );

    });


    // Display filtered products
    displayResults(filteredProducts);

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mock Product Database
const products2 = [
    { id: 1, name: "Wireless Headphones", price: 89.99 },
    { id: 2, name: "Smart Watch", price: 149.99 },
    { id: 3, name: "Mechanical Keyboard", price: 69.99 },
    { id: 4, name: "Gaming Mouse", price: 45.50 }
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
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
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
                <h4>${item.name}</h4>
                <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
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
