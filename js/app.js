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
