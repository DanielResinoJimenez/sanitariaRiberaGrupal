const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');

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

registerLink.addEventListener("click", showForm);
loginLink.addEventListener("click", showForm);