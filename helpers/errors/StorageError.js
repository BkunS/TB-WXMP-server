'use strict';

const inherits = require('util').inherits;

function StorageError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.statusCode = 500;
  this.name = 'StorageError';
  this.message = message ? message : 'Could not save to database.';
}

inherits(StorageError, Error);

module.exports = StorageError;
