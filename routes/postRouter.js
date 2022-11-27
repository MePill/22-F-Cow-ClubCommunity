import express from "express";
import {
  getAllPosters,
  getCreateNewPoster,
  postCreateNewPoster,
  getUpdatePoster,
  postUpdatePoster,
  getPoster,
  postDelet,
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get(["/", "/main"], getAllPosters);

postRouter.get("/create", getCreateNewPoster);

postRouter.post("/create", postCreateNewPoster);

postRouter.get("/main/:id/update", getUpdatePoster);

postRouter.post("/main/:id/update", postUpdatePoster);

postRouter.get("/main/:id", getPoster);

postRouter.post("/main/:id", postDelet);

export default postRouter;
