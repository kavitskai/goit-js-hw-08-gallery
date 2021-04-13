import gallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  modal: document.querySelector(".lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
};

let activeIndex = null;

const markupGallery = gallery.map(({ original, preview, description }) => {
  return `
  <li class="gallery__item">
  <a class="gallery__link"
    href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"/>
  </a>
</li>`;
});

refs.gallery.insertAdjacentHTML("beforeend", markupGallery.join(""));

refs.gallery.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  markupGallery.forEach((el, index) => {
    if (el.includes(event.target.src)) {
      activeIndex = index;
      return;
    }
  });
  refs.modal.classList.add("is-open");
  refs.modalImg.src = event.target.dataset.source;
  refs.modalImg.alt = event.target.alt;
});

function closeModal() {
  refs.modal.classList.remove("is-open");
  refs.modalImg.src = "";
  refs.modalImg.alt = "";
}

refs.modal.addEventListener("click", (event) => {
  if (event.target.nodeName !== "IMG") {
    closeModal();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Escape") {
    closeModal();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight" && gallery.length - 1 > activeIndex) {
    activeIndex += 1;
    refs.modalImg.src = gallery[activeIndex].original;
    return;
  }
  if (event.code === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    refs.modalImg.src = gallery[activeIndex].original;
    return;
  }
  if (event.code === "ArrowRight" && activeIndex === gallery.length - 1) {
    activeIndex = 0;
    refs.modalImg.src = gallery[activeIndex].original;
    return;
  }
  if (event.code === "ArrowLeft" && activeIndex === 0) {
    activeIndex = gallery.length - 1;
    refs.modalImg.src = gallery[activeIndex].original;
    return;
  }
});
