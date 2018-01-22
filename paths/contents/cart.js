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
    summary: 'Returns content for pdp page.',
    operationId: 'getPdpContents',
    parameters: [],
    responses: {
      200: {
        description: 'Content for pdp page.',
        schema: {
          $ref: '#/definitions/PdpContent'
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
