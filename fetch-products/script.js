const fetchBtn = document.getElementById("fetchBtn");
const retryBtn = document.getElementById("retryBtn");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const productsContainer =
  document.getElementById("productsContainer");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const error = document.getElementById("error");
const emptyMessage = document.getElementById("emptyMessage");

let products = [];



fetchBtn.addEventListener("click", fetchProducts);



retryBtn.addEventListener("click", fetchProducts);



searchInput.addEventListener("input", filterProducts);



categoryFilter.addEventListener("change", filterProducts);


async function fetchProducts() {

  productsContainer.innerHTML = "";
  emptyMessage.textContent = "";
  errorBox.style.display = "none";

  loading.textContent = "Loading products...";

  try {

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );


    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }


    products = await response.json();


    loading.textContent = "";


    if (products.length === 0) {

      emptyMessage.textContent = "No products found.";

      return;
    }


    createCategories();

    displayProducts(products);

  } catch (err) {

    loading.textContent = "";

    error.textContent =
      "Something went wrong. Please try again.";

    errorBox.style.display = "block";

    console.error(err);
  }
}



function createCategories() {

  categoryFilter.innerHTML =
    '<option value="all">All Categories</option>';


  const categories = [
    ...new Set(products.map((product) => product.category))
  ];


  categories.map((category) => {

    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    categoryFilter.appendChild(option);
  });
}



function displayProducts(productList) {

  productsContainer.innerHTML = "";
  emptyMessage.textContent = "";


  if (productList.length === 0) {

    emptyMessage.textContent =
      "No products found.";

    return;
  }


  productList.map((product) => {

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

      <p class="description">
        ${product.description.substring(0, 100)}...
      </p>

      <p class="price">
        $${product.price}
      </p>

      <p class="rating">
        ⭐ ${product.rating.rate}
      </p>
    `;


    productsContainer.appendChild(card);
  });
}



function filterProducts() {

  const searchValue =
    searchInput.value.toLowerCase();

  const selectedCategory =
    categoryFilter.value;


  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(searchValue);


    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;


    return matchesSearch && matchesCategory;

  });


  displayProducts(filteredProducts);
}