const _ = require('lodash');

const categoriesByIdPath = (categoriesService) => {
  const GET = (req, res, next) => {
    const id = _.get(req, 'params.id');
    if (id) {
      res.status(200).json(categoriesService.getCategoryById(id));
    } else {
      res.status(400).json({
        Error: 'No id.'
      });
    }
  }
 
  GET.apiDoc = {
    summary: 'Returns category by Id.',
    operationId: 'getCategoryById',
    parameters: [
    ],
    responses: {
      200: {
        description: 'Specific category.',
        schema: {
          type: 'object',
          items: {
            $ref: '#/definitions/Category'
          }
        }
      },
      default: {
        description: 'An error occurred',
        schema: {
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

module.exports = categoriesByIdPath;
