'use strict';

const _ = require('lodash');
const errorResponse = require('../helpers/errors').errorResponse;

const lookbooksPath = (lookbooksService) => {
  const GET = (req, res) => {
    const local = _.get(req, 'query.local', false);
    lookbooksService.getLookbooksList(local)
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
    parameters: [
      {
        in: 'query',
        name: 'local',
        description: 'Request local content instead',
        required: false,
        type: 'boolean'
      }
    ],
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
