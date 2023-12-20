const mongoose = require('mongoose');
// user schema
const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

// user model
const User = mongoose.model('User',userSchema);
module.exports = User;