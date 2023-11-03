// console.log(__dirname);
const http = require('http'); // imports the http module
const port = 3000;
// listener function/callback function is the only argument
const server = http.createServer(function(req,res){
    console.log(req.url); // / is the root url
    if(req.url === "/"){
        respondText(req,res);
    } else if(req.url === "/json"){
        respondJson(req,res)
    } else respondNothing(req,res)
    // res.setHeader("Content-Type","text/plain");
    // res.write("Hi from server");
    // res.setHeader("Content-Type","application/json");
    // res.write(JSON.stringify({name:"Bill",age:23}))
    // res.end("HI from server");
    res.end();
})
server.listen(port,()=>{
    console.log("listening on the port 3000");
})
function respondText(req,res){
    res.setHeader("Content-Type","text/plain");
    res.write("Hi from server");
}
function respondJson(req,res){
    res.setHeader("Content-Type","application/json");
    res.write(JSON.stringify({name:"Bill",age:23}))
}
function respondNothing(req,res){
    res.writeHead(404,"Nothing found");
    res.write("Nothing found");
}