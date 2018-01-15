const _ = require('lodash');
const masterProducts = require('../dao/masterProducts.json');
const skuProducts = require('../dao/skuProducts');
 
const productsService = {
  getProducts: () => {
    return masterProducts;
  },

  getProductById: (id) => {
    let ret = _.find(masterProducts, { 'masterId': id });
    if (!ret) {
      ret = _.find(skuProducts, { 'id': id });
    }
    return ret;
  }
};
 
module.exports = productsService;
