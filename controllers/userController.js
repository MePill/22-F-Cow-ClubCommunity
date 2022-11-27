import Users from "../model/userModel.js";
import path from "path";

const __dirname = path.resolve();

let id_name;
let booleanLogIn = false;

const getSignUp = (req, res) => {
  res.render(__dirname + "/views/signup.ejs");
};

const postSignUp = (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const password = req.body.password;
  const user = new Users(req.body);

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
};

const getSignIn = (req, res) => {
  if (booleanLogIn === true) {
    res.redirect("/user/sign-out");
  } else {
    res.render(__dirname + "/views/login.ejs");
  }
};

const postSignIn = (req, res) => {
  Users.findOne(
    { id: req.body.id, password: req.body.password },
    (err, user) => {
      if (err) {
        console.log(err);
        `<script>
              alert('아이디,비밀번호을 다시 입력하세요.');
          </script>`;
      } else if (user) {
        booleanLogIn = true;
        id_name = req.body.id;
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
};
const getSignOut = (req, res) => {
  res.render(__dirname + "/views/myPage.ejs", { name: id_name });
};

const postSignOut = (req, res) => {
  booleanLogIn = false;
  res.send(
    `<script>
        alert('로그아웃 성공..!'); 
        location.href="/main";
    </script>`
  );
};
export {
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
  booleanLogIn,
  getSignOut,
  postSignOut,
};
