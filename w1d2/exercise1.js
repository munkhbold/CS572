const dns = require('dns');

dns.lookup('www.mim.edu', (err, address, family) => {
  if(err) throw err;
  console.log('address: %j family: IPv%s', address, family);
});