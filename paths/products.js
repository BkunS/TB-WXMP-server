'use strict';

const errorResponse = require('../helpers/errors').errorResponse;

const productsPath = (productsService) => {
  const GET = (req, res) => {
    productsService.getProducts()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns product lists.',
    operationId: 'getProducts',
    parameters: [],
    responses: {
      200: {
        description: 'The list of products.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Product'
          }
        }
      },
      default: {
        description: 'An error occurred',
        schema: {
          $ref: '#/definitions/Error',
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

module.exports = productsPath;
