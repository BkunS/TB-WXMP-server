'use strict';

const inherits = require('util').inherits;

function BadRequestError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.statusCode = 400;
  this.name = 'BadRequestError';
  this.message = message ? message : 'Bad request.';
}

inherits(BadRequestError, Error);

module.exports = BadRequestError;
