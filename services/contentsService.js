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

  getCategoryContentsById: (id) => {
    const { categories } = contents;
    let ret = _.get(categories, id);

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
