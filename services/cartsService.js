'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const cartsOnBaas = require('../dao/baas/cartsOnBaas');
const generateId = require('../helpers/generateId');
const errors = require('../helpers/errors');

const getCartByIdFromBaas = cartsOnBaas.getCartByIdFromBaas;
const putCartIntoBaas = cartsOnBaas.putCartIntoBaas;
const deleteCartByIdFromBaas = cartsOnBaas.deleteCartByIdFromBaas;
const NotFoundError = errors.NotFoundError;
const BadRequestError = errors.BadRequestError;

const OMIT_OPTIONS = ['uuid', 'metadata'];

const cartsService = {
  getCartById: (cartId) => {
    return getCartByIdFromBaas(cartId)
      .then((cart) => {
        if (!cart) {
          throw new NotFoundError(
            `No cart with cartId: '${cartId}' has been found.`
          );
        } else {
          return _.omit(cart, OMIT_OPTIONS);
        }
      });
  },
  
  putCart: (data, cartId) => {
    if (cartId && _.isEmpty(data)) {
      return Promise.reject(
        new BadRequestError(`Invalid request to update cart in BaaS: Missing data.`)
      );
    } else {
      if (!cartId) {
        if (!data) {
          data = {};
        }
        _.set(data, 'name', generateId());
      }
      
      return putCartIntoBaas(data, cartId)
        .then((cart) => {
          return _.omit(cart, OMIT_OPTIONS);
        });
    }
  },

  deleteCartById: (cartId) => {
    if (!cartId) {
      return Promise.reject(
        new BadRequestError(`Invalid request to delete cart in BaaS: Missing cartId.`)
      );
    } else {
      return deleteCartByIdFromBaas(cartId);
    }
  },

  getItems: (cartId) => {
    return cartsService.getCartById(cartId)
      .then((cart) => {
        return _.get(cart, 'items', []);
      });
  },

  addItems: (cartId, items) => {
    return cartsService.getItems(cartId)
      .then((cartItems) => {
        // todo: merge two item lists
        _.merge(cartItems, items);
        let data = {
          items: cartItems
        };
        return cartsService.putCart(data, cartId);
      })
      .then((cart) => {
        return _.omit(cart, OMIT_OPTIONS);
      });
  }

};

module.exports = cartsService;
