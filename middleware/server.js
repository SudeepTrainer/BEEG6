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

function middleware2(req,res,next){
    console.log("Middleware 2 called");
    const errorObj = new Error("unknown error");
    next(errorObj);
}

function errorMiddleware(err,req,res,next){
    res.send("<h1>PLease try again after some time.</h1>")
}

//global middlware
app.use(middleware2);
app.use(middleware1);

function defaultResponse(requestObject,responseObject,nextMiddleware){
    console.log("default route action method called");
    responseObject.cookie()
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

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log("listening to the server on 3000");
})