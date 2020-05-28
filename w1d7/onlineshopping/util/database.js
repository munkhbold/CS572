const mongoClient = require("mongodb");

let _db;

const mongoConnect = function(callback){
  mongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true})
              .then(client => {
                console.log('DB connected ...');
                _db = client.db('onlineshop');
                callback();
              }).catch(error => {
                throw new Error("DB connection failed");
              });
};

const getDb = function (){
    if(_db) return _db;
    else throw new Error("DB selection failed");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb