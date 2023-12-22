const express = require('express')
// const session = require('express-session');
const mongoose = require('mongoose');
// const mongodbStore = require('connect-mongodb-session')(session);
const bcrypt  = require('bcryptjs');
const cookieParser = require('cookie-parser');

const User = require('./models/user');
const Product = require('./models/product');
const CartItem = require('./models/cartitem');

const databaseUri = "mongodb://127.0.0.1:27017/dbauth";

async function db(){
    await mongoose.connect(databaseUri)
}

db()
 .then(res=>{
    console.log("DB connected");
 })
 .catch(err=>{
    console.log(`error ${err}`);
 })

const PORT = 3000;
const application = express();


// const store = new mongodbStore({
//     uri:databaseUri,
//     collection:"sessions"
// });
// //middleware
// application.use(session(
//     {
//         secret:"thisisasecrettosigncookie",
//         resave:false,
//         saveUninitialized:false,
//         cookie:{
//             secure:false,
//             maxAge:60000
//         },
//         store:store
//     }
// ));
//middleware

application.use(cookieParser());
application.use(express.urlencoded({extended:true}));

application.set('view engine','ejs');

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
        next()
    }else{
        res.status(401).redirect("/login")
    }
}
//routing
application.get("/",isAuthenticated,async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).render("home",{products});
    }catch(error){
        console.log(error);
        res.status(500).render('home',{"error":"Internal server error"})
    }
});
application.get("/logout",(req,res)=>{
    res.clearCookie("auth");
    res.status(200).redirect("/login");
})
application.get("/login",(req,res)=>{
    res.render('login');
})

application.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    try{
        // check if the user exists
        const user = await User.findOne({username});
        if(user && bcrypt.compareSync(password,user.password)){
            res.cookie("auth",true);
            res.status(200).redirect("/");
        }else{
            res.status(401).render('login',{"error":"Username/password not match"})
        }
    }catch(error){
        console.log(error);
        res.status(500).render('login',{"error":"Internal server error"})
    }
})
application.get("/register",(req,res)=>{
    res.render('register');
})
application.post('/register',async (req,res)=>{
    console.log(req.body);
    const {username,password} = req.body;
    
    try{
        if(!username||!password){
            throw new Error('Enter username/password')
        }
        // check if username already exists in database
        const existingUser = await User.findOne({username});
        if(existingUser){
            res.status(400).render('register',{"error":"Username already exists"});
            return
        }
        // securing the password
        const hashedPassword = bcrypt.hashSync(password,10);
        // creating the user dta to be saved
        const newUser = new User({
            username,
            password:hashedPassword
        })
        // saving th the database
        await newUser.save();
        // on success redirecting to login
        res.status(201).redirect('/login');
    }catch(error){
        console.log(error);
        res.status(500).render('register',{"error":"Internal server error"})
    }
})

// get cart
application.get("/cart",async (req,res)=>{
    try{
        // get cart items from db
        const cartItems = await CartItem.find({}).populate('product');
        // get the total price of all items
        const total = cartItems.reduce((acc,item)=>
                     acc + item.quantity * item.product.price,0 )
        res.render('cart',{cart:cartItems,total});
    }catch(error){
        console.log(error);
        res.status(500).render('home',{"error":"Internal server error"})
    }
})

// add to cart post method

application.post("/addToCart",async (req,res)=>{
    console.log(req.body);
    try{
        const productID = req.body.productId;
        const quantity = parseInt(req.body.quantity);

        // fetch the selected product
        const product = await Product.findById(productID);
        if(!product){
            return res.status(404).send("Product not found");
        }
        // check the item is already in the cart
        const existingCartItem = await CartItem.findOne({product:productID});
        if(existingCartItem){
            existingCartItem.quantity +=1;
            await existingCartItem.save();
        }else{
            // add a new item to the cart
            await CartItem.create({
                product:productID,
                quantity:quantity
            });
        }
        res.redirect("/cart");
    }catch(error){
        console.log('error');
        res.status(500).render('home',{"error":"Internal server error"})
    }
})

//start server
application.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})