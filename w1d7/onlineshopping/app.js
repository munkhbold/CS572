const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// auth user middleware
app.use((req, res, next) => {
  User.findById('5ed46c3b55b706240c5a97e8')
    .then(user => {
      req.user = user;
      next();
    })
  .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(userRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://localhost:27017/onlineshop', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    app.listen(3000, ()=>{
      console.log("Server is running on 3000 ...");
    });
  })
  .catch(err=>console.log(err));



