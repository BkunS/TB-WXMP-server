'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const mainCategories = require('../dao/mainCategories');
const categories = require('../dao/categories');
const errors = require('../helpers/errors');
const NotFoundError = errors.NotFoundError;

const categoriesService = {
  getMainCategories: () => {
    return new Promise((resolve) => {
      resolve(mainCategories);
    });
  },

  getCategories: () => {
    return new Promise((resolve) => {
      resolve(categories);
    });
  },

  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      const ret = _.find(categories, { 'id': id });
      if (!ret) {
        reject(new NotFoundError(`No category of id: '${id}' has been found.`));
      } else {
        resolve(ret);
      }
    });
  },
};
 
module.exports = categoriesService;
