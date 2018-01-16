'use strict';

const errorResponse = require('../helpers/errors').errorResponse;

const categoriesPath = (categoriesService) => {
  const GET = (req, res) => {
    categoriesService.getMainCategories()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns category lists.',
    operationId: 'getCategories',
    parameters: [],
    responses: {
      200: {
        description: 'The list of categories.',
        schema: {
          $ref: '#/definitions/Categories'
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

module.exports = categoriesPath;
