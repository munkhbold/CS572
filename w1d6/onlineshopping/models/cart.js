let cart = null;

module.exports = class Cart{
  static save(product){
    if(cart === null){
      cart = { products: [], totalPrice: 0 };
    }

    const productInx = cart.products.findIndex(p=>p.id==product.id);
    if(productInx > -1){
      const _product = cart.products[productInx];
      _product.qty += 1;
    } else {
      product.qty = 1;
      cart.products.push(product);
    }

    cart.totalPrice += product.price;
  }

  static getCart(){
    return cart;
  }

  static delete(productId){
    cart.products = cart.products.filter(p=>p.id != productId);
  }
}