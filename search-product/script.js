const searchInput = document.getElementById("searchInput");
const productsContainer = document.getElementById("productsContainer");
const emptyMessage = document.getElementById("emptyMessage");

let products = [];



async function fetchProducts() {

  try {

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();

    displayProducts(products);

  } catch (error) {

    productsContainer.innerHTML =
      "<p>Something went wrong.</p>";

    console.error(error);
  }
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

      <h2>${product.title}</h2>

      <p class="price">
        $${product.price}
      </p>

      <p>
        Category: ${product.category}
      </p>
    `;

    productsContainer.appendChild(card);
  });
}



searchInput.addEventListener("input", () => {

  const searchValue =
    searchInput.value.toLowerCase().trim();


  const filteredProducts = products.filter((product) => {

    return product.title
      .toLowerCase()
      .includes(searchValue);

  });


  displayProducts(filteredProducts);

});


fetchProducts();