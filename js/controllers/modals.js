import { getUsers } from "../libs/users.js";
import { deleteWork, fetchWorks } from "../libs/works.js";


// Fonction pour ouvrir la modale 1
getUsers()
const openModal = function (e) {

    document.addEventListener('click', function (event) {

        let target = event.target;
        let href = target.getAttribute('href');
        const modal = document.querySelector(href);
        if (modal) {
            modal.style.display = 'block';  // Show the modal
            modal.removeAttribute("aria-hidden");
            modal.setAttribute("aria-modal", "true");

            modal.querySelector(".js-modal-close").addEventListener("click", closeModal);



        }

    })

}
const closeModal = function (e) {
    const modal = document.querySelector(".modal");
    if (modal === null) return;
    if (modal) { // Check if modal exists
        modal.style.display = 'none';  // Hide the modal
        modal.setAttribute("aria-hidden", true);
        modal.removeAttribute("aria-modal");
        modal.removeEventListener("click", closeModal);
        modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);

    }


};


//fonction principal qui declonche les modals
export function initModal() {

    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", openModal);

    });
    displayWorksModal()
    document.querySelectorAll(".js-modal-close").forEach(a => {
        a.addEventListener("click", closeModal);

    })



}


// Ajouter un écouteur pour fermer les modales en appuyant sur la touche "Escape"
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal(e);
    }
});

async function displayWorksModal(work) {
    const works = await fetchWorks()

    const $galleriemodal = document.querySelector(".gallerie-modal")

    $galleriemodal.innerHTML = ""
    window.works.forEach((work) => {
        let $el = createModalWorkElement(work)

        $galleriemodal.appendChild($el)



    })

    const tras = document.querySelectorAll(".fa-trash-can");

    tras.forEach((element) => {
        element.addEventListener("click", (event) => {
            const workId = event.target.getAttribute("data-id");
            deleteWork(workId);
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

//Toggling entre deux modales 

const addBtn = document.querySelector(".btn-ajouter")
addBtn.addEventListener("click", toggleModels)

function toggleModels() {

    const modal2 = document.querySelector(".add-modal")
    modal2.style.visibility = "visible"
    if (document.querySelector(".modal-wrapper").style.display = 'block') {
        document.querySelector(".modal-wrapper").style.display = 'none'
        document.querySelector(".add-modal").style.display = 'block'
    }
    else ("je pourais pas ouvrir la modal2")
}
// retour à la modal 1

function BackModal() {
    const modal2 = document.querySelector(".add-modal")
    modal2.style.visibility = "visible"

    if (document.querySelector(".add-modal").style.display = 'block') {
        document.querySelector(".add-modal").style.display = 'none'
        modal2.style.visibility = "hidden"
        document.querySelector(".modal-wrapper").style.display = 'block'

    } else {
        console.log("j arrive pas a afficher la modal")
    }

}
const rowBack = document.querySelector(".js-modal-back");
rowBack.addEventListener("click", BackModal);
//fermer la modale 2
const closeModale2 = document.querySelector(".js-modal-closer")
closeModale2.addEventListener("click", closeModal)


