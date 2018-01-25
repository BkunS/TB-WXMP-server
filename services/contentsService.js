'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const contents = require('../dao/contents');
const errors = require('../helpers/errors');

const NotFoundError = errors.NotFoundError;

const contentsService = {
  getHomeContents: () => {
    const { homePage } = contents;
    return Promise.resolve(homePage);
  },

  getPdpContents: () => {
    const { pdpPage } = contents;
    return Promise.resolve(pdpPage);
  },

  getCartContents: () => {
    const { cartPage } = contents;
    return Promise.resolve(cartPage);
  },

  getCheckoutContents: () => {
    const { checkoutPage } = contents;
    return Promise.resolve(checkoutPage);
  },

  getLookbookContentsById: (id) => {
    const { lookbooksPage } = contents;
    let ret = _.get(lookbooksPage, id);

    if (!ret) {
      return Promise.reject(
        new NotFoundError(`Cannot find contents by lookbookId: ${id}`)
      );
    } else {
      return Promise.resolve(ret);
    }
  },

  getCategoryContentsById: (id) => {
    const { categoriesPage } = contents;
    let ret = _.get(categoriesPage, id);

    if (!ret) {
      return Promise.reject(
        new NotFoundError(`Cannot find contents by categoryId: ${id}`)
      );
    } else {
      return Promise.resolve(ret);
    }
  }
};
 
module.exports = contentsService;
