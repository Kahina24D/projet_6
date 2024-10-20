const alredyLoggedError = document.querySelector(".alredyLogged__error");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Si l'utilisateur est déjà connecté, on supprime le token
alredyLogged();

function alredyLogged() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        const p = document.createElement("p");
        p.innerHTML = "<br><br><br>Vous avez été déconnecté, veuillez vous reconnecter";

        return;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initLogin();
});

export async function initLogin() {
    const submitButton = document.getElementById("submit");


    if (submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent form from submitting
            let id = {
                email: email.value,
                password: password.value
            };
            login(id);
        });
    } else {
        console.error("Le bouton de soumission avec l'ID 'submit' n'a pas été trouvé.");
    }
}

const loginEmailError = document.querySelector(".loginEmail__error");
const loginMdpError = document.querySelector(".loginMdp__error");

export async function login(id) {
    loginEmailError.innerHTML = "";
    loginMdpError.innerHTML = "";

    // Validation de l'email
    if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer une addresse mail valide";
        loginEmailError.appendChild(p);
        return;
    }

    // Validation du mot de passe
    if (id.password.length < 5 || !id.password.match(/^[a-zA-Z0-9]+$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer un mot de passe valide";
        loginMdpError.appendChild(p);
        return;
    }

    // Requête de connexion
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(id)
    })
        .then(response => response.json())
        .then(result => {
            if (result.error || result.message) {
                const p = document.createElement("p");
                p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
                loginMdpError.appendChild(p);
            } else if (result.token) {
                localStorage.setItem("token", result.token);
                // Afficher/masquer les éléments après la connexion




                window.location.href = "index.html"; // Rediriger après connexion
            }
        })
        .catch(error => {
            console.log(error);
        });
}


