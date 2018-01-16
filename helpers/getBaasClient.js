'use strict';

const usergrid = require('usergrid');
const baasConf = require('../configs/configs.json').baas;

module.exports = function(baasConfig) {
  if (!baasConfig) {
    baasConfig = baasConf;
  }
  
  const clientConfig = {
    orgName: baasConfig.orgName,
    appName: baasConfig.appName,
    URI: baasConfig.uri
  };

  if (baasConfig.clientId && baasConfig.clientSecret) {
    clientConfig.authType = usergrid.AUTH_CLIENT_ID;
    clientConfig.clientId = baasConfig.clientId;
    clientConfig.clientSecret = baasConfig.clientSecret;
  }

  return new usergrid.client(clientConfig);
};
