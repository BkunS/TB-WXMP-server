'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const errors = require('../../helpers/errors');

const errorResponse = errors.errorResponse;
const BadRequestError = errors.BadRequestError;

const cartByIdPath = (cartsService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    let promises;
    
    if (!id) {
      promises = new Promise.reject(
        new BadRequestError(`No id is found in request to get cart.`)
      );
    } else {
      promises = cartsService.getCartById(id);
    }
    
    promises
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };

  const DELETE = (req, res) => {
    const id = _.get(req, 'params.id');
    let promises;
    
    if (!id) {
      promises = new Promise.reject(
        new BadRequestError(`No id is found in request to delete cart.`)
      );
    } else {
      promises = cartsService.deleteCartById(id);
    }

    promises
      .then((ret) => {
        res.status(ret).json();
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Get cart by Id.',
    operationId: 'getCartById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'cartId',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'Specific cart.',
        schema: {
          $ref: '#/definitions/Cart'
        }
      },
      default: {
        description: 'An error occurred',
        schema: {
          additionalProperties: true
        }
      }
    }
  };

  DELETE.apiDoc = {
    summary: 'Delete cart by Id.',
    operationId: 'deleteCartById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'cartId',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      204: {
        description: 'No content'
      },
      default: {
        description: 'An error occurred',
        schema: {
          additionalProperties: true
        }
      }
    }
  };

  let operations = {
    GET,
    DELETE
  };
 
  return operations;
};

module.exports = cartByIdPath;
