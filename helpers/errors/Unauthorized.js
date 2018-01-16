'use strict';

const inherits = require('util').inherits;

function Unauthorized (message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.statusCode = 401;
  this.name = 'Unauthorized';
  this.message = message ? message : 'Unauthorized request.';
}

inherits(Unauthorized, Error);

module.exports = Unauthorized;
