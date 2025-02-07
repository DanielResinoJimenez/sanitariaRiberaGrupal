const loginButton = document.getElementById('loginButton');

// Validate formLogin
const validateLogin = (event) => {
    event.preventDefault();
    let valido = true;
    // Get values
    let email = document.getElementById('emailLogin').value;
    let errorEmail = document.getElementById('errorEmailLogin');
    let password = document.getElementById('passwordLogin').value;
    let errorPassword = document.getElementById('errorPasswordLogin');
    
    // Validate email
    if(email.validity.valueMissing){
        errorEmail.textContent = "Debes de introducir un valor";
        valido = false;
    }else if(email.validity.typeMismatch){
        errorEmail.textContent = "Formato Incorrecto"
        valido = false;
    }else{
        errorEmail.textContent = "";
    }
    // Validate password
    if (password.validity.valueMissing) {
        errorPassword.textContent = "Debes introducir un valor";
        valido = false;
    } else if (password.validity.tooShort || password.validity.tooLong) {
        errorPassword.textContent = "La contraseña debe tener entre 8 y 16 caracteres";
        valido = false;
    } else if (password.validity.patternMismatch) {
        errorPassword.textContent = "La contraseña debe incluir mayúsculas, minúsculas, números y símbolos";
        valido = false;
    } else {
        errorPassword.textContent = "";
    }
    // If all fields are correct
    if(valido){
        loginForm.submit();
    }
}
loginButton.addEventListener("click", validateLogin);

// Validate formRegister
const validateRegister = (event) => {
    event.preventDefault();
    let valido = true;
    // Get values
    let name = document.getElementById('name').value;
    let errorName = document.getElementById('errorName');
    let lastName = document.getElementById('lastName').value;
    let errorLastName = document.getElementById('errorLastName');
    let email = document.getElementById('emailRegister').value;
    let errorEmail = document.getElementById('errorEmailRegister');
    let password = document.getElementById('passwordRegister').value;
    let errorPassword = document.getElementById('errorPasswordRegister');
    let password2 = document.getElementById('password2Register').value;
    let errorPassword2 = document.getElementById('errorPassword2Register');

    // Validate name
    if(name.validity.valueMissing){
        errorName.textContent = "Debes de introducir un valor";
        valido = false;
    }else{
        errorName.textContent = "";
    }

    // Validate lastName
    if(lastName.validity.valueMissing){
        errorLastName.textContent = "Debes de introducir un valor";
        valido = false;
    }else{  
        errorLastName.textContent = "";
    }

    // Validate email
    if(email.validity.valueMissing){
        errorEmail.textContent = "Debes de introducir un valor";
        valido = false;
    }else if(email.validity.typeMismatch){
        errorEmail.textContent = "Formato Incorrecto"
        valido = false;
    }else{
        errorEmail.textContent = "";
    }

    // Validate password
    if (password.validity.valueMissing) {
        errorPassword.textContent = "Debes introducir un valor";
        valido = false;
    } else if (password.validity.tooShort || password.validity.tooLong) {
        errorPassword.textContent = "La contraseña debe tener entre 8 y 16 caracteres";
        valido = false;
    } else if (password.validity.patternMismatch) {
        errorPassword.textContent = "La contraseña debe incluir mayúsculas, minúsculas, números y símbolos";
        valido = false;
    } else {
        errorPassword.textContent = "";
    }

    // Validate password2
    if (password2.validity.valueMissing) {
        errorPassword2.textContent = "Debes introducir un valor";
        valido = false;
    } else if (password2 !== password) {
        errorPassword2.textContent = "Las contraseñas no coinciden";
        valido = false;
    } else {
        errorPassword2.textContent = "";
    }

    // If all fields are correct
    if(valido){
        registerForm.submit();
    }

}
