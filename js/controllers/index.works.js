
import { fetchWorks } from "../libs/works.js";


export async function initWorks() {
    window.works = await fetchWorks();
    displayWorks(window.works);
}

export function displayWorks(works) {
    const $gallery = document.querySelector(".gallery");

    $gallery.innerHTML = "";
    works.forEach(work => {
        let $work = workToElement(work);
        $gallery.appendChild($work);

    });

}
export function workToElement(data) {

    let gallery = document.querySelector(".gallery");
    let $figure = document.createElement("figure"); // 


    $figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}"/> <figcaption>${data.title}</figcaption>`;

    gallery.appendChild($figure);
    // $galleriemodal.appendChild($figure)
    return $figure;
}

export function uploadPictureModale(inputFile) {
    const imageContainer = document.getElementById("image-container");
    inputFile = document.querySelector('input[type="file"]');

    return new Promise((resolve, reject) => {
        if (!inputFile.dataset.listenerAdded) {
            inputFile.addEventListener("change", (event) => {
                const file = event.target.files[0];  // Select the file
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const image = document.createElement("img");
                        image.src = e.target.result;
                        image.width = 100;  // Setting width as a number
                        imageContainer.appendChild(image);

                        // Hide elements with the class 'picturelaoded'
                        document.querySelectorAll(".picturelaoded").forEach((el) => {
                            el.classList.add("hidden");
                        });

                        // Display selected image file name (optional)
                        console.log("Selected Image:", file.name);

                        // Resolve the Promise with the selected file
                        resolve(file);
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.log("No file selected or file is invalid.");
                    reject("No file selected");
                }
            });
            inputFile.dataset.listenerAdded = "true";
        }
    });
}













