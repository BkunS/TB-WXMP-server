const _ = require('lodash');

let products = [
  {
    id: 'id',
    name: 'Ballet flat'
  }
];
 
const productsService = {
  getProducts: () => {
    console.log('products:', products);
    return products;
  },

  getProductById: (id) => {
    return _.find(products, { 'id': id });
  },
};
 
module.exports = productsService;
