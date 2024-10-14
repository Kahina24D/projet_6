
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

    //refair tt ca
    $figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}"/> <figcaption>${data.title}</figcaption>`;

    gallery.appendChild($figure);

    return $figure;
}













