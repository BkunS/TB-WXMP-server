'use strict';

const errorResponse = require('../../helpers/errors').errorResponse;

const lookbookContentsPath = (contentsService) => {
  const GET = (req, res) => {
    contentsService.getLookbookContents()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns content for lookbook page.',
    operationId: 'getLookbookContents',
    parameters: [],
    responses: {
      200: {
        description: 'Content for lookbook page.',
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

module.exports = lookbookContentsPath;
