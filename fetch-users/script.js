const fetchBtn = document.getElementById("fetchBtn");
const retryBtn = document.getElementById("retryBtn");

const searchInput = document.getElementById("searchInput");

const usersContainer = document.getElementById("usersContainer");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const error = document.getElementById("error");
const emptyMessage = document.getElementById("emptyMessage");

let users = [];


// Fetch Users button
fetchBtn.addEventListener("click", fetchUsers);


// Retry button
retryBtn.addEventListener("click", fetchUsers);


// Search users
searchInput.addEventListener("input", searchUsers);


// Fetch users from API
async function fetchUsers() {

  usersContainer.innerHTML = "";
  emptyMessage.textContent = "";
  errorBox.style.display = "none";

  loading.textContent = "Loading users...";

  try {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );


    // Check API response
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }


    // Convert response into JSON
    users = await response.json();


    loading.textContent = "";


    // Empty state
    if (users.length === 0) {

      emptyMessage.textContent = "No users found.";

      return;
    }


    // Display users
    displayUsers(users);

  } catch (err) {

    loading.textContent = "";

    error.textContent =
      "Something went wrong. Please try again.";

    errorBox.style.display = "block";

    console.error(err);
  }
}


// Display users
function displayUsers(userList) {

  usersContainer.innerHTML = "";

  emptyMessage.textContent = "";


  if (userList.length === 0) {

    emptyMessage.textContent = "No users found.";

    return;
  }


  userList.map((user) => {

    const card = document.createElement("div");

    card.className = "user-card";


    card.innerHTML = `
      <h2>${user.name}</h2>

      <p>
        <strong>Username:</strong>
        ${user.username}
      </p>

      <p>
        <strong>Email:</strong>
        ${user.email}
      </p>

      <p>
        <strong>Phone:</strong>
        ${user.phone}
      </p>

      <p>
        <strong>City:</strong>
        ${user.address.city}
      </p>

      <p>
        <strong>Company:</strong>
        ${user.company.name}
      </p>
    `;


    usersContainer.appendChild(card);
  });
}


// Search users
function searchUsers() {

  const searchValue = searchInput.value.toLowerCase();


  const filteredUsers = users.filter((user) => {

    return user.name.toLowerCase().includes(searchValue);

  });


  displayUsers(filteredUsers);
}