import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");
const galleryMarkup = createGalleryImagesMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryMarkup);

gallery.addEventListener("click", onModalClicks);

function createGalleryImagesMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href=${original}>
          <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}
          />
        </a>
      </div>`;
    })
    .join("");
}

function onModalClicks(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const modalOpts = {
    onShow: () => window.addEventListener("keydown", onEscKeyPress),
    onClose: () => window.removeEventListener("keydown", onEscKeyPress),
  };

  const currentImageLink = evt.target.dataset.source;
  const instance = basicLightbox.create(
    `
    <img width="1400" height="900" src=${currentImageLink}>
`,
    modalOpts
  );
  function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
  instance.show();
}
