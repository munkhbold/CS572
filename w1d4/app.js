const express = require('express');
const path = require('path');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const app = new express();


app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

app.use(express.urlencoded({extended: true}));
app.use(userRoutes);
app.use(productRoutes);

app.use('/', (req, res, next) => {
  console.log("works in every request");
  next();
});

app.use('/$', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(function(err, req, res, next){
  res.status(500).sendFile(path.join(__dirname, 'views', '500.html'));
});


app.listen(3000, function(){
  console.log('Server is running on port 3000');
});