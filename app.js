import bodyParser_post from 'body-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';

const port = 3000;

const app = express();

const __dirname = path.resolve();

app.set('viewengine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static("public"));

app.use(bodyParser_post.urlencoded({ extended: false }));
app.use(bodyParser_post.json());

app.get(['/', '/main'], (req, res) => {
    fs.readdir('filesystem', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('main.ejs', { files: files });
        }
    });
});

app.get('/create', (req, res) => {
    res.render(__dirname + '/views/create.ejs');
});

app.post('/create', (req, res,) => {

    const name = req.body.name;
    const contents = req.body.contents;

    if (contents == "" || name == "") {
        res.send(
            `<script>
              alert('제목이나 내용을 꼭 입력해 주세요. 내용이 저장되지 않습니다.');
              location.href='/create';
            </script>`
        );
    } else {
        fs.writeFile(__dirname + `/filesystem/${name}`, contents, 'utf8', (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/main');

            }
        });
    }
});

app.get('/main/:id/update', (req, res) => {

    const id = req.params.id;
    const fileName = 'filesystem/' + id;

    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('update.ejs', { title: id, description: data });

        }
    });
});

app.post('/main/:id/update', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    if (description == "" || title == "") {
        res.send(
            `<script>
              alert('제목이나 내용을 꼭 입력해 주세요. 내용이 저장되지 않습니다.');
              location.href='/main';
            </script>`
        );
    } else {

        const deletFileName = 'filesystem/' + id;
        const fileName = __dirname + '/filesystem/' + title;
        fs.writeFile(fileName, description, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/main');
            };
        });
        if (id != title) {
            fs.unlink(deletFileName, (err) => {
                if (err) {
                    console.log(err);
                };
            });
        };
    }
});

app.get('/main/:id', (req, res) => {
    const id = req.params.id;
    const fileName = 'filesystem/' + id;

    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('view.ejs', { title: id, description: data });
        }
    });
});

app.get('/main/:id/delete', (req, res) => {
    const id = req.params.id;
    const fileName = 'filesystem/' + id;

    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('delete.ejs', { title: id, description: data });
        }
    });
});

app.post('/main/:id', (req, res) => {
    const id = req.params.id;
    const fileName = 'filesystem/' + id;

    fs.unlink(fileName, (err) => {
        res.send(`<script>
        alert('게시물이 삭제되었습니다.');
        location.href="/main";
        </script>`);
        if (err) {
            console.log(err);
        };
    });
});

app.get('/log-in', (req, res) => {
    res.render(__dirname + '/views/login.ejs');
});


app.get('/delete', (req, res) => {
    res.render(__dirname + '/views/delete.ejs');
});

app.post('/main/:id/delete', (req, res) => {
    const id = req.params.id;
    const fileName = 'filesystem/' + id;

    fs.unlink(fileName, (err) => {
        res.send(`<script>
        alert('게시물이 삭제되었습니다.');
        location.href="/main";
        </script>`);
        if (err) {
            console.log(err);
        };
    });
});

app.listen(port);