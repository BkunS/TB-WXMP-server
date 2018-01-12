const apiDoc = {
  swagger: '2.0',
  basePath: '/v1',
  info: {
    title: 'wxmp-server',
    version: '1.0.0'
  },
  definitions: {
    World: {
      type: 'object',
      properties: {
        name: {
          description: 'APIs for TB WeChat mock MiniProgram.',
          type: 'string'
        }
      },
      required: ['name']
    }
  },
  paths: {}
};
 
module.exports = apiDoc;
