const fetchBtn = document.getElementById("fetchBtn");
const retryBtn = document.getElementById("retryBtn");

const searchInput = document.getElementById("searchInput");

const usersContainer = document.getElementById("usersContainer");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const error = document.getElementById("error");
const emptyMessage = document.getElementById("emptyMessage");

let users = [];



fetchBtn.addEventListener("click", fetchUsers);



retryBtn.addEventListener("click", fetchUsers);



searchInput.addEventListener("input", searchUsers);



async function fetchUsers() {

  usersContainer.innerHTML = "";
  emptyMessage.textContent = "";
  errorBox.style.display = "none";

  loading.textContent = "Loading users...";

  try {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );


  
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }


   
    users = await response.json();


    loading.textContent = "";


    
    if (users.length === 0) {

      emptyMessage.textContent = "No users found.";

      return;
    }


   
    displayUsers(users);

  } catch (err) {

    loading.textContent = "";

    error.textContent =
      "Something went wrong. Please try again.";

    errorBox.style.display = "block";

    console.error(err);
  }
}



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



function searchUsers() {

  const searchValue = searchInput.value.toLowerCase();


  const filteredUsers = users.filter((user) => {

    return user.name.toLowerCase().includes(searchValue);

  });


  displayUsers(filteredUsers);
}