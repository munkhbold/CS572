const https = require("https");
const fs = require("fs");

const server = https.createServer({
  cert: fs.readFileSync("./certificate.crt"),
  key: fs.readFileSync("./privateKey.key")
})

server.on('request', function(req, res){
  res.end('hello from https ....');
})

server.listen(443, function(){
  console.log("server is running on 443");
})