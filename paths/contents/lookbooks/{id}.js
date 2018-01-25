'use strict';

const _ = require('lodash');
const errorResponse = require('../../../helpers/errors').errorResponse;

const lookbookContentsByIdPath = (contentsService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    contentsService.getLookbookContentsById(id)
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns contents for specific lookbook page.',
    operationId: 'getLookbookContentsById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'lookbookId',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'Content for specific lookbook page.',
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

module.exports = lookbookContentsByIdPath;
