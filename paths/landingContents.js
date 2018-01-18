'use strict';

const errorResponse = require('../helpers/errors').errorResponse;

const landingContentsPath = (landingContentsService) => {
  const GET = (req, res) => {
    landingContentsService.getLandingContents()
      .then((ret) => {
        res.status(200).json(ret);
      })
      .catch((error) => {
        errorResponse(res, error);
      });
  };
 
  GET.apiDoc = {
    summary: 'Returns content for landing page.',
    operationId: 'getLandingContents',
    parameters: [],
    responses: {
      200: {
        description: 'Content for landingp page.',
        schema: {
          $ref: '#/definitions/LandingContent'
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

module.exports = landingContentsPath;
