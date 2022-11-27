import express from "express";
import {
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
  getSignOut,
  postSignOut
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/sign-up", getSignUp);

userRouter.post("/sign-up", postSignUp);

userRouter.get("/sign-in", getSignIn);

userRouter.post("/sign-in", postSignIn);

userRouter.get("/sign-out", getSignOut);

userRouter.post("/sign-out", postSignOut);

export default userRouter;
