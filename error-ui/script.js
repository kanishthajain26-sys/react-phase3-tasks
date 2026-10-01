const retryBtn = document.getElementById("retryBtn");
const errorMessage = document.getElementById("errorMessage");

retryBtn.addEventListener("click", loadData);

async function loadData() {

  errorMessage.textContent = "Loading...";

  try {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/invalid-url"
    );

    if (!response.ok) {
      throw new Error("Failed to load data");
    }

    const data = await response.json();

    console.log(data);

    errorMessage.textContent = "Data loaded successfully!";

  } catch (error) {

    errorMessage.textContent =
      "Unable to load data. Please try again.";

    console.error(error);
  }
}

loadData();