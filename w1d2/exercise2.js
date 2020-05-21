const fs = require("fs");
const http = require("http");

const server = http.createServer();
server.on('request', function(req, res){
  fs.createReadStream("bigImage.jpg").pipe(res);
})

console.log("Server is running on port 3000 ...");
server.listen(3000);