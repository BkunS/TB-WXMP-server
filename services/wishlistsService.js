'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const wishlistsOnBaas = require('../dao/baas/wishlistsOnBaas');
const generateId = require('../helpers/generateId');
const errors = require('../helpers/errors');

const getWishlistByIdFromBaas = wishlistsOnBaas.getWishlistByIdFromBaas;
const putWishlistIntoBaas = wishlistsOnBaas.putWishlistIntoBaas;
const deleteWishlistByIdFromBaas = wishlistsOnBaas.deleteWishlistByIdFromBaas;
const NotFoundError = errors.NotFoundError;
const BadRequestError = errors.BadRequestError;

const OMIT_OPTIONS = ['uuid', 'metadata'];

const wishlistsService = {
  getWishlistById: (wishlistId) => {
    return getWishlistByIdFromBaas(wishlistId)
      .then((wishlist) => {
        if (!wishlist) {
          throw new NotFoundError(
            `No cart with wishlistId: '${wishlistId}' has been found.`
          );
        } else {
          return _.omit(wishlist, OMIT_OPTIONS);
        }
      });
  },
  
  putWishlist: (data, wishlistId) => {
    if (wishlistId && _.isEmpty(data)) {
      return Promise.reject(
        new BadRequestError(`Invalid request to update cart in BaaS: Missing data.`)
      );
    } else {
      if (!wishlistId) {
        if (!data) {
          data = {};
        }
        _.set(data, 'name', generateId());
      }
      return putWishlistIntoBaas(data, wishlistId)
        .then((wishlist) => {
          return _.omit(wishlist, OMIT_OPTIONS);
        });
    }
  },

  deleteWishlist: (wishlistId) => {
    if (!wishlistId) {
      return Promise.reject(
        new BadRequestError(`Invalid request to delete cart in BaaS: Missing wishlistId.`)
      );
    } else {
      return deleteWishlistByIdFromBaas(wishlistId);
    }
  }
};

module.exports = wishlistsService;
