'use strict';

const inherits = require('util').inherits;

function NotFoundError (message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.statusCode = 404;
  this.name = 'NotFoundError';
  this.message = message ? message : 'Not Found.';
}

inherits(NotFoundError, Error);

module.exports = NotFoundError;
