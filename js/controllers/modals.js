
import { fetchCategories } from "../libs/categories.js";
import { getUsers } from "../libs/users.js";
import { deleteWork, fetchWorks } from "../libs/works.js";


getUsers()

function openModal() {


    const modalSectionAdd = document.getElementById("modal-section-add");
    const modalSectionList = document.getElementById("modal-section-list");
    const addWorkButton = document.getElementById("add-work");
    addWorkButton.addEventListener("click", () => {
        modalSectionList.classList.add("hidden");
        modalSectionAdd.classList.remove("hidden");
    });
    modalSectionList.classList.remove("hidden");
}
// Ajouter un écouteur pour fermer les modale
const closeModal = function (e) {
    const modalSectionAdd = document.getElementById("modal-section-add");
    const modalSectionList = document.getElementById("modal-section-list");
    const modaloverlay = document.querySelector(".modal-overlay")
    const closeModal = document.querySelectorAll(".js-modal-close");

    closeModal.forEach((element) => {
        element.addEventListener("click", () => {
            modalSectionList.classList.add("hidden");
            modalSectionAdd.classList.add("hidden");
            modaloverlay.classList.add("hidden");

        });
    });

}

function BackModal() {
    const modalSectionAdd = document.getElementById("modal-section-add");
    const modalSectionList = document.getElementById("modal-section-list");
    modalSectionAdd.classList.add("hidden")
    modalSectionList.classList.remove("hidden")
}

//fonction principal qui decloncheles fonctions de la modale
export function initModal() {
    const modallist = document.querySelector(".list");

    const modaloverlay = document.querySelector(".modal-overlay")
    const lienModal = document.querySelector(".js-modal")
    lienModal.addEventListener("click", () => {


        if (modal && modaloverlay) {
            modal.classList.remove("hidden");

            modaloverlay.classList.remove("hidden");
            openModal();

        }
    });
    displayWorksModal()

    lienModal.addEventListener("click", () => {

        closeModal()

    });
    //Back to modale list
    const rowBack = document.querySelector(".js-modal-back");
    rowBack.addEventListener("click", BackModal);


};



async function displayWorksModal() {
    const works = await fetchWorks()

    const $galleriemodal = document.querySelector(".gallerie-modal")

    $galleriemodal.innerHTML = ""
    works.forEach((work) => {
        let $el = createModalWorkElement(work)

        $galleriemodal.appendChild($el)



    })

    const tras = document.querySelectorAll(".fa-trash-can");

    tras.forEach((element) => {
        element.addEventListener("click", async (event) => {
            const workId = event.target.getAttribute("data-id");
            let result = await deleteWork(workId);
            if (result) {
                window.works = window.works.filter((work) => {
                    return work.id !== workId
                })
                displayWorksModal()
                displayWorks(window.works)
            }
            else {
                const errorBox = document.createElement("div");
                errorBox.className = "error-login";
                errorBox.innerHTML = "il y a une erreur ";

            }
        });
    });


}

export function createModalWorkElement(data) {

    let gallery = document.querySelector(".gallery");
    let $figure = document.createElement("figure"); //



    $figure.innerHTML = `<div class="image-container">
  <img src="${data.imageUrl}" alt="${data.title}">
  <figcaption>${data.title}</figcaption>
  <i class="fa-solid fa-trash-can delete-icon " data-id="${data.id}"></i>
</div>`;


    gallery.appendChild($figure);

    return $figure;

}



export async function displayCategoryModal() {
    let selectValue = ""
    let categories = await fetchCategories()
    const select = document.getElementById("category");

    // Clear previous options to avoid duplication
    select.innerHTML = "";

    // Populate categories
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });

    // Initialize selectValue with the currently selected category
    selectValue = select.value;
}