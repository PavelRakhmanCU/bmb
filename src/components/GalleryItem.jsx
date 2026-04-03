import React from "react";

const GalleryItem = ({ title, description, imageURL, onImageClick }) => {
  return (
    <article className="gallery-item">
      <h2 className="gallery-item-title">{title}</h2>
      <figure className="gallery-item__figure">
        <button
          type="button"
          className="gallery-item__image-trigger"
          onClick={() => onImageClick({ imageURL, title, description })}
          aria-label={title ? `View larger image: ${title}` : "View larger image"}
        >
          <img
            className="gallery-item__image"
            src={imageURL}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </button>
      </figure>
      <p className="gallery-item-description">{description}</p>
    </article>
  );
};

export default GalleryItem;
