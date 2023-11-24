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
}

app.post("/add",addItem);

app.listen(port,()=>{
    console.log("listening on port 3000");
})