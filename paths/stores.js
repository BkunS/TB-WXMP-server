'use strict';

const errorResponse = require('../helpers/errors').errorResponse;

const storesPath = (storesService) => {
  const GET = (req, res) => {
    storesService.getStores()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns stores list.',
    operationId: 'getStores',
    parameters: [],
    responses: {
      200: {
        description: 'The list of stores.',
        schema: {
          $ref: '#/definitions/Stores'
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

module.exports = storesPath;
