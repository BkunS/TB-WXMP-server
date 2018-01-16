'use strict';

const _ = require('lodash');
const errorResponse = require('../helpers/errors').errorResponse;

const cartsPath = (cartsService) => {
  const POST = (req, res) => {
    const data = _.get(req, 'params.data', {});
    
    cartsService.putCart(data)
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  POST.apiDoc = {
    summary: 'Returns new created cart.',
    operationId: 'postCart',
    parameters: [],
    responses: {
      200: {
        description: 'A new cart.',
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

  let operations = {
    POST
  };
 
  return operations;
};

module.exports = cartsPath;
