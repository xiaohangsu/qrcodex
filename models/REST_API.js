var crypto = require('crypto');
var config = require('../config');

exports.generateHeaders = function() {
  var timestamp = Math.round(new Date().getTime() / 1000);
  var sign_before_hash = timestamp + config.avos_app_key;
  var hash = crypto.createHash('md5');
  hash.update(sign_before_hash);
  var sign_after_hash = hash.digest('hex');
  var request_sign = sign_after_hash + ',' + timestamp;

  var AVCLOUD_HEADERS = {
    'Accept': '*/*',
    'User-Agent': 'QRCODEX',
    'X-AVOSCloud-Application-Id': config.avos_app_id,
    'X-AVOSCloud-Request-Sign': request_sign
  };

  return AVCLOUD_HEADERS;
};