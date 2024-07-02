import React from "react";
import getImagesWithThumbnail from "../../libs/get-images-with-thumbnails";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Gallery({ images }: { images: string[] }) {
  const imagesArr = getImagesWithThumbnail({
    imagesArr: images,
    url: "advert",
  });

  return (
    <ReactImageGallery
      items={imagesArr}
      thumbnailPosition="right"
      lazyLoad
      autoPlay
    />
  );
}

export default Gallery;
