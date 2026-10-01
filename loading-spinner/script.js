const loadBtn = document.getElementById("loadBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const empty = document.getElementById("empty");
const userList = document.getElementById("userList");

const API_URL = "https://jsonplaceholder.typicode.com/users";

loadBtn.addEventListener("click", loadUsers);

async function loadUsers() {
  loading.classList.remove("hidden");
  error.classList.add("hidden");
  empty.classList.add("hidden");
  userList.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    // Testing ke liye 1 second delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    loading.classList.add("hidden");

    if (users.length === 0) {
      empty.classList.remove("hidden");
      return;
    }

    users.forEach((user) => {
      const card = document.createElement("div");

      card.className = "user-card";

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p>${user.email}</p>
      `;

      userList.appendChild(card);
    });

  } catch (err) {
    loading.classList.add("hidden");

    error.classList.remove("hidden");
    error.textContent = err.message;
  }
}