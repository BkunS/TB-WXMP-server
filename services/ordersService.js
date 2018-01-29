'use strict';

const fs = require('fs');
const Promise = require('bluebird');
const _ = require('lodash');
const path = require('path');
const orders = require('../dao/orders');
const generateId = require('../helpers/generateId');
const errors = require('../helpers/errors');

const NotFoundError = errors.NotFoundError;
const StorageError = errors.StorageError;

const productsService = {
  postOrder: (data) => {
    const id = generateId();
    const order = {};
    _.assign(order, data, {id});
    orders.push(order);

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '../dao', 'orders.json'), JSON.stringify(orders, null, 2), 'UTF-8', (err) => {
        if (err) {
          console.error(err);
          reject(new StorageError(`Unable to store new order to database: ${err}.`));
        }
        console.log(`Order: ${id} saved!`);
        resolve(order);
      });
    });
  },

  getOrdersByUserId: (userId) => {
    return Promise.resolve(
      _.filter(orders, { 'userId': userId })
    );
  },

  getOrderById: (id) => {
    let ret = _.find(orders, { 'id': id });
    if (!ret) {
      return Promise.reject(
        new NotFoundError(`Error while retrieving order: No order of id: '${id}' has been found.`)
      );
    } else {
      return Promise.resolve(ret);
    }
  },

  putOrderById: (id, data) => {
    let index = _.findIndex(orders, { 'id': id });

    if (index < 0) {
      return Promise.reject(
        new NotFoundError(`Erro while updating order: No order of id: '${id}' has been found.`)
      );
    }

    let order = orders[index];
    data = _.pick(data, ['shipment', 'shippingPrice', 'totalPrice', 'status', 'tracking', 'image']);
    const shippingPrice = _.get(data, 'shippingPrice') ? +_.get(data, 'shippingPrice') : _.get(order, 'shippingPrice');
    const totalPrice = _.get(data, 'totalPrice') ? +_.get(data, 'totalPrice') : _.get(order, 'totalPrice');

    _.set(data, 'finalPrice', shippingPrice + totalPrice);
    _.merge(order, data);
    orders[index] = order;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '../dao', 'orders.json'), JSON.stringify(orders, null, 2), 'UTF-8', (err) => {
        if (err) {
          console.error(err);
          reject(new StorageError(`Unable to update order to database: ${err}.`));
        } 
        console.log(`Order: ${id} updated!`);
        resolve(order);
      });
    });
  },

  deleteOrders: () => {
    const orders = [];
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '../dao', 'orders.json'), JSON.stringify(orders, null, 2), 'UTF-8', (err) => {
        if (err) {
          console.error(err);
          reject(new StorageError(`Unable to clear orders from database: ${err}.`));
        } 
        console.log(`Orders cleared!`);
        resolve(204);
      });
    });
  }
};
 
module.exports = productsService;