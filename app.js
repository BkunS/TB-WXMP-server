'use strict';

const express = require('express');
const openapi = require('express-openapi');
const bodyParser = require('body-parser');
const categoriesService = require('./services/categoriesService');
const cartsService = require('./services/cartsService');
const inventoriesService = require('./services/inventoriesService');
const landingContentsService = require('./services/landingContentsService');
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
    categoriesService: categoriesService,
    cartsService: cartsService,
    inventoriesService: inventoriesService,
    landingContentsService: landingContentsService,
    productsService: productsService,
    wishlistsService: wishlistsService
  },
  paths: [
    path.resolve(__dirname, 'paths'),
  ]
});
 
app.listen(10010);
