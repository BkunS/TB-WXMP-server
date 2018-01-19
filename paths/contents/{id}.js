'use strict';

const _ = require('lodash');
const errorResponse = require('../../helpers/errors').errorResponse;

const categoryContentsPath = (contentsService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    contentsService.getCategoryContentsById(id)
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns contents for certain category page.',
    operationId: 'getCategoryContents',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'categoryId',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'Content for landingp page.',
        schema: {
          $ref: '#/definitions/CategoryContent'
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

module.exports = categoryContentsPath;
