

export async function login(email, password) {
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new error("invalid email or password");
    }
    const data = await response.json()
    return data;

}
export function logout() {


    localStorage.removeItem("isLoggedIn");

    // Redirect to the login page after logout
    window.location.href = "index.html";

}



