var wechat_config = require('./wechat_config');
var cache = require("memory-cache");
var https = require('https');
var Weixin = function(){
	var me  = this;
	
	this._get_access_token = function(getAccessTakenSuccess){
		var cacheAccessTaken = cache.get('access_token');
		if(!cacheAccessTaken){
			var url = wechat_config.accessTokenUrl+'?grant_type='+wechat_config.grant_type +'&appid='+wechat_config.appid +  '&secret='+wechat_config.secret;
			var options = {
				host:'api.weixin.qq.com',
				path:'/cgi-bin/token'+'?grant_type='+wechat_config.grant_type +'&appid='+wechat_config.appid +  '&secret='+wechat_config.secret,
				port:80
			};
			https.get(url, function(res) {
			  res.on("data", function(chunk) {
					var result = JSON.parse(chunk);
					cache.put('access_token',result,result.expires_in);
		            getAccessTakenSuccess(result.access_token);
			  });
			}).on('error', function(e) {
			  console.log("Got error: " + e.message);
			});
		}else{
	        getAccessTakenSuccess(cacheAccessTaken);
		}
	};
	
	this._get_jsapi_ticket = function(accessTaken,getTicketSuccess){
		
		var cache_ticket = cache.get('ticket');
		if(!cache_ticket){
			var url = wechat_config.ticketUrl+'?access_token='+accessTaken + "&type=jsapi";
			
			https.get(url,function(_res){
				_res.on('data',function(chunk){
					var result = JSON.parse(chunk);
					cache.put('ticket',result,result.expires_in);
		            getTicketSuccess(result.ticket);
				});
			});
		}
	};
	
	this._createNonceStr = function () {
		return Math.random().toString(36).substr(2, 15);
	};
	
	this._createTimestamp = function () {
		return parseInt(new Date().getTime() / 1000) + '';
	};
	
	this._raw = function (args) {
		  var keys = Object.keys(args);
		  keys = keys.sort();
		  var newArgs = {};
		  keys.forEach(function (key) {
		    newArgs[key.toLowerCase()] = args[key];
		  });
		
		  var string = '';
		  for (var k in newArgs) {
		    string += '&' + k + '=' + newArgs[k];
		  }
		  string = string.substr(1);
		  return string;
	};
	
	this._sign = function (jsapi_ticket) {
		  var ret = {
		  	appid:wechat_config.appid,
		    jsapi_ticket: jsapi_ticket,
		    nonceStr: me._createNonceStr(),
		    timestamp: me._createTimestamp(),
		    url: wechat_config.url
		  };
		  var string = me._raw(ret),
		      jsSHA = require('jssha');
		      
		  var shaObj = new jsSHA(string, 'TEXT');
		   
		  ret.signature = shaObj.getHash('SHA-1', 'HEX');
		  return ret;
	};
	
	this.setConfig = function(setSuccess){
		me._get_access_token(function(accessTaken){
			me._get_jsapi_ticket(accessTaken,function(jsapi_ticket){
				console.log(jsapi_ticket);
				var config = me._sign(jsapi_ticket);
				setSuccess(config);
			});
		});
	};
};

module.exports = new Weixin();
