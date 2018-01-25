'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const errors = require('../../helpers/errors');

const errorResponse = errors.errorResponse;
const BadRequestError = errors.BadRequestError;

const lookbookByIdPath = (lookbooksService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    let promises;
    if (!id) {
      promises = new Promise.reject(
        new BadRequestError(`No id is found in request`)
      );
    } else {
      promises = lookbooksService.getLookbookById(id);
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
    summary: 'Returns lookbook by Id.',
    operationId: 'getLookbookById',
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
        description: 'Specific lookbook.',
        schema: {
          $ref: '#/definitions/Lookbook'
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

module.exports = lookbookByIdPath;
