import { Router } from "express";
import { authRouter } from "./modules/auth/auth.route.js";
import { postsRouter } from "./modules/posts/post.route.js";

export const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/posts", postsRouter);

mainRouter.get("/api", (req, res) => {
  res.send({ message: "Welcome to auth-backend!!!!!" });
});
