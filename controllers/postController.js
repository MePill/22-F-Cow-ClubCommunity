import { booleanLogIn } from "./userController.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const regex = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g;

const getAllPosters = (req, res) => {
  fs.readdir("filesystem", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render(__dirname + "/views/main.ejs", { files: files });
    }
  });
};

const getCreateNewPoster = (req, res) => {
  if (booleanLogIn === false) {
    res.send(
      `<script>
              alert('로그인부터 해주세요.');
              location.href='/main';
            </script>`
    );
  } else {
    res.render(__dirname + "/views/create.ejs");
  }
};

const postCreateNewPoster = (req, res) => {
  const name = req.body.name;
  const contents = req.body.contents;

  if (contents == "" || name == "" || regex.test(name)) {
    res.send(
      `<script>
            alert('내용이나 제목을 확인해주세요.다시 적어주세요.');
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
};

const getUpdatePoster = (req, res) => {
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
};

const postUpdatePoster = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;

  const deletFileName = "filesystem/" + id;
  const fileName = __dirname + "/filesystem/" + title;
  if (description == "" || title == "" || regex.test(title)) {
    res.json({ message: "제목이나 내용을 확인해 주세요." });
    res.send(
      `<script>
          alert('내용이나 제목을 확인해주세요.다시 적어주세요.');
          location.href='/create';
        </script>`
    );
  } else {
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
  }
};

const getPoster = (req, res) => {
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
};

const postDelet = (req, res) => {
  const id = req.params.id;
  const fileName = "filesystem/" + id;
  if (booleanLogIn === false) {
    res.send(
      `<script>
              alert('로그인부터 해주세요.');
              location.href='/';
         </script>`);
  } else {
    fs.unlink(fileName, (err) => {
      res.send(`<script>
        alert('게시물이 삭제되었습니다.');
        location.href="/main";
        </script>`);
      if (err) {
        console.log(err);
      }
    });
  }
};

export {
  getAllPosters,
  getCreateNewPoster,
  postCreateNewPoster,
  getUpdatePoster,
  postUpdatePoster,
  getPoster,
  postDelet,
};
