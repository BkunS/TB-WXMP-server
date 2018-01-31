'use strict';

const fs = require('fs');
const Promise = require('bluebird');
const _ = require('lodash');
const path = require('path');
const generateId = require('../helpers/generateId');
const errors = require('../helpers/errors');

const NotFoundError = errors.NotFoundError;
const StorageError = errors.StorageError;

const dataPath = path.join(__dirname, '../dao', 'orders.json');

const productsService = {
  postOrder: (data) => {
    const id = generateId();
    const order = {};
    _.assign(order, data, {id});

    fs.readFile(dataPath, 'utf8', (err, orders) => {
      if (err) {
        console.error(err);
        return Promise.reject(new StorageError(`Unable to read orders data from database.`));
      }

      orders.push(order);
      return new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, '../dao', 'orders.json'), JSON.stringify(orders, null, 2), 'utf8', (err) => {
          if (err) {
            console.error(err);
            reject(new StorageError(`Unable to store new order to database: ${err}.`));
          }
          console.log(`Order: ${id} saved!`);
          resolve(order);
        });
      });
    });
  },

  getOrdersByUserId: (userId) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return Promise.reject(new StorageError(`Unable to read orders data from database.`));
      }

      return Promise.resolve(
        _.filter(JSON.parse(data), { 'userId': userId })
      );
    });
  },

  getOrderById: (id) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return Promise.reject(new StorageError(`Unable to read orders data from database.`));
      }
      
      let ret = _.find(JSON.parse(data), { 'id': id });
      if (!ret) {
        return Promise.reject(
          new NotFoundError(`Error while retrieving order: No order of id: '${id}' has been found.`)
        );
      } else {
        return Promise.resolve(ret);
      }
    });
  },

  putOrderById: (id, data) => {
    fs.readFile(dataPath, 'utf8', (err, orders) => {
      if (err) {
        console.error(err);
        return Promise.reject(new StorageError(`Unable to read orders data from database.`));
      }
      
      orders = JSON.parse(orders);
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
        fs.writeFile(dataPath, JSON.stringify(orders, null, 2), 'utf8', (err) => {
          if (err) {
            console.error(err);
            reject(new StorageError(`Unable to update order to database: ${err}.`));
          } 
          console.log(`Order: ${id} updated!`);
          resolve(order);
        });
      });
    });
  },

  deleteOrders: () => {
    const orders = [];
    return new Promise((resolve, reject) => {
      fs.writeFile(dataPath, JSON.stringify(orders, null, 2), 'utf8', (err) => {
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
