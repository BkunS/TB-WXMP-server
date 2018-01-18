'use strict';

const Promise = require('bluebird');
const landingContents = require('../dao/landingContents.json');

const landingContentsService = {
  getLandingContents: () => {
    return Promise.resolve(landingContents);
  }
};
 
module.exports = landingContentsService;
