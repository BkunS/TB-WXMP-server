'use strict';

const request = require('request-promise');
const _ = require('lodash');
const configs = require('../configs/configs');
const errors = require('../helpers/errors');
const BadRequestError = errors.BadRequestError;

const authService = {
  postCreds: (data) => {
    const { appId, appSecret, accessTokenBaseUrl } = _.get(configs, 'wechat');
    const { openId } = data;

    const options = {
      method: 'GET',
      url: `accessTokenBaseUrl&appid=${appId}&secret=${appSecret}`,
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
  },

  postPaymentAuth: (data) => {
    const { appId, mchId, tradeType, paymentAuthUrl } = _.get(configs, 'wechat');
    const { body, totalFee } = data;

    const options = {
      method: 'GET',
      url: paymentAuthUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'appid': appId,
        'mch-id': mchId,
        'nonce_str': '',
        'sign': '',
        'body': body,
        'out_trade_no': '',
        'total_fee': totalFee,
        'spbill_create_ip': '',
        'trade_type': tradeType,
        'notify_url': null,
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
