const productsContainer =
  document.getElementById("productsContainer");

const pagination =
  document.getElementById("pagination");

const loading =
  document.getElementById("loading");

const error =
  document.getElementById("error");


let products = [];

let currentPage = 1;

const productsPerPage = 4;



async function fetchProducts() {

  try {

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();

    loading.textContent = "";

    displayProducts();

    createPagination();

  } catch (err) {

    loading.textContent = "";

    error.textContent =
      "Unable to load products.";

    console.error(err);
  }
}



function displayProducts() {

  productsContainer.innerHTML = "";


  const startIndex =
    (currentPage - 1) * productsPerPage;


  const endIndex =
    startIndex + productsPerPage;


  const currentProducts =
    products.slice(startIndex, endIndex);


  currentProducts.forEach((product) => {

    const card =
      document.createElement("div");

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



function createPagination() {

  pagination.innerHTML = "";


  const totalPages =
    Math.ceil(
      products.length / productsPerPage
    );



  const previousButton =
    document.createElement("button");

  previousButton.textContent = "Previous";

  previousButton.disabled =
    currentPage === 1;


  previousButton.addEventListener(
    "click",
    () => {

      currentPage--;

      displayProducts();

      createPagination();

    }
  );


  pagination.appendChild(previousButton);


  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {

    const button =
      document.createElement("button");


    button.textContent = page;


    if (page === currentPage) {
      button.classList.add("active");
    }


    button.addEventListener(
      "click",
      () => {

        currentPage = page;

        displayProducts();

        createPagination();

      }
    );


    pagination.appendChild(button);

  }


  
  const nextButton =
    document.createElement("button");

  nextButton.textContent = "Next";


  nextButton.disabled =
    currentPage === totalPages;


  nextButton.addEventListener(
    "click",
    () => {

      currentPage++;

      displayProducts();

      createPagination();

    }
  );


  pagination.appendChild(nextButton);
}



fetchProducts();