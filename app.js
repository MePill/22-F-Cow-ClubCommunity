import express, { application } from 'express';

const port = 3000;

const app = express();

app.get('/', (req, res)=>{
    res.send("fuck");
})

app.listen(port);