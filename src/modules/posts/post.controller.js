import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../../utils/factory-handler.utils.js";
import { Post } from "../../../DB/models/post.model.js";
import { catchAsync } from "../../utils/catchAsync.utils.js";
import { apiError } from "../../utils/apiError.utils.js";

export const createPost = catchAsync(async (req, res, next) => {
  const ownerId = req?.user?.id;
  const { title, description, location, advertNo, tags, images, details } =
    req.body;
  const doc = await Post.create({
    owner: ownerId,
    title,
    description,
    location,
    advertNo,
    tags,
    images,
    details,
  });
  res.status(201).json({ status: "success", doc: doc });
});

export const updatePost = updateOne(Post, "owner");

export const deletePost = deleteOne(Post, "owner");

export const getAllPostsOfUser = (id) =>
  catchAsync(async (req, res, next) => {
    const userId = id || req?.user?.id;
    if (!id)
      return next(new apiError("No user found, or maybe unactive.", 400));
    return getAll(Post, { owner: userId });
  });

export const getAllPosts = getAll(Post, { published: true }, { path: "owner" });

export const getOnePost = getOne({
  Model: Post,
  popOptions: {
    path: "owner",
    select: "profilePicture fullname email id",
  },
  findby: "advertNo",
});
