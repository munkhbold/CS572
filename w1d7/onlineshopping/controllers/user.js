const User = require('../models/user');

exports.getSignup = (req, res, next) => {
  res.render('user/signup',{
    name: 'Mb',
    pageTitle: "Sign up",
    path: '/signup'
  })
};

exports.postSignup = (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  }).then((user)=>{
    res.redirect('/');
  });
};