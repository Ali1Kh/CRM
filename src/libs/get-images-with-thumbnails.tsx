import config from "../services/config";

function getImagesWithThumbnail({
  imagesArr,
  url,
}: {
  imagesArr: string[];
  url: string;
}) {
  return imagesArr.map((img) => {
    return {
      original: config.storage_url + "/" + url + "/" + img,
      thumbnail: config.storage_url + "/" + url + "/" + img,
    };
  });
}

export default getImagesWithThumbnail;
