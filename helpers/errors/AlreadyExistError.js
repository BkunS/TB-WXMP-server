'use strict';

const inherits = require('util').inherits;

function AlreadyExistError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.statusCode = 500;
  this.name = 'AlreadyExistError';
  this.message = message ? message : 'Already existed.';
}

inherits(AlreadyExistError, Error);

module.exports = AlreadyExistError;
