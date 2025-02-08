

// Routes
const getUserRoute = "http://localhost:3000/sanitaria/usuarios/allusers";
const createUserRoute = "http://localhost:3000/sanitaria/usuarios/register";
const comprobateUserPass = "http://localhost:3000/sanitaria/usuarios/login";

let arrayUsers = [];

// Get user
const getUser = async () => {
    const response = await fetch(getUserRoute);
    const users = await response.json();
    arrayUsers.push(users);
}


// Load data user
const loadData = async () => {
    await getUser();
}
document.addEventListener("DOMContentLoaded", loadData);