const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

// create the express app and set the port
const PORT = 3000;
const application = express();

const databaseUri = 'mongodb://127.0.0.1:27017/mydb'
//connect to mongodb
mongoose.connect(databaseUri)
    .then(()=>{console.log(`db connected`)})
    .catch(()=>{console.log(`Error connecting db`)})

//middleware
// application.use(session({
//     secret:"secretkeytosigncokkie",
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         secure:false,
//         maxAge:60000,
//     }
// }))

application.set('view engine','ejs');

//middleware
application.use(cookieParser());
application.use(express.urlencoded({extended:true}));

// middleware to check authentication status
application.use((req,res,next)=>{
    const {auth} = req.cookies;
    if(auth){
        req.isAuthenticated = true;
    }else{
        req.isAuthenticated = false;
    }
})
const isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated){
        next();
    }else{
        res.status(401).redirect('/login')
    }
}
//routing

application.get("/login",(req,res)=>{
    // req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);
    // res.send("Home Page");
    res.render('login');
})

application.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})