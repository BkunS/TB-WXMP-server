'use strict';

const Promise = require('bluebird');
const getBaasClient = require('../../helpers/getBaasClient');
const errors = require('../../helpers/errors');

const BadRequestError = errors.BadRequestError;

const getCartByIdFromBaas = (cartId) => {
  if (!cartId) {
    return Promise.reject(
      new BadRequestError(`Unable to get cart from BaaS: Missing cartId`)
    );
  }

  const options = {
    method: 'GET',
    endpoint: 'carts/' + cartId
  };

  return sendRequest(options);
};

const putCartIntoBaas = (data, cartId) => {
  const options = {
    method: 'PUT',
    endpoint: 'carts/' + (cartId ? cartId : ''),
    body: data
  };

  return sendRequest(options);
};

const deleteCartByIdFromBaas = (cartId) => {
  if (!cartId) {
    return Promise.reject(
      new BadRequestError(`Unable to delete cart from BaaS: Missing cartId`)
    );
  }

  const options = {
    method: 'DELETE',
    endpoint: 'carts/' + cartId
  };

  return sendRequest(options);
};

const sendRequest = (options) => {
  const baasClient = getBaasClient();

  return new Promise((resolve, reject) => {
    baasClient.request(options, (error, result) => {
      if (error) {
        if (options.method === 'GET') {
          resolve(null);
        } else {
          console.error(error);
          reject(error);
        }
      } else {
        if (options.method === 'DELETE') {
          resolve(204);
        } else {
          
          resolve(result.entities[0]);
        }
      }
    });
  });
};

module.exports = {
  getCartByIdFromBaas: getCartByIdFromBaas,
  putCartIntoBaas: putCartIntoBaas,
  deleteCartByIdFromBaas: deleteCartByIdFromBaas
};
