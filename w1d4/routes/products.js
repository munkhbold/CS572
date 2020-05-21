const express = require('express');
const path = require('path');

const options = {
  "caseSensitive": false,
  "strict": false
};
const router = express.Router(options);

router.get('/products', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'products.html'));
});

router.post('/products', (req, res, next)=>{
  res.send(req.body);
});

router.get('/error', (req, res, next)=>{
  throw new Error('Something wrong');
});

module.exports = router;