import bodyParser_post from "body-parser";
import express from "express";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.set("viewengine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));

app.use(bodyParser_post.urlencoded({ extended: false }));
app.use(bodyParser_post.json());

import postRouter from "./routes/postRouter.js";
import userRouter from "./routes/userRouter.js";

app.use("/user", userRouter);
app.use("/", postRouter);

app.listen(3000);
