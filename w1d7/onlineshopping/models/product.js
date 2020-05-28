const getDb = require("../util/database").getDb;
const ObjectId = require("mongodb").ObjectId;

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this._id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = parseFloat(price);
    this.description = description;
  }

  save() {
    const db = getDb();
    return db.collection('products').insertOne(this);
  }

  update() {
    const db = getDb();
    return db.collection('products').updateOne({ _id: new ObjectId(this._id)}, {$set:{
      title: this.title,
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description
    }});
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray();
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').findOne({ _id: new ObjectId(prodId) });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new ObjectId(prodId) });
  }

};
