'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const errors = require('../../helpers/errors');

const errorResponse = errors.errorResponse;
const BadRequestError = errors.BadRequestError;

const productByIdPath = (productsService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    let promises;

    if (!id) {
      promises = Promise.reject(
        new BadRequestError(`No id has been found in request.`)
      );
    } else {
      promises = productsService.getProductById(id);
    }

    promises
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns one product.',
    operationId: 'getProductById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'productId',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'Specific product.',
        schema: {
          $ref: '#/definitions/Product'
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

  let operations = {
    GET
  };
 
  return operations;
};

module.exports = productByIdPath;
