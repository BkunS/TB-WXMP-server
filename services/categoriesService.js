const _ = require('lodash');
const mainCategories = require('../dao/mainCategories');
const categories = require('../dao/categories');
 
const categoriesService = {
  getMainCategories: () => {
    return mainCategories;
  },

  getCategories: () => {
    return categories;
  },

  getCategoryById: (id) => {
    return _.find(categories, { 'id': id });
  },
};
 
module.exports = categoriesService;
