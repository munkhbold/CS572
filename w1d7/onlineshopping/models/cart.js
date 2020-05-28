let cart = [];
module.exports = class Cart{
  static save(product){
    if(this.isEmpty()){
      cart = { products: [], totalPrice: 0.0 };
    }

    const productInx = cart.products.findIndex(p=>p._id==product._id);
    if(productInx > -1){
      const _product = cart.products[productInx];
      _product.qty += 1;
    } else {
      product.qty = 1;
      cart.products.push(product);
    }

    cart.totalPrice += parseFloat(product.price);
  }

  static getCart(){
    return cart;
  }

  static delete(productId){
    cart.products = cart.products.filter(p=>p._id != productId);
  }

  static isEmpty(){
    return cart.length == 0;
  }
}