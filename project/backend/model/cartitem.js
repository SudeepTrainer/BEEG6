const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:Number
})
const CartItem = mongoose.model('CartItem',cartItemSchema);
module.exports = CartItem;