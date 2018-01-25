'use strict';

const request = require('request-promise');
const _ = require('lodash');
const configs = require('../configs/configs');
const errors = require('../helpers/errors');
const BadRequestError = errors.BadRequestError;

const authService = {
  postCreds: (data) => {
    const { appId, appSecret, baseUrl } = _.get(configs, 'wechat');
    const { openId } = data;

    const options = {
      method: 'GET',
      url: baseUrl + '&appid=' + appId + '&secret=' + appSecret,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'code': openId,
        'grant_type': 'client_credential'
      },
      resolveWithFullResponse: true,
      simple: false,
      json: true
    };

    return request(options).then((res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        throw new BadRequestError(`Unable to get access token from WX server.`);
      } else {
        return _.get(res, 'body');
      }
    });
  }
};
 
module.exports = authService;
