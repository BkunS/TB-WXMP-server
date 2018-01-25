'use strict';

const errorResponse = require('../../helpers/errors').errorResponse;

const homeContentsPath = (contentsService) => {
  const GET = (req, res) => {
    contentsService.getHomeContents()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns content for home page.',
    operationId: 'getHomeContents',
    parameters: [],
    responses: {
      200: {
        description: 'Content for home page.',
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

module.exports = homeContentsPath;
