'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const stores = require('../dao/stores');
const errors = require('../helpers/errors');
const NotFoundError = errors.NotFoundError;

const storesService = {
  getStores: () => {
    return Promise.resolve(stores);
  },

  getStoresById: (id) => {
    const ret = _.find(stores, { 'id': id });
    if (!ret) {
      return Promise.reject(
        new NotFoundError(`No store of id: '${id}' has been found.`)
      );
    } else {
      return Promise.resolve(ret);
    }
  },
};
 
module.exports = storesService;
