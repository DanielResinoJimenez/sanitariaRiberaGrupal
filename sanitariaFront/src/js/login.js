const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const passwordForm = document.getElementById('passwordForm');
const getPassword = document.getElementById('getPassword');

// Show login or register form
const showForm = (event) => {
    event.preventDefault();
    if(event.target === registerLink) {
        loginForm.classList.add("hiddenForm");
        registerForm.classList.remove("hiddenForm");
    }
    if(event.target == loginLink) {
        loginForm.classList.remove("hiddenForm");
        registerForm.classList.add("hiddenForm");
    }
}

// Show restart password form
const showRestartForm = (event) => {
    event.preventDefault();
    loginForm.classList.add("hiddenForm");
    registerForm.classList.add("hiddenForm");
    passwordForm.classList.remove("hiddenForm");
}

// Event listeners
registerLink.addEventListener("click", showForm);
loginLink.addEventListener("click", showForm);
getPassword.addEventListener("click", showRestartForm);