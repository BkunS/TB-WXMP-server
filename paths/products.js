const productsPath = (productsService) => {
  const GET = (req, res, next) => {
    res.status(200).json(productsService.getProducts());
  }
 
  GET.apiDoc = {
    summary: 'Returns product lists.',
    operationId: 'getProducts',
    parameters: [
    ],
    responses: {
      200: {
        description: 'The list of products.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Products'
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

module.exports = productsPath;
