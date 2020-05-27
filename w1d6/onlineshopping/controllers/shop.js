const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    res.render('shop/product-list', {
        prods: Product.fetchAll(),
        pageTitle: 'Shop',
        path: '/',
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products =>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
    
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findById(prodId).then(product=>{
        console.log(product);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Detail',
            path: '/products',
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        cart: Cart.getCart(),
        pageTitle: 'Cart',
        path: '/cart'
    });
};

exports.addToCart = (req, res, next) => {
    const product = Product.findById(req.body.prodId);
    Cart.save(product);
    res.redirect('/cart');
}

exports.deleteFromCart = (req, res, next) => {
    Cart.delete(req.body.prodId);
    res.redirect('/cart');
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
}
