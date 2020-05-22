let products = [];

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = new Number(price);
    this.description = description;
  }

  save() {
    this.id = Math.floor(Math.random() * 100000).toString();
    products.push(this);
  }

  update() {
    const existingProdIndex = products.findIndex(p => p.id === this.id);
    products.splice(existingProdIndex, 1, this);
  }

  static fetchAll() {
    return products;
  }

  static findById(prodId) {
    return products.find(p => p.id === prodId);
  }

  static deleteById(prodId) {
    products = products.filter(p => p.id !== prodId);
  }

};
