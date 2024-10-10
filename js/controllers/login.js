import { login } from "../libs/users.js";

export function initLogin() {
    const $form = document.getElementById("login-form");
    const $email = document.getElementById("email");
    const $password = document.getElementById("password");

    if ($form) {
        $form.addEventListener("submit", async (event) => {
            event.preventDefault();
            let email = $email.value;
            let password = $password.value;
            try {
                let result = await login(email, password);

            } catch (error) {
                alert("erreur");
            }

        }
        )

    }
}

window.addEventListener('DOMContentLoaded', () => {
    initLogin()

});


