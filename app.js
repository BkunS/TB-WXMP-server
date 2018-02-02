'use strict';

const express = require('express');
const openapi = require('express-openapi');
const bodyParser = require('body-parser');
const _ = require('lodash');
const authService = require('./services/authService');
const categoriesService = require('./services/categoriesService');
const cartsService = require('./services/cartsService');
const contentsService = require('./services/contentsService');
const inventoriesService = require('./services/inventoriesService');
const lookbooksService = require('./services/lookbooksService');
const ordersService = require('./services/ordersService');
const productsService = require('./services/productsService');
const storesService = require('./services/storesService');
const wishlistsService = require('./services/wishlistsService');
const apiDoc = require('./api-doc');
const path = require('path');
 
const app = express();

let port = process.env.NODE_ENV === 'production' ? 8080 : 10010;

openapi.initialize({
  app,
  apiDoc: apiDoc,
  consumesMiddleware: {
    'application/json': bodyParser.json(),
    'text/text': bodyParser.text()
  },
  errorMiddleware: (err, req, res, next) => {
    if (err) {
      console.error(JSON.stringify(err, null, 2));
      const status = _.get(err, 'status', 500);
      const resBody = {
        name: 'General Error',
        message: _.get(err, 'errors[0].message')
      };
      res.status(status).json(resBody);
    } else {
      next();
    }
  },
  dependencies: {
    authService: authService,
    categoriesService: categoriesService,
    cartsService: cartsService,
    contentsService: contentsService,
    inventoriesService: inventoriesService,
    lookbooksService: lookbooksService,
    ordersService: ordersService,
    productsService: productsService,
    storesService: storesService,
    wishlistsService: wishlistsService
  },
  paths: [
    path.resolve(__dirname, 'paths'),
  ]
});
 
app.listen(port);
console.log(`Listening on port: ${port}`);
