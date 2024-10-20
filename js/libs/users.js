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
                window.location.href = "index.html";

            }
            console.log("hello monde")
        })
        .catch(error => {
            console.log(error);
        });
}

// export function logout() {


//     localStorage.removeItem("isLoggedIn");

//     // Redirect to the login page after logout
//     window.location.href = "index.html";

// }



