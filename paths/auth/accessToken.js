'use strict';

const _ = require('lodash');
const errorResponse = require('../../helpers/errors').errorResponse;

const loginPath = (authService) => {
  const POST = (req, res) => {
    const data = _.get(req, 'body', {});
    
    authService.postCreds(data)
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  POST.apiDoc = {
    summary: 'Returns credentials.',
    operationId: 'login',
    parameters: [
      {
        in: 'body',
        name: 'data',
        description: 'Cred Data',
        required: false,
        schema: {
          $ref: '#/definitions/Cred'
        }
      }
    ],
    responses: {
      200: {
        description: 'New credentials.',
        schema: {
          $ref: '#/definitions/Cred'
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
    POST
  };
 
  return operations;
};

module.exports = loginPath;
