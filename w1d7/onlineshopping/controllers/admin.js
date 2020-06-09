const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.getProducts = (req, res, next) => {
    Product.find().then(products=>{
        res.render('admin/products', {
            pageTitle: 'Products',
            path: '/admin/products',
            prods: products
        });
    });
};

exports.postAddProduct = (req, res, next) => {
    Product.create({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    }).then(result=>{
        res.redirect('/admin/products/');
    });
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findById(prodId).then(product=>{
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/products',
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    Product.updateOne({ _id: req.body.id}, {$set: {
        title : req.body.title,
        imageUrl : req.body.imageUrl,
        price : req.body.price,
        description : req.body.description,
    }}).then(result=>{
        res.redirect('/products/' + req.body.id);
    }).catch(err=>console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.body.id).then(result=>{
        res.redirect('/admin/products');
    })
}