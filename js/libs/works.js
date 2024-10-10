import { uploadPictureModale } from "../controllers/index.works.js";
import { displayCategoryModal } from "../controllers/modals.js";


export async function fetchWorks() {
    const url = "http://localhost:5678/api/works";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const works = await response.json();
    return works; // Return the fetched works
}

//function to delete work
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
        return false
    } else {
        return true
    }
}







export async function creatWork() {
    let titleValue = ""
    const titleInput = document.getElementById("title-input");
    const categorySelect = document.getElementById("category");
    const pictureForm = document.getElementById("picture-form");

    const inputFile = document.querySelector('input[type="file"]');
    let imageFile;
    await displayCategoryModal();
    // Call uploadPictureModale and wait for the image file
    uploadPictureModale(inputFile).then((file) => {
        imageFile = file; // Get the selected image file
    }).catch((error) => {
        console.error("Error while selecting image:", error);
    });

    titleInput.addEventListener("input", function () {
        titleValue = titleInput.value; // Update titleValue on input
    });

    pictureForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Log the selected values
        console.log("Selected Image:", imageFile);
        console.log("Title:", titleValue);
        console.log("Category:", categorySelect.value);

        // Validate that an image is selected
        if (!imageFile) {
            console.log("Image missing");
            return;
        }

        // Prepare form data to submit
        const formData = new FormData();
        formData.append("image", imageFile); // Append the selected image file
        formData.append("title", titleValue); // Append the title value
        formData.append("category", categorySelect.value); // Append the selected category value

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token missing");
            return;
        }

        try {
            const url = "http://localhost:5678/api/works";
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: formData, // FormData includes the image, title, and category
            });

            if (!response.ok) {
                console.error("Upload failed");
                return false;
            } else {
                console.log("Image uploaded successfully!");
            }

        } catch (error) {
            console.error("Error occurred:", error);
        }
    });
}
creatWork()