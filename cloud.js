var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define('quan', function(request, response) {
  response.success('Hello wujiangquan!');
});

module.exports = AV.Cloud;