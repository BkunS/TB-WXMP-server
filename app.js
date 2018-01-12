const express = require('express');
const openapi = require('express-openapi');
const productsService = require('./services/productsService');
const apiDoc = require('./api-doc');
const path = require('path');
 
const app = express();
openapi.initialize({
  app,
  apiDoc: apiDoc,
  dependencies: {
    productsService: productsService
  },
  paths: [
    path.resolve(__dirname, './paths'),
  ]
});
 
app.listen(3000);
