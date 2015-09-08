var $ = function(id){
	return document.getElementById(id);
};

var pageInit = function(){
	var index = $("index");
	var gameContainer = $("game");
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	index.style.height = windowHeight + 'px';
	index.style.width = windowWidth + 'px';
	gameContainer.style.height = windowHeight + 'px';
	gameContainer.style.width = windowWidth + 'px';
};

pageInit();
window.resize = pageInit;

var honors = [{
	title : " 广告大官人 特等 ",
	slogan : "我是杠杠的大官人"
},{
	title : " 广告红旗手 一等 ",
	slogan : "我是杠杠的大官人"
},{
	title : " 广告大官人 二等 ",
	slogan : "我是杠杠的大官人"
},{
	title : " 广告大官人 三等 ",
	slogan : "我是杠杠的大官人"
},{
	title : " 广告大官人 四等 ",
	slogan : "我是杠杠的大官人"
},{
	title : " 广告屏蔽门 五等 ",
	slogan : "我是杠杠的大官人"
}];

var Honor = function(){
	
	this.honors = honors;
	
	this.createHonorRank = function(){
		this.honorRank = parseInt(location.href.split("?")[1].split("=")[1]);
		this.honor = this.honors[this.honorRank];
	};
	
	this.renderHonor = function(){
		var honor = this.honors[this.honorRank];
		$("honorTitle").innerText = honor.title;
		$("honorSlogan").innerText = honor.slogan;
	};
};


var Clock = function(){
	var me = this;
	this.totalTime = 60;
	this.clockcontainer = $("clockCounter");
	this.renderTime = function(time){
		this.clockcontainer.innerText = time;
	};
	
	this.startClock = function(finish,quessionNumber){
		this.renderTime(me.totalTime);
		var timerCounter = 0;
		quessionNumber = quessionNumber>10?10 : quessionNumber;
		var timmer = setInterval(function(){
			if((me.totalTime+1) == timerCounter){
				clearInterval(timmer);
				finish();
			}else{
				me.renderTime(me.totalTime - timerCounter++);
			}
		},me.totalTime*quessionNumber);
	};
	
};



var Game = function(){
	var me = this;
	this.answers = [];
	this.correctcounter = 0;
	this.quessions = $("quession").children;
	this.showGame = function(){
		$("game").className = "show";
		$("game").style.opacity = "1";
		$("index").className = "hide";
	};
	
	
	this.startGame = function(){
		me.showGame();
		me.collectAnswers();
		clock.startClock(this.stopGame,me.quessions.length);
	};
	
	this.showNextQuession = function(index){
		me.quessions[index-1].className = "hide";
		me.quessions[index].style.opacity = 1;
	};
	
	this.selectAnswer = function(quessionIndex,answerInder){
		if(me.answers[quessionIndex-1] == answerInder){
			me.correctcounter += 1;
		}
		if(quessionIndex == me.answers.length){
			me.stopGame();
		}else{
			me.showNextQuession(quessionIndex);
		}
	};
	
	this.collectAnswers = function(){
		for(var i=0;i<me.quessions.length;i++){
			me.answers.push(me.quessions[i].dataset.answer);
		}
	};
	
	this.createHonorRank = function(){
		var rank =me.answers.length -  me.correctcounter ;
		if(rank>=honors.length){
			rank = honors.length - 1;
		}
		var newHref = location.origin+location.pathname+'?honor='+rank;
		location.href= newHref;
	};
	
	this.stopGame = function(){
		me.createHonorRank();
	};
	
};
var game = new Game();
var clock = new Clock();
var honor = new Honor();

honor.createHonorRank();
honor.renderHonor();
weiXinReady({
	title:'大爷我在由"贱人APP"赞助的广告沙龙活动中，荣获'+honor.honor.title+'称号！',
	desc:honor.honor.slogan,
	imgUrl:''
});




