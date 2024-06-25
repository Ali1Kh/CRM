import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  updatePost,
} from "./post.controller.js";
import { limiter } from "../../middlewares/rate-limiter.middleware.js";
import { protectedRoute } from "../../middlewares/protected.middleware.js";
import {
  resizeGalleryImages,
  uploadPostGallery,
} from "../../middlewares/images.middleware.js";

export const postsRouter = Router({ mergeParams: true });

// public routes

postsRouter.get("/", getAllPosts);

postsRouter.get("/:id", getOnePost);

// protected routes

postsRouter.use(protectedRoute);

postsRouter.post(
  "/",
  limiter(20),
  uploadPostGallery,
  resizeGalleryImages("images", [1600, 900], "advert"),
  createPost
);

postsRouter.delete("/:id", deletePost);

postsRouter.patch(
  "/:id",
  uploadPostGallery,
  resizeGalleryImages("images", [1200, 800], "advert"),
  updatePost
);
