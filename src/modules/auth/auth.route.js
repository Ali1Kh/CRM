import { Router } from "express";
import * as authController from "./auth.controller.js";
import { limiter } from "../../middlewares/rate-limiter.middleware.js";
import { protectedRoute } from "../../middlewares/protected.middleware.js";

export const authRouter = Router();

authRouter.post("/login", limiter(20), authController.login);
authRouter.post("/signup", limiter(20), authController.signup);

authRouter.post("/forget-password", authController.forgetPassword);
authRouter.post("/reset-password/:token", authController.resetPassword);

// PROTECTED ROUTES, ONLY WORKS IF THE USER IS LOGGED-IN
authRouter.use(protectedRoute);

authRouter
  .post("/update-password", authController.updatePassword)
  .post("/update-password/:id", authController.updatePassword);

authRouter
  .post("/deactivate", authController.deactiveAccount)
  .post("/deactivate/:id", authController.deactiveAccount);
