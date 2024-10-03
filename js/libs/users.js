

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
            const editBanner = document.createElement("div");
            editBanner.classList.add("edit");
            editBanner.innerHTML = `<p><i class="fa-regular fa-pen-to-square"></i><a href="#modal1" class="js-modal"> Mode édition</a></p>`;
            document.body.appendChild(editBanner);
            localStorage.removeItem("isLoggedIn");
        }
    }

}


