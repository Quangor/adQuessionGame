var express = require('express');
var router = express.Router();
var AV = require('leanengine');
var  QuessionModel =  require('../models/Quession');
var weixin = require('../weixin');

var getRandom = function(){
	var random = parseInt(Math.random() * 10);
	return random;
};

router.get('/',function(req,res){
	var url = ('http://' + req.headers.host+req.originalUrl).split('#')[0];
	weixin.setConfig(url,function(weixinConfig){
		 var quessionModel = new QuessionModel();
		 quessionModel.find(function(results){
		 	var newResult = [];
		 	var resultLength = results.length;
		 	if(resultLength>0){
		 		var counter = 0;
		 		var quessionIndex = -1;
		 		var jianrenIndex = getRandom()%6 + 1;
		 		while(counter++<9){
		 			var randomeIndex = getRandom();
		 			randomeIndex  = randomeIndex%2 +1;
		 			
		 			newResult.push(results[quessionIndex + randomeIndex]);
		 			quessionIndex += 2;
		 			if(jianrenIndex == counter){
		 				newResult.push(results[resultLength-1]);
		 			}
		 		}
		 	}
		 	var responeData = {
		 		weixinConfig : weixinConfig,
		 		quessions : newResult
		 	};
		 
		 	 res.render('index', {
			    title: '广告大官人',
			    data : responeData
			 });
		 },function(error){
		 	 alert("Error: " + error.code + " " + error.message);
		 });
	});
});

module.exports = router;
