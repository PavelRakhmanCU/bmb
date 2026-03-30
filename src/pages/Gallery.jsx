import React from "react";
import GalleryItem from "../components/GalleryItem";
const Gallery = () => {
  const galleryData = [
    {
      title: "Modern Marble Oasis",
      beforeImage: "https://images.pexels.com/photos/15894741/pexels-photo-15894741.jpeg",
      afterImage: "https://images.pexels.com/photos/32998547/pexels-photo-32998547.jpeg",
      description:
        "Transforming a dated bathroom into a luxurious marble oasis. We added sleek marble countertops, a statement shower, and minimalist decor for a spa-like vibe",
    },
    {
      title: "Rustic Chic Revival",
      beforeImage: "https://images.pexels.com/photos/5718906/pexels-photo-5718906.jpeg",
      afterImage: "https://images.pexels.com/photos/34620428/pexels-photo-34620428.jpeg",
      description:
        "Breathing new life into a classic bathroom with rustic charm. Wood accents, earthy tones, and a vintage-inspired vanity create a cozy retreat.",
    },
    {
      title: "Sleek Urban Escape",
      beforeImage: "https://images.pexels.com/photos/5357023/pexels-photo-5357023.jpeg",
      afterImage: "https://images.pexels.com/photos/35493890/pexels-photo-35493890.jpeg",
      description:
        "Urban meets modern in this sleek bathroom renovation. Crisp lines, gray tones, and ample lighting create a fresh, city-inspired space.",
    },
    {
      title: "Nature Inspired Heaven",
      beforeImage: "https://images.pexels.com/photos/36476873/pexels-photo-36476873.jpeg",
      afterImage: "https://images.pexels.com/photos/22330617/pexels-photo-22330617.jpeg",
      description:
        "Escaping to nature without leaving home. We brought the outdoors in with earthy tones, natural textures, and a stunning shower feature wall.",
    },
  ];

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>

      <div className="gallery-container">
        {galleryData.map((project) => (
          <GalleryItem
            key={project.title}
            title={project.title}
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;