var BaseModel = function(){
	this.validate = {
		validateNull : function(target){
			if(!target || /^\s*$/.test(target)){
				return false;
			}
			return true;
		},
		validateEmaile : function(target){
			if(!/^[a-zA-Z0-9]+[_]*[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/.test(target)){
				return false;
			}
			return true;
		}
	};
};

module.exports = BaseModel;