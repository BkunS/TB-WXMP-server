const _ = require('lodash');

const productByIdPath = (productsService) => {
  const GET = (req, res) => {
    const id = _.get(req, 'params.id');
    res.status(200).json(productsService.getProductById(id));
  };
 
  GET.apiDoc = {
    summary: 'Returns one product.',
    operationId: 'getProductById',
    parameters: [
    ],
    responses: {
      200: {
        description: 'Specific product.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Product'
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

module.exports = productByIdPath;
