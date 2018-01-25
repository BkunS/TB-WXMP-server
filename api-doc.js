'use strict';

const apiDoc = {
  swagger: '2.0',
  basePath: '/v1',
  info: {
    title: 'wxmp-server',
    version: '1.0.0'
  },
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Product: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        price: {
          type: 'number'
        },
        saleprice: {
          type: 'number'
        },
        masterId: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        displayName: {
          type: 'string'
        },
        category: {
          type: 'string'
        },
        categoryId: {
          type: 'string'
        },
        color: {
          type: 'string'
        },
        displayColorName: {
          type: 'string'
        },
        size: {
          type: 'string'
        },
        image: {
          type: 'string'
        }
      }
    },
    Inventory: {
      type: 'object',
      properties: {
        inventory: {
          type: 'number'
        }
      }
    },
    Cred: {
      type: 'object',
      properties: {
        openid: {
          type: 'string'
        },
        appId: {
          type: 'string'
        }
      }
    },
    Error: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      }
    }
  },
  paths: {}
};
 
module.exports = apiDoc;
