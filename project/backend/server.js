const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const PORT = 3000;
const application = express();

const databaseUri = 'mongodb://127.0.0.1:27017/mydb'
mongoose.connect(databaseUri)
    .then(res=>()=>{console.log(`db connected ${res}`)})
    .catch(err=>()=>{console.log(`Error connecting db ${err}`)})

//middleware
application.use(session({
    secret:"secretkeytosigncokkie",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:60000,
    }
}))

//routing
application.get("/",(req,res)=>{
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    res.send("Home Page");
})

application.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})