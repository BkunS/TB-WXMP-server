const categoriesPath = (categoriesService) => {
  const GET = (req, res) => {
    res.status(200).json(categoriesService.getMainCategories());
  };
 
  GET.apiDoc = {
    summary: 'Returns category lists.',
    operationId: 'getCategories',
    parameters: [
    ],
    responses: {
      200: {
        description: 'The list of categories.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Categories'
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

module.exports = categoriesPath;
