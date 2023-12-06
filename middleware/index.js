const express = require("express");
const app = express();
const port = 3000;

const jsonArray = [];

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page");
})

function addItem(req,res){
    console.log(req.body);
    jsonArray.push(req.body);
    res.send("<h1>Added successfully</h1>")
}

app.post("/add",addItem);
app.get("/array",(req,res)=>{
    res.json(jsonArray);
})

app.listen(port,()=>{
    console.log("listening on port 3000");
})