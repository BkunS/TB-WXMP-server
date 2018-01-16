'use strict';

const inherits = require('util').inherits;

function ForbiddenRequestError (message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.statusCode = 403;
  this.name = 'ForbiddenRequestError';
  this.message = message ? message : 'Forbidden request.';
}

inherits(ForbiddenRequestError, Error);

module.exports = ForbiddenRequestError;
