

export async function fetchWorks() {
    const url = "http://localhost:5678/api/works";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const works = await response.json();
    return works; // Return the fetched works
}


export async function createWork(image, title, category) {


}



export async function deleteWork(workId) {
    console.log("Deleting work with ID:", workId);

    const deletee = "http://localhost:5678/api/works/";
    const token = localStorage.token;

    if (!token) {
        console.error("No authentication token found");
        return;
    }

    let response = await fetch(deletee + workId, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (response.status !== 200) {
        const errorBox = document.createElement("div");
        errorBox.className = "error-login";
        errorBox.innerHTML = "il y a une erreur: " + response.statusText;
        document.querySelector(".btn-ajouter").prepend(errorBox);
    } else {
        console.log("Work deleted successfully");
    }
}







