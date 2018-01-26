'use strict';

const _ = require('lodash');
const errorResponse = require('../../helpers/errors').errorResponse;

const paymentAuthPath = (authService) => {
  const POST = (req, res) => {
    const data = _.get(req, 'body', {});
    
    authService.postPaymentAuth(data)
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  POST.apiDoc = {
    summary: 'Returns payment auth.',
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
        description: 'New payment auth.',
        schema: {
          $ref: '#/definitions/PaymentAuth'
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

module.exports = paymentAuthPath;
