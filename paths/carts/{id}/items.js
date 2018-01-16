'use strict';

const _ = require('lodash');
const errors = require('../../../helpers/errors');

const errorResponse = errors.errorResponse;

const itemsPath = (cartsService) => {
  const GET = (req, res) => {
    const cartId = _.get(req, 'params.id');
    cartsService.getItems(cartId)
      .then((items) => {
        res.status(200).json(items);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };

  GET.apiDoc = {
    summary: 'Get items.',
    operationId: 'getItems',
    parameters: [],
    responses: {
      200: {
        description: 'List of items.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Item'
          }
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

module.exports = itemsPath;
