import bodyParser_post from 'body-parser';
import express from 'express';
import path from 'path';
import fs from 'fs';

const port = 3000;

const app = express();

const __dirname = path.resolve();

app.set('viewengine', 'ejs');
app.set('views', __dirname+'/views');

app.use(express.static("public"));

app.use(bodyParser_post.urlencoded({ extended: false}));
app.use(bodyParser_post.json());

app.get(['/','/main'], (req,res)=>{
    fs.readdir('filesystem',(err,files)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else{
            res.render('main.ejs', {files: files});
        }
    });
});

app.get('/create',(req,res)=>{
    res.render(__dirname+'/views/create.ejs');
});

app.post('/create',(req,res,)=>{

    const name = req.body.name;
    const contents = req.body.contents;

    fs.writeFile(__dirname+`/filesystem/${name}`, contents, 'utf8', (err)=>{
        if(err){
            console.log('err');
            res.status(500).send('Internal Server Error');
        }else{
            res.redirect('/main');

        }
    });
});

app.get('/main/:id/update',(req,res)=>{
    
    const id = req.body.id;
    const fileName= 'filesystem/'+ id;
    
    fs.readFile(fileName, 'utf-8', (req,res)=>{
        if(err){
            console.log('err');
            res.status(500).send('Internal Server Error');
        }else{
            res.render('update.ejs', {title: id, description: data});

        }
    });
});

app.get('/main/:id',(req,res)=>{
    const id = req.params.id;
    const fileName = 'filesystem/'+id;

    fs.readFile(fileName,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else{
            res.render('view.ejs',{title: id, description: data});

        }
    });
});

app.get('/log-in',(req,res)=>{
    res.sendFile(__dirname+'/views/login.html');
});


app.listen(port);