'use strict';

const errorResponse = require('../helpers/errors').errorResponse;

const lookbooksPath = (lookbooksService) => {
  const GET = (req, res) => {
    lookbooksService.getLookbooksList()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns lookbook lists.',
    operationId: 'getLookbooks',
    parameters: [],
    responses: {
      200: {
        description: 'The list of lookbooks.',
        schema: {
          $ref: '#/definitions/Lookbooks'
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

module.exports = lookbooksPath;
