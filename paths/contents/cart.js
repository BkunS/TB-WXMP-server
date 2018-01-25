'use strict';

const errorResponse = require('../../helpers/errors').errorResponse;

const pdpContentsPath = (contentsService) => {
  const GET = (req, res) => {
    contentsService.getCartContents()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns content for cart page.',
    operationId: 'getCartContents',
    parameters: [],
    responses: {
      200: {
        description: 'Content for cart page.',
        schema: {
          $ref: '#/definitions/PageContents'
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

module.exports = pdpContentsPath;
