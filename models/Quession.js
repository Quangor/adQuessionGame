var AV = require('leanengine');
var BaseModel =  require('./BaseModel');

var Model_quession = function(){
	BaseModel.call(this);
	var me = this;
	this.Quession = AV.Object.extend('Quession');
	this.quessionObject = new this.Quession();
	this.quessionQueryObject = new AV.Query(this.Quession);
	this.save = function(newQuession,saveSuccess,saveError){
		this.quessionObject.save({
			quession:newQuession.quession,
			answerA:newQuession.answerA,
			answerB : newQuession.answerB,
			answerC : newQuession.answerC,
			answerD : newQuession.answerD,
			select : newQuession.select
		},{
			success : saveSuccess,
			error : saveError
		});
	};
	this.find = function(querySuccess,queryFail){
		
		this.quessionQueryObject.find({
			success : querySuccess,
			error : queryFail
		});
	};
	this.name="a";
	/*this.validateData = {
		validateNull : function(target){
			if(!me.validate.validateNull(target)){
				return false;
			}
			return true;
		},
		validateQuession : function(quession){
			return validateNull(quession);
		},
		validateAnswerA : function(answerA){
			return validateNull(answerA);
		},
		validateAnswerB : function(answerB){
			return validateNull(answerB);
		},
		validateAnswerC : function(answerC){
			return validateNull(answerC);
		},
		validateAnswerD : function(answerD){
			return validateNull(answerD);
		},
		validateSelect : function(select){
			return validateNull(select);
		},
	};*/
	
};
module.exports = Model_quession;

