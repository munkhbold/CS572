const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    console.log(req.user);
    Product.find().then((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch((err)=>console.log(err));
    
};

exports.getAllProducts = (req, res, next) => {
    Product.find().then(products =>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
    
};

exports.getProductDetail = (req, res, next) => {
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
        .populate('cart.items.productId')
        .execPopulate('')
        .then(user => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                cart: user.cart
            });
        })
        .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
    req.user.addToCart(req.body.prodId)
            .then(()=>{
                res.redirect('/');
            });
    
}

exports.deleteFromCart = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user
        .removeFromCart(prodId)
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
