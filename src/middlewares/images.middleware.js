import { catchAsync } from "../utils/catchAsync.utils.js";
import multer from "multer";
import jimp from "jimp";
import { v4 as uuidv4 } from "uuid";

const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }
  cb("Please only upload Images", false);
};

const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //LIMIT OF FILE SIZE IS 5MBS
});

/**
 * Generate an image with filename in the storage, set the field to image filename & call next() middleware
 * @param {String} field
 * @param {Array} sizes
 * @returns next() and call the next middleware
 */

export const resizeOneImage = (field, sizes) =>
  catchAsync(async (req, res, next) => {
    if (!req.files || !req.files[field]) return next();
    const filename = `${uuidv4()}-${field}.jpeg`;

    await jimp.read(req.files[field][0].buffer, (err, lenna) => {
      if (err) return next(err);
      lenna
        .cover(sizes[0], sizes[1])
        .quality(90)
        .write(`public/storage/images/${field}/${filename}`);
      req.body[field] = filename;

      next();
    });

    next();
  });

export const resizeGalleryImages = (field, sizes, path = "") =>
  catchAsync(async (req, res, next) => {
    if (!req.files || !req.files[field]) return next();

    const arrOfName = [];
    const arrayOfFiles = [...req.files[field]];

    arrayOfFiles.forEach(async (file, i) => {
      const filename = `${uuidv4()}-${field}.jpeg`;

      arrOfName.unshift(filename);

      await jimp.read(file.buffer, (err, leena) => {
        if (err) return next(err);
        leena
          .cover(sizes[0], sizes[1])
          .quality(90)
          .write(`public/storage/images/${path}/${field}/${filename}`);
        return;
      });
    });

    req.body[field] = arrOfName;

    next();
  });

export const uploadProfileImages = uploadImage.fields([
  {
    name: "profilePicture",
    maxCount: 1,
  },
  {
    name: "coverPicture",
    maxCount: 1,
  },
]);

export const uploadPostGallery = uploadImage.fields([
  {
    name: "images",
    maxCount: 8,
  },
]);
