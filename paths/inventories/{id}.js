'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const errors = require('../../helpers/errors');

const errorResponse = errors.errorResponse;
const BadRequestError = errors.BadRequestError;

const inventoryByIdPath = (inventoriesService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    let promises;

    if (!id) {
      promises = new Promise.reject(
        new BadRequestError(`No id is found in request`)
      );
    } else {
      promises = inventoriesService.getInventoryById(id);
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
    console.log(req);
    const id = _.get(req, 'params.id');
    const query = _.get(req, 'query');
    const data = _.get(req, 'params.data');
    let promises;

    if (!id) {
      promises = new Promise.reject(
        new BadRequestError(`No id is found in request`)
      );
    } else {
      promises = inventoriesService.putInventoriesById(id, data);
    }

    promises
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  }
 
  GET.apiDoc = {
    summary: 'Returns inventory by Id.',
    operationId: 'getInventoryById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'productId',
        required: true,
        type: 'string'
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
          $ref: '#/definitions/Error'
        }
      }
    }
  };

  PUT.apiDoc = {
    summary: 'Update inventory by Id.',
    operationId: 'putInventoryById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'productId',
        required: true,
        type: 'string'
      },
      {
        in: 'query',
        name: 'inventory',
        description: 'New Inventory number',
        required: false,
        type: 'number'
      }/*,
      {
        in: 'body',
        name: 'data',
        description: 'Inventory Data',
        required: true,
        schema: {
          $ref: '../../configs/schemas.json#/Inventory'
        }
      }*/
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

module.exports = inventoryByIdPath;
