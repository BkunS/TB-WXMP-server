'use strict';

const Promise = require('bluebird');
const getBaasClient = require('../../helpers/getBaasClient');
const errors = require('../../helpers/errors');

const BadRequestError = errors.BadRequestError;

const getWishlistByIdFromBaas = (wishlistId) => {
  if (!wishlistId) {
    return Promise.reject(
      new BadRequestError(`Unable to get wishlist from BaaS: Missing cartId`)
    );
  }

  const options = {
    method: 'GET',
    endpoint: 'wishlists/' + wishlistId
  };

  return sendRequest(options);
};

const putWishlistIntoBaas = (data, wishlistId) => {
  const options = {
    method: 'PUT',
    endpoint: 'wishlists/' + (wishlistId ? wishlistId : ''),
    body: data
  };

  return sendRequest(options);
};

const deleteWishlistByIdFromBaas = (wishlistId) => {
  if (!wishlistId) {
    return Promise.reject(
      new BadRequestError(`Unable to delete wishlist from BaaS: Missing cartId`)
    );
  }

  const options = {
    method: 'DELETE',
    endpoint: 'wishlists/' + wishlistId
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
  getWishlistByIdFromBaas: getWishlistByIdFromBaas,
  putWishlistIntoBaas: putWishlistIntoBaas,
  deleteWishlistByIdFromBaas: deleteWishlistByIdFromBaas
};
