

export async function login(email, password) {
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (response.status !== 200) {
        throw "invalid email or password";
    }

    const { token } = await response.json();
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true"); // Set flag for the edit mode banner
    window.location.href = "index.html"; // Redirect to the index page after login
}
// Check if user is logged in and show edit mode banner
export function getUsers() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (isLoggedIn === "true") {

            const lien = document.querySelector(".edit")
            lien.classList.remove("hidden")

        }
    }

}

