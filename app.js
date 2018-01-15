const express = require('express');
const openapi = require('express-openapi');
const productsService = require('./services/productsService');
const categoriesService = require('./services/categoriesService');
const apiDoc = require('./api-doc');
const path = require('path');
 
const app = express();
openapi.initialize({
  app,
  apiDoc: apiDoc,
  dependencies: {
    productsService: productsService,
    categoriesService: categoriesService
  },
  paths: [
    path.resolve(__dirname, './paths'),
  ]
});
 
app.listen(10010);
