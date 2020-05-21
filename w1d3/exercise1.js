const https = require("https");
const fs = require("fs");

const server = https.createServer({
  cert: fs.readFileSync("./certificate.crt"),
  key: fs.readFileSync("./privateKey.key")
})

server.on('request', function(req, res){
  const url = req.url;
  const method = req.method;

  if(url === '/'){
    fs.createReadStream('index.html').pipe(res);
  } else if( url === '/save' && method === 'POST'){
    req.pipe(fs.createWriteStream('./output.txt'));
    res.writeHead(301, {Location: '/'});
    res.end();
  } else {
    res.writeHead(404)
    res.end();
  }
})

server.listen(443, function(){
  console.log("server is running on 443");
})