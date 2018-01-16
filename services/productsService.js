'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const masterProducts = require('../dao/masterProducts.json');
const skuProducts = require('../dao/skuProducts');
const errors = require('../helpers/errors');

const NotFoundError = errors.NotFoundError;
 
const productsService = {
  getProducts: () => {
    return Promise.resolve(masterProducts);
  },

  getProductById: (id) => {
    let ret = _.find(masterProducts, { 'masterId': id });
    if (!ret) {
      ret = _.find(skuProducts, { 'id': id });
    }
    if (!ret) {
      return Promise.reject(
        new NotFoundError(`No product of id: '${id}' has been found.`)
      );
    } else {
      return Promise.resolve(ret);
    }
  }
};
 
module.exports = productsService;
