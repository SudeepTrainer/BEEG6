// console.log(__dirname);
const http = require('http'); // imports the http module
const queryString = require('querystring');
const fs = require('fs');
const port = 3000;
// listener function/callback function is the only argument
const server = http.createServer(function(req,res){
    console.log(req.url); // / is the root url
    if(req.url === "/"){
        respondText(req,res);
    } else if(req.url === "/json"){
        respondJson(req,res);
    } else if(req.url.match(/^\/converttouppercase/)){
        respondConvert(req,res);
    } else if(req.url.match(/^\/static/)){
        respondFiles(req,res);
    }else respondNothing(req,res);
    // res.end();
})
server.listen(port,()=>{
    console.log("listening on the port 3000");
})
function respondText(req,res){
    res.setHeader("Content-Type","text/plain");
    res.end("Hi from server");
}
function respondJson(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify({name:"Bill",age:23}))
}
function respondNothing(req,res){
    res.writeHead(404,"Nothing found");
    res.end("Nothing found");
}
function respondConvert(req,res){
    //converttouppercase?input=bill%20gates&search=searchtext
    // console.log(req.url.split("?"));
    // // [ '/converttouppercase', 'input=bill%20gates&search=searchtext' ]
    // console.log(req.url.split("?")[1]);
    // //input=bill%20gates&search=searchtext
    // console.log(queryString.parse(req.url.split("?")[1]));
    // { input: 'bill gates', search: 'searchtext' }
    const {input} = queryString.parse(req.url.split("?")[1])
    res.end(input.toUpperCase())
}

function respondFiles(req,res){
    // console.log(req.url.split("/static"));
    // console.log(req.url.split("/static")[1]);
    const fileName =`${__dirname}/public${req.url.split("/static")[1]}`;
    fs.createReadStream(fileName)
    .on('error',()=>{respondNothing(req,res)})
    .pipe(res);
}