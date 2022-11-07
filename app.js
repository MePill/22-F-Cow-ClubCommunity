import express from 'express';
import path from 'path';

const port = 3000;

const app = express();

const __dirname = path.resolve();

app.set('viewengine', 'html');
app.use(express.static("public"));

app.get('/main', (req,res)=>{
    res.sendFile(__dirname+'/views/main.html');
});

app.get('/create',(req,res)=>{
    res.sendFile(__dirname+'/views/create.html');
});

app.get('/log-in',(req,res)=>{
    res.sendFile(__dirname+'/views/login.html');
});

app.listen(port);