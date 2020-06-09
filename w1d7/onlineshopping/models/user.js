const mongoose = require('mongoose');
const Product = require('../models/product');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }  
        }],
        totalPrice: Number
    }
});

userSchema.methods.addToCart = async function(productId){
    const product = await Product.findById(productId);
    if(!product) throw new Error("Product not found to add in cart");

    let cart = this.cart;
    const inx = cart.items.findIndex(item => item.productId == product._id.toString());
    if(inx !== -1){
        cart.items[inx].qty += 1;
    } else {
        cart.items.push({ productId: product._id, qty: 1 });
    }
    if (!cart.totalPrice) cart.totalPrice = 0;

    cart.totalPrice += product.price;
    return this.save();
}

userSchema.methods.removeFromCart = function(productId){
    const cart = this.cart;
    const inx = cart.items.findIndex(item => item.productId == productId);
    if (inx !== -1){
        cart.items.splice(inx, 1);
        return this.save();
    } 

}
module.exports = mongoose.model('User', userSchema);