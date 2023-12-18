const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

// create the express app and set the port
const PORT = 3000;
const application = express();

const databaseUri = 'mongodb://127.0.0.1:27017/authdb'
//connect to mongodb
mongoose.connect(databaseUri)
    .then(()=>{console.log(`db connected`)})
    .catch(()=>{console.log(`Error connecting db`)})

//Database schemas

// user schema
const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

// user model
const User = mongoose.model('User',userSchema);
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
    next();
})
const isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated){
        next();
    }else{
        res.status(401).redirect('/login')
    }
}
//routing

application.get("/",isAuthenticated,(req,res)=>{
    res.render('home');
})

application.get("/logout",(req,res)=>{
    res.clearCookie('auth');
    res.status(200).redirect('/login');
})


application.get("/login",(req,res)=>{
    // req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);
    // res.send("Home Page");
    res.render('login');
})

application.get("/register",(req,res)=>{
    res.render('register');
})

application.post('/register', async (req,res)=>{
    console.log(req.body);
    const {username,password} = req.body;
    try{
        if(!username || !password){
            throw new Error("Enter username and password");
        }
        // username exists in db
        const existingUser = await User.findOne({username});
        if(existingUser){
            res.status(400).render('register',{error:"Username already exists"})
            return;
        }
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new User({
            username,
            password:hashedPassword
        })
        await newUser.save();
        res.status(201).redirect('/login');
    }catch(error){
        console.log(error);
    }
})

application.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser && bcrypt.compareSync
                (password,existingUser.password)){
            res.cookie("auth",true);
            res.status(201).redirect('/');
        }

    }catch(error){
        console.log(error);
    }
})
application.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})