'use strict';

const _ = require('lodash');
const errorResponse = require('../helpers/errors').errorResponse;

const ordersPath = (ordersService) => {
  const GET = (req, res) => {
    const userId = _.get(req, 'query.userId');
    ordersService.getOrdersByUserId(userId)
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };

  const POST = (req, res) => {
    const data = _.get(req, 'body');

    ordersService.postOrder(data)
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };

  const DELETE = (req, res) => {
    ordersService.deleteOrders()
      .then((status) => {
        res.status(status).json();
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns orders list.',
    operationId: 'getOrdersByUserId',
    parameters: [
      {
        in: 'query',
        name: 'userId',
        description: 'userId',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'List of orders by user.',
        schema: {
          $ref: '#/definitions/Orders'
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

  POST.apiDoc = {
    summary: 'Returns new-created order.',
    operationId: 'postOrder',
    parameters: [
      {
        in: 'body',
        name: 'data',
        description: 'Order data',
        required: true,
        schema: {
          $ref: '#/definitions/Order'
        }
      }
    ],
    responses: {
      200: {
        description: 'The order by id or list of orders by user.',
        schema: {
          $ref: '#/definitions/Order'
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

  DELETE.apiDoc = {
    summary: 'Returns 204 - no content.',
    operationId: 'deleteOrders',
    parameters: [

    ],
    responses: {
      204: {
        description: 'no content',
        schema: {
          additionalProperties: true
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
    GET,
    POST,
    DELETE
  };
 
  return operations;
};

module.exports = ordersPath;
