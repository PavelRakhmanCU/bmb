import React from "react";

const GalleryItem = ({ title, beforeImage, afterImage, description }) => {
  return (
    <article className="gallery-item">
      <h2 className="gallery-item-title">{title}</h2>

      <div className="gallery-item-images">
        <figure className="gallery-image-block">
          <img src={beforeImage} alt={`${title} before renovation`} loading="lazy" />
          <figcaption>Before</figcaption>
        </figure>

        <figure className="gallery-image-block">
          <img src={afterImage} alt={`${title} after renovation`} loading="lazy" />
          <figcaption>After</figcaption>
        </figure>
      </div>

      <p className="gallery-item-description">{description}</p>
    </article>
  );
};

export default GalleryItem;
