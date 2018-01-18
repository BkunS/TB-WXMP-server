'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const fs = require('fs');
const inventories = require('../dao/inventories');
const errors = require('../helpers/errors');

const NotFoundError = errors.NotFoundError;
const BadRequestError = errors.BadRequestError;

const inventoriesService = {
  getInventoryById: (id) => {
    if (!id) {
      return Promise.reject(
        new BadRequestError(`No productId has been provided to get inventory.`)
      );
    }

    let ret = _.get(inventories, `${id}`);

    if (!ret) {
      return Promise.reject(
        new NotFoundError(`No inventory data of productId: ${id} has been found.`)
      );
    } else {
      return Promise.resolve({ inventory: +ret });
    }
  },

  putInventoriesById: (id, data) => {
    if (!id) {
      return Promise.reject(
        new BadRequestError(`No productId has been provided to update inventory.`)
      );
    }

    let ret = _.get(inventories, `${id}`);
    if (!ret) {
      return Promise.reject(
        new NotFoundError(`No inventory data of productId: ${id} has been found.`)
      );
    } else {
      const newInventory = +_.get(data, 'inventory');
      _.set(inventories, `${id}`, newInventory);
      return Promise.resolve({ inventory: newInventory });
    }
  },
};
 
module.exports = inventoriesService;
