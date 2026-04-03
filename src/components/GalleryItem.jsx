import React from "react";

const GalleryItem = ({ title, description, imageURL }) => {
  return (
    <article className="gallery-item">
      <h2 className="gallery-item-title">{title}</h2>
      <figure className="gallery-item__figure">
        <img
          className="gallery-item__image"
          src={imageURL}
          alt={title ? `Renovation project: ${title}` : "Renovation project photo"}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <p className="gallery-item-description">{description}</p>
    </article>
  );
};

export default GalleryItem;
