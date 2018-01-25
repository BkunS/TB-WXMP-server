'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const lookbooksList = require('../dao/lookbooksList');
const lookbooks = require('../dao/lookbooks');
const errors = require('../helpers/errors');
const NotFoundError = errors.NotFoundError;

const lookbooksService = {
  getLookbooksList: () => {
    return Promise.resolve(lookbooksList);
  },

  getLookbooks: () => {
    return Promise.resolve(lookbooks);
  },

  getLookbookById: (id) => {
    const ret = _.find(lookbooks, { 'id': id });
    if (!ret) {
      return Promise.reject(
        new NotFoundError(`No lookbook of id: '${id}' has been found.`)
      );
    } else {
      return Promise.resolve(ret);
    }
  },
};
 
module.exports = lookbooksService;
