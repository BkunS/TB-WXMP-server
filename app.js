'use strict';

const express = require('express');
const openapi = require('express-openapi');
const categoriesService = require('./services/categoriesService');
const cartsService = require('./services/cartsService');
const inventoriesService = require('./services/inventoriesService');
const productsService = require('./services/productsService');
const wishlistsService = require('./services/wishlistsService');
const apiDoc = require('./api-doc');
const path = require('path');
 
const app = express();

openapi.initialize({
  app,
  apiDoc: apiDoc,
  dependencies: {
    productsService: productsService,
    categoriesService: categoriesService,
    cartsService: cartsService,
    inventoriesService: inventoriesService,
    wishlistsService: wishlistsService
  },
  paths: [
    path.resolve(__dirname, 'paths'),
  ]
});
 
app.listen(10010);
