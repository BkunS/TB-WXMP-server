'use strict';

const uid = require('uid2');

const generateId = (len) => {
  if (!len) {
    len = 22;
  }
  return uid(len);
};

module.exports = generateId;
