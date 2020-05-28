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
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
    Product.findById(req.body.prodId).then(product=>{
        // Cart.save(product);
        req.user.addToCart(product);
        res.redirect('/cart');
    });
    
}

exports.deleteFromCart = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(orders=>{
        res.render('shop/orders', {
            pageTitle: 'Orders',
            path: '/orders',
            orders: orders,
        });
    });
}

exports.postOrder = (req, res, next) => {
    console.log("its here");
    req.user.addOrder().then(result=>{
        res.redirect("/orders");
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
}
