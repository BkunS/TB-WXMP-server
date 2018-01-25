'use strict';

const express = require('express');
const openapi = require('express-openapi');
const bodyParser = require('body-parser');
const authService = require('./services/authService');
const categoriesService = require('./services/categoriesService');
const cartsService = require('./services/cartsService');
const contentsService = require('./services/contentsService');
const inventoriesService = require('./services/inventoriesService');
const lookbooksService = require('./services/lookbooksService');
const productsService = require('./services/productsService');
const wishlistsService = require('./services/wishlistsService');
const apiDoc = require('./api-doc');
const path = require('path');
 
const app = express();

openapi.initialize({
  app,
  apiDoc: apiDoc,
  consumesMiddleware: {
    'application/json': bodyParser.json(),
    'text/text': bodyParser.text()
  },
  errorMiddleware: (err, req, res, next) => {
    console.error(JSON.stringify(err, null, 2));
  },
  dependencies: {
    authService: authService,
    categoriesService: categoriesService,
    cartsService: cartsService,
    contentsService: contentsService,
    inventoriesService: inventoriesService,
    lookbooksService: lookbooksService,
    productsService: productsService,
    wishlistsService: wishlistsService
  },
  paths: [
    path.resolve(__dirname, 'paths'),
  ]
});
 
app.listen(10010);
