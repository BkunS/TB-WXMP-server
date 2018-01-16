'use strict';

const _ = require('lodash');

const StorageError = require('./StorageError');
const Unauthorized = require('./Unauthorized');
const NotFoundError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const AlreadyExistError = require('./AlreadyExistError');
const ForbiddenRequestError = require('./ForbiddenRequestError');

const errorResponse = (res, error) => {
  const statusCode = error.statusCode ? error.statusCode : 500;
  res.status(statusCode).json(_.omit(error, ['statusCode']));
};

module.exports = {
  errorResponse: errorResponse,
  StorageError: StorageError,
  Unauthorized: Unauthorized,
  NotFoundError: NotFoundError,
  BadRequestError: BadRequestError,
  AlreadyExistError: AlreadyExistError,
  ForbiddenRequestError: ForbiddenRequestError
};
