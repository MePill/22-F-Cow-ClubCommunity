import bodyParser_post from "body-parser";
import express from "express";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

const port = 3000;

const app = express();

const url = "mongodb://127.0.0.1:27017/user_db_name";

const db = mongoose.connect(url, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

const UserSchema = new mongoose.Schema({
  password: String, // 비밀번호
  name: String, // 이름
  id: String, // 아이디
});

const Users = mongoose.model("users", UserSchema);

const __dirname = path.resolve();

app.set("viewengine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));

app.use(bodyParser_post.urlencoded({ extended: false }));
app.use(bodyParser_post.json());

app.get(["/", "/main"], (req, res) => {
  fs.readdir("filesystem", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render("main.ejs", { files: files });
    }
  });
});

app.get("/create", (req, res) => {
  res.render(__dirname + "/views/create.ejs");
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const contents = req.body.contents;

  if (contents == "" || name == "") {
    res.send(
      `<script>
            alert('내용이나 제목을 입력하세요.다시 적어주세요.');
            location.href='/create';
          </script>`
    );
  } else {
    fs.writeFile(__dirname + `/filesystem/${name}`, contents, "utf8", (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect("/main");
      }
    });
  }
});

app.get("/main/:id/update", (req, res) => {
  const id = req.params.id;
  const fileName = "filesystem/" + id;

  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render("update.ejs", { title: id, description: data });
    }
  });
});

app.post("/main/:id/update", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;

  const deletFileName = "filesystem/" + id;
  const fileName = __dirname + "/filesystem/" + title;
  fs.writeFile(fileName, description, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/main");
    }
  });
  if (id != title) {
    fs.unlink(deletFileName, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

app.get("/main/:id", (req, res) => {
  const id = req.params.id;
  const fileName = "filesystem/" + id;

  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render("view.ejs", { title: id, description: data });
    }
  });
});

app.get("/sign-up", (req, res) => {
  res.render(__dirname + "/views/signup.ejs");
});

app.post("/sign-up", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const password = req.body.password;
  const user = new UserSchema(req.body);

  if (name == "" || id == "" || password == "") {
    res.send(
      `<script>
            alert('이름이나 아이디,비밀번호을 입력하세요.다시 적어주세요.');
            location.href='/sign-up';
          </script>`
    );
  } else {
    user.save((err) => {
      if (err) {
        res.status(500).json({ message: "저장 실패!" });
      } else {
        res.redirect("/main");
      }
    });
  }
});

app.get("/sign-in", (req, res) => {
  res.render(__dirname + "/views/login.ejs");
});

app.post("/sign-in", (req, res) => {
  Users.findOne(
    { id: req.body.id, password: req.body.password },
    (err, user) => {
      if (err) {
        console.log(err);
        `<script>
            alert('아이디,비밀번호을 다시 입력하세요.');
        </script>`;
      } else if (user) {
        `<script>
            alert('로그인 성공!');
        </script>`;
        res.redirect("/main");
      } else {
        `<script>
            alert('회원가입부터 해주세요.');
        </script>`;
      }
    }
  );
});

app.listen(port);
