const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const resetBtn = document.getElementById("resetBtn");
const retryBtn = document.getElementById("retryBtn");

const productsContainer =
  document.getElementById("productsContainer");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");

let products = [];


// Events
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);

resetBtn.addEventListener("click", resetFilters);
retryBtn.addEventListener("click", fetchProducts);


// Fetch Products
async function fetchProducts() {

  loading.textContent = "Loading products...";
  errorBox.style.display = "none";
  productsContainer.innerHTML = "";
  emptyMessage.textContent = "";

  try {

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();

    loading.textContent = "";

    createCategories();

    displayProducts(products);

  } catch (error) {

    loading.textContent = "";

    errorMessage.textContent =
      "Unable to load products. Please try again.";

    errorBox.style.display = "block";

    console.error(error);
  }
}


// Create Categories
function createCategories() {

  categoryFilter.innerHTML = `
    <option value="all">All Categories</option>
  `;

  const categories = [];

  products.forEach((product) => {

    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }

  });


  categories.forEach((category) => {

    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    categoryFilter.appendChild(option);

  });
}


// Filter Products
function filterProducts() {

  const selectedCategory = categoryFilter.value;
  const selectedPrice = priceFilter.value;


  const filteredProducts = products.filter((product) => {

    // Category condition
    const categoryMatch =
      selectedCategory === "all" ||
      product.category === selectedCategory;


    // Price condition
    let priceMatch = true;


    if (selectedPrice === "0-50") {

      priceMatch = product.price < 50;

    }

    else if (selectedPrice === "50-100") {

      priceMatch =
        product.price >= 50 &&
        product.price <= 100;

    }

    else if (selectedPrice === "100-200") {

      priceMatch =
        product.price > 100 &&
        product.price <= 200;

    }

    else if (selectedPrice === "200") {

      priceMatch = product.price > 200;

    }


    return categoryMatch && priceMatch;

  });


  displayProducts(filteredProducts);
}


// Display Products
function displayProducts(productList) {

  productsContainer.innerHTML = "";
  emptyMessage.textContent = "";


  if (productList.length === 0) {

    emptyMessage.textContent =
      "No products found.";

    return;
  }


  productList.forEach((product) => {

    const card = document.createElement("div");

    card.className = "product-card";


    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.title}"
      >

      <span class="category">
        ${product.category}
      </span>

      <h2>${product.title}</h2>

      <p class="price">
        $${product.price}
      </p>
    `;


    productsContainer.appendChild(card);

  });
}


// Reset
function resetFilters() {

  categoryFilter.value = "all";
  priceFilter.value = "all";

  displayProducts(products);
}


// Start
fetchProducts();