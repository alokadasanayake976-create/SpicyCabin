

const products2 = [

    {
        id: 1,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp"
                 width="250"
                 height="200"
                 alt="Black Pepper">`,
        qty: 1000,
        price: 2000.00
    },

    {
        id: 2,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp"
                 width="250"
                 height="200"
                 alt="Black Pepper">`,
        qty: 500,
        price: 1000.00
    },

    {
        id: 3,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp"
                 width="250"
                 height="200"
                 alt="Black Pepper">`,
        qty: 250,
        price: 500.00
    },

    {
        id: 4,
        name: "Black Pepper",
        image: `<img src="assets/images/photo9.webp"
                 width="250"
                 height="200"
                 alt="Black Pepper">`,
        qty: 100,
        price: 200.00
    },

    {
        id: 5,
        name: "Ginger",
        image: `<img src="assets/images/photo14.jpg"
                 width="250"
                 height="200"
                 alt="Ginger">`,
        qty: 1000,
        price: 1200.00
    },

    {
        id: 6,
        name: "Turmeric",
        image: `<img src="assets/images/photo11.jpg"
                 width="250"
                 height="200"
                 alt="Turmeric">`,
        qty: 1000,
        price: 2000.00
    }

];



let cart = [];


const productList =
    document.getElementById("product-list");

const cartSidebar =
    document.getElementById("cart-sidebar");

const cartIconBtn =
    document.getElementById("cart-icon-btn");

const closeCartBtn =
    document.getElementById("close-cart-btn");

const cartItemsContainer =
    document.getElementById("cart-items-container");

const cartCountDisplay =
    document.getElementById("cart-count");

const cartTotalPriceDisplay =
    document.getElementById("cart-total-price");

const checkoutBtn =
    document.getElementById("checkout-btn");

const formSidebar =
    document.getElementById("form-sidebar");

const closeFormBtn =
    document.getElementById("close-form-btn");

const checkoutForm =
    document.getElementById("checkout-form");

const orderDetails =
    document.getElementById("order-details");


function renderProducts() {

    productList.innerHTML = products2.map(product => `

        <div class="product-card">

            <h3>
                ${product.image}
            </h3>

            <h4>
                ${product.name}
            </h4>

            <p class="product-qty">
                ${product.qty}g
            </p>

            <p class="product-price">
                Rs. ${product.price.toFixed(2)}
            </p>

            <button
                class="add-to-cart-btn"
                onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

    `).join("");
}


function addToCart(productId) {

    const product =
        products2.find(
            product => product.id === productId
        );

    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;
    }


    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCartUI();
}


function removeFromCart(productId) {

    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    updateCartUI();
}


function updateCartUI() {

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cartItemsContainer.innerHTML =
            cart.map(item => `

                <div class="cart-item">

                    <div>

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            Package:
                            ${item.qty}g
                        </p>

                        <p>
                            Price:
                            Rs. ${item.price.toFixed(2)}
                        </p>

                        <p>
                            Quantity:
                            ${item.quantity}
                        </p>

                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})">

                        Remove

                    </button>

                </div>

            `).join("");

    }


    const totalItemsCount =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const totalCartCost =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.price * item.quantity),
            0
        );


    cartCountDisplay.textContent =
        totalItemsCount;

    cartTotalPriceDisplay.textContent =
        totalCartCost.toFixed(2);
}


cartIconBtn.addEventListener(
    "click",
    function () {

        cartSidebar.classList.add("active");

    }
);


closeCartBtn.addEventListener(
    "click",
    function () {

        cartSidebar.classList.remove("active");

    }
);


checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }


        displayOrderDetails();


        formSidebar.classList.add("active");


        cartSidebar.classList.remove("active");

    }
);


closeFormBtn.addEventListener(
    "click",
    function () {

        formSidebar.classList.remove("active");

    }
);


function displayOrderDetails() {

    orderDetails.innerHTML = "";


    cart.forEach(function (item) {

        const subtotal =
            item.price * item.quantity;


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
                    <strong>Package Size:</strong>
                    ${item.qty}g
                </p>

                <p>
                    <strong>Ordered Quantity:</strong>
                    ${item.quantity}
                </p>

                <p>
                    <strong>Price:</strong>
                    Rs. ${item.price.toFixed(2)}
                </p>

                <p>
                    <strong>Subtotal:</strong>
                    Rs. ${subtotal.toFixed(2)}
                </p>

                <hr>

            </div>

        `;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.price * item.quantity),
            0
        );


    orderDetails.innerHTML += `

        <h3>
            Total:
            Rs. ${total.toFixed(2)}
        </h3>

    `;
}



// emailjs




checkoutForm.addEventListener(
    "submit",
    function (event) {

        // Stop page refresh
        event.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }


        const customerName =
            document
                .getElementById("customer-name")
                .value
                .trim();


        const customerEmail =
            document
                .getElementById("customer-email")
                .value
                .trim();


        const customerPhone =
            document
                .getElementById("customer-phone")
                .value
                .trim();


        const customerAddress =
            document
                .getElementById("customer-address")
                .value
                .trim();


        const customerCity =
            document
                .getElementById("customer-city")
                .value
                .trim();


        const customerMessage =
            document
                .getElementById("customer-message")
                .value
                .trim();


        let orderText = "";


        cart.forEach(function (item) {

            const subtotal =
                item.price * item.quantity;


            orderText +=
                "Product ID: " +
                item.id +
                "\n" +

                "Product: " +
                item.name +
                "\n" +

                "Package Size: " +
                item.qty +
                "g\n" +

                "Ordered Quantity: " +
                item.quantity +
                "\n" +

                "Price: Rs. " +
                item.price.toFixed(2) +
                "\n" +

                "Subtotal: Rs. " +
                subtotal.toFixed(2) +

                "\n\n";

        });


  
        const total =
            cart.reduce(
                function (sum, item) {

                    return sum +
                        (item.price *
                         item.quantity);

                },
                0
            );

        const templateParams = {

            customer_name:
                customerName,

            customer_email:
                customerEmail,

            customer_phone:
                customerPhone,

            customer_address:
                customerAddress,

            customer_city:
                customerCity,

            customer_message:
                customerMessage ||
                "No additional message",

            order_details:
                orderText,

            total_price:
                "Rs. " +
                total.toFixed(2)

        };



        console.log(
            "Customer:",
            customerName
        );

        console.log(
            "Email:",
            customerEmail
        );

        console.log(
            "Phone:",
            customerPhone
        );

        console.log(
            "Address:",
            customerAddress
        );

        console.log(
            "City:",
            customerCity
        );

        console.log(
            "Order:",
            orderText
        );

        console.log(
            "Total:",
            total
        );

        console.log(
            "EmailJS Parameters:",
            templateParams
        );



        emailjs.send(
            "service_7lz49mq",
            "template_bqtsfia",
            templateParams
        )

        .then(function (response) {

            console.log(
                "EMAIL SENT SUCCESSFULLY",
                response.status,
                response.text
            );


            alert(
                "Thank you " +
                customerName +
                "! Your order has been sent successfully."
            );


            checkoutForm.reset();

            cart = [];

            updateCartUI();

            formSidebar.classList.remove("active");

        })

        .catch(function (error) {

            console.error(
                "EMAILJS ERROR:",
                error
            );


            alert(
                "Sorry! Your order could not be sent."
            );

        });

    }
);



renderProducts();

updateCartUI();

