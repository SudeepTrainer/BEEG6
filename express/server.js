const { log } = require('console');
const express = require('express');
const fs = require('fs')
const port = 3000;

const app = express();

app.get('/',respondText);
app.get('/json',respondJson);
app.get('/converttouppercase',respondConvert);
app.get('/static/*',respondFiles);
app.get('*',respondNothing);

function respondText(req,res){
    res.send("Hi from server");
}
function respondJson(req,res){
    res.json({name:"Bill",age:55})
}
function respondConvert(req,res){
    const {input} = req.query;
    res.json({
        normal:input,
        uppercase:input.toUpperCase()
    })
}

function respondFiles(req,res){
    // console.log(req.params);
    const filePath = `${__dirname}/public/${req.params[0]}`
    // console.log(filePath);
    fs.createReadStream(filePath)
        .on('error',()=>respondNothing(req,res))
        .pipe(res)
}

function respondNothing(req,res){
    res.send("<h2>Resource is not available</h2>")
}
app.listen(port,()=>{
    console.log("Listening on port 3000");
})