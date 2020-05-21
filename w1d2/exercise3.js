// var fs = require("fs");
// var zlib = require('zlib');
// fs.createReadStream('./input.txt.gz')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('./input.txt'));
// console.log("File Decompressed.");

const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
// this is a readable & writable stream and it returns a zipped stream
const readable = fs.createReadStream(__dirname + '/bigImage.jpg');
const compressed = fs.createWriteStream(__dirname + '/bigImage.jpg.gz');
readable.pipe(gzip).pipe(compressed);