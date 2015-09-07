var express = require('express');
var router = express.Router();
var AV = require('leanengine');
var  QuessionModel =  require('../models/Quession');


router.get('/',function(req,res){
	 res.render('manage', {
	    title: '添加问题'
	 });
});

router.post('/',function(req,res,next){
	 var newQuession = req.body;
	 var validate = true;
	 var errorMessage = [];
	 var quessionModel = new QuessionModel();
	 if(!quessionModel.validate.validateNull(newQuession.quession)){
	 	validate = false;
	 	errorMessage.push("问题不能为空");
	 }
	 if(!quessionModel.validate.validateNull(newQuession.answerA)){
	 	validate = false;
	 	errorMessage.push("选项A不能为空");
	 }
	 if(!quessionModel.validate.validateNull(newQuession.answerB)){
	 	validate = false;
	 	errorMessage.push("选项B不能为空");
	 }
	 if(!quessionModel.validate.validateNull(newQuession.answerC)){
	 	validate = false;
	 	errorMessage.push("选项C不能为空");
	 }
	 if(!quessionModel.validate.validateNull(newQuession.answerD)){
	 	validate = false;
	 	errorMessage.push("选项D不能为空");
	 }
	 if(!quessionModel.validate.validateNull(newQuession.select)){
	 	
	 	validate = false;
	 	errorMessage.push("答案不能为空");
	 }
	 if(!validate){
		res.send('error!' + errorMessage.join(' , '));
	 }else{
	 	quessionModel.save(newQuession,function(post){
	 		res.redirect('/manage');	
	 	},function(post,error){
	 		console.log(error);
	 		res.redirect('/manage');
	 	});
	 }
});

module.exports = router;