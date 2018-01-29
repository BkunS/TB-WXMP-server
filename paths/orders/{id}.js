'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const errors = require('../../helpers/errors');

const errorResponse = errors.errorResponse;
const BadRequestError = errors.BadRequestError;

const orderByIdPath = (ordersService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    let promises;

    if (!id) {
      promises = new Promise.reject(
        new BadRequestError(`No id is found in request`)
      );
    } else {
      promises = ordersService.getOrderById(id);
    }
    
    promises
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };

  const PUT = (req, res) => {
    const id = _.get(req, 'params.id');
    const data = _.get(req, 'body');
    let promises;

    if (!id) {
      promises = new Promise.reject(
        new BadRequestError(`No id is found in request.`)
      );
    } else if (!data) {
      promises = new Promise.reject(
        new BadRequestError(`Missing body in request.`)
      );
    } else {
      promises = ordersService.putOrderById(id, data);
    }

    promises
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns order by Id.',
    operationId: 'getOrderById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'orderId',
        required: true,
        type: 'string'
      }
    ],
    responses: {
      200: {
        description: 'Inventory data for specific product.',
        schema: {
          $ref: '#/definitions/Order'
        }
      },
      default: {
        description: 'An error occurred',
        schema: {
          $ref: '#/definitions/Error'
        }
      }
    }
  };

  PUT.apiDoc = {
    summary: 'Update order by Id.',
    operationId: 'putOrderById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'orderId',
        required: true,
        type: 'string'
      },
      {
        in: 'body',
        name: 'data',
        description: 'Order Data',
        required: false,
        schema: {
          $ref: '#/definitions/Order'
        }
      }
    ],
    responses: {
      200: {
        description: 'Inventory data for specific product.',
        schema: {
          $ref: '#/definitions/Inventory'
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
    PUT
  };
 
  return operations;
};

module.exports = orderByIdPath;
