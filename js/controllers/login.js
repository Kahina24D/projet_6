import { login } from "../libs/users.js";

export function initLogin() {
    const $form = document.getElementById("login-form");
    const $email = document.getElementById("email");
    const $password = document.getElementById("password");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginlien = document.querySelector(".login")

    if (isLoggedIn === "true") {
        checkUserLoginStatus(); // Appel de la fonction pour gérer l'affichage si l'utilisateur est déjà connecté
    }

    if ($form) {
        $form.addEventListener("submit", async (event) => {
            event.preventDefault();
            let email = $email.value;
            let password = $password.value;

            try {
                let result = await login(email, password);
                if (result) {
                    console.log("Login successful");

                    // Store login status in localStorage
                    localStorage.setItem("isLoggedIn", "true");

                    // Redirect to the index page
                    window.location.href = "index.html";



                }
            } catch (error) {
                alert("Erreur lors de la connexion");
            }
        });
    }
}


window.addEventListener('DOMContentLoaded', () => {
    initLogin()

});

export function checkUserLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginlien = document.querySelector(".logIn")
    const logout = document.querySelector(".logout")

    if (isLoggedIn === "true") {
        const lien = document.querySelector(".edit");
        if (lien && loginlien) {
            lien.classList.remove("hidden");
            loginlien.classList.add("hidden")
            logout.classList.remove("hidden")
        }

    }


}
document.querySelector(".logout").addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginLink = document.querySelector(".logIn"); // Renommé loginlien en loginLink
    const logoutButton = document.querySelector(".logout"); // Renommé logout en logoutButton

    if (isLoggedIn === "true") {
        const lien = document.querySelector(".edit");
        if (lien && loginLink) {
            lien.classList.add("hidden"); // Cacher le lien d'édition
            loginLink.classList.remove("hidden"); // Afficher le lien de login
            logoutButton.classList.add("hidden"); // Cacher le bouton de déconnexion
        }

        // Déconnecter l'utilisateur
        localStorage.removeItem("isLoggedIn"); // Supprimer le statut de connexion
        window.location.href = "index.html"; // Rediriger vers la page d'accueil
    }
});
