

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


// Validate User
const validateRegister = () => {
    let valido = true;

    let name = document.getElementById('name');
    let errorName = document.getElementById('errorName');
    let lastName = document.getElementById('lastName');
    let errorLastName = document.getElementById('errorLastName');
    let email = document.getElementById('emailRegister');
    let errorEmail = document.getElementById('errorEmailRegister');
    let password = document.getElementById('passwordRegister');
    let errorPassword = document.getElementById('errorPasswordRegister');
    let password2 = document.getElementById('password2Register');

    if (name.validity.valueMissing) {
        errorName.textContent = "*Campo Obligatorio";
        valido = false;
    } else {
        errorName.textContent = "";
    }

    if (lastName.validity.valueMissing) {
        errorLastName.textContent = "*Campo Obligatorio";
        valido = false;
    } else {
        errorLastName.textContent = "";
    }

    if (email.validity.valueMissing) {
        errorEmail.textContent = "*Campo Obligatorio";
        valido = false;
    } else if (email.validity.typeMismatch) {
        errorEmail.textContent = "*Formato Incorrecto";
        valido = false;
    } else {
        errorEmail.textContent = "";
    }

    if (password.validity.valueMissing) {
        errorPassword.textContent = "*Campo Obligatorio";
        valido = false;
    } else if (password.validity.tooShort || password.validity.tooLong) {
        errorPassword.textContent = "*La contraseña debe tener entre 8 y 16 caracteres";
        valido = false;
    } else if (password.validity.patternMismatch) {
        errorPassword.textContent = "*Debe incluir mayúsculas, minúsculas, números y símbolos";
        valido = false;
    } else if (password2.value !== password.value) {
        errorPassword.textContent = "*Las contraseñas no coinciden";
        valido = false;
    } else {
        errorPassword.textContent = "";
    }

    return valido; 
};

const registerUser = (event) => {
    event.preventDefault(); 


    if(validateRegister()){
        let name = document.getElementById('name').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('emailRegister').value;
        let password = document.getElementById('passwordRegister').value;

        let user = {
            name: name,
            lastName: lastName,
            email: email,
            password: password
        }

        let userExist = arrayUsers[0].some(element => element.email === user.email);

        if(userExist){
            alert("El usuario ya existe");
        }else{
            fetch(createUserRoute, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Usuario registrado correctamente");
                window.location.href = "../pages/prueba.html";
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("registerButton");
    if (registerButton) {
        registerButton.addEventListener("click", registerUser);
    }
});


// Load data user
const loadData = async () => {
    await getUser();
}
document.addEventListener("DOMContentLoaded", loadData);