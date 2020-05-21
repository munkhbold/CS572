const express = require('express');
const path = require('path');

const options = {
  "caseSensitive": false,
  "strict": false
};
const router = express.Router(options);

router.get('/users', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});

router.post('/users', (req, res, next)=>{
  res.send(req.body);
});

module.exports = router;