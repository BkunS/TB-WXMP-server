'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const categoriesList = require('../dao/categoriesList');
const categories = require('../dao/categories');
const errors = require('../helpers/errors');
const NotFoundError = errors.NotFoundError;

const categoriesService = {
  getCategoriesList: () => {
    return Promise.resolve(categoriesList);
  },

  getCategories: () => {
    return Promise.resolve(categories);
  },

  getCategoryById: (id) => {
    const ret = _.find(categories, { 'id': id });
    if (!ret) {
      return Promise.reject(
        new NotFoundError(`No category of id: '${id}' has been found.`)
      );
    } else {
      return Promise.resolve(ret);
    }
  },
};
 
module.exports = categoriesService;
