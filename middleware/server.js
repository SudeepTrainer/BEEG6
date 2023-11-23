const express = require('express');

const app = express();
const port = 3000;

function middleware1(req,res,next){
    console.log("middleware 1 called");
    console.log("before");
    if(req.query.user === "admin")
        next();
    else{
        res.send("<h1>Only admins can access this page</h1")
    }
    console.log("after");
}

//global middlware
app.use(middleware1);

function defaultResponse(requestObject,responseObject,nextMiddleware){
    console.log("default route action method called");
    responseObject.send("<h1>Default page</h1>");
}

// default route
app.get("/",defaultResponse);

function loginResponse(req,res,next){
    console.log("login route action called");
    res.send("<h1>Login page</h1>");
}

function auth(req,res,next){
    if(req.query.username === "abc" && req.query.password === "abc"){
        next()
    }else{
        res.send("<h1>Login failed</h1>")
    }
}

app.get("/login",auth,loginResponse);

app.listen(port,()=>{
    console.log("listening to the server on 3000");
})