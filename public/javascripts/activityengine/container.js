var Container = {};

Container.GlobalObject = {
	currentQuestion : 0,
	activity : null,
			

	initialize : function(activity) {
		this.activity = activity;
		
		this.activity.questions = this.readQuestionsFromXml("sample_dndfs.xml");
		this.activity.maxOptions = this.getMaxOptions(this.activity.questions);
		this.activity.canvasWidth = this.getContainerWidth(activity, activity.maxOptions);
		this.activity.paint();
		
	},


/*
 * function to add listeners to the question number Buttons
 */

	addListenerToButtons : function(activity, buttons) {


	    for(var i = 0; i < buttons.length; i++){
		buttons[i].style.cursor = "pointer";
		buttons[i].addEventListener('click', function(){selectQuestion(activity, this, buttons);}, false);
	    }

	    //first question will be visited by default
	    questions[this.currentQuestion].isVisited = true;

	    buttons[this.currentQuestion].style.background = "rgb(204,232,187)";

	},



	/*
	 * function to add function on click events to the question number buttons
	 */

	selectQuestion : function(activity, buttonClicked, buttons) {
	    this.currentQuestion = parseInt(buttonClicked.attributes.id.nodeValue)-1;
	    questions[this.currentQuestion].isVisited = true;
	    for(var n = 0; n < buttons.length; n++) {
		if(questions[n].isVisited == true){
		    buttons[n].style.background = "rgb(248,252,160)";
		}
		else {
		    buttons[n].style.background = "white";
		}

	    }
	    buttons[this.currentQuestion].style.background = "rgb(204,232,187)";
	    activity.displayQuestion(this.currentQuestion);
	},









/*
 * function to get the question with maximum options
 */
	getMaxOptions : function (questions) {
	    var maxOptions = 0;
	    for(var num=0;num<questions.length;num++) {
		if(questions[num].options.length > maxOptions) {
		    maxOptions = questions[num].options.length;
		}
	    }
	    return maxOptions;
	},



/*
 * function to claculate the width of the canvas to be drawn initially
 */

getContainerWidth :function(activity, maxOptions)  {
	var totalOptions = maxOptions;
	
  	var containerDiv = document.getElementById("containerParent");
	
  	var reqWidth = activity.containerWidth*totalOptions;
	var availWidth = containerDiv.offsetWidth;
	activity.reducedLayout = false;
	while (availWidth < reqWidth ) {
		totalOptions = Math.round(totalOptions/2);
		reqWidth = activity.containerWidth*totalOptions;
		activity.reducedLayout = true;
	} 
	
	//updating rowspacing
	if(activity.reducedLayout){
		activity.rowSpacing = activity.containerHeight/3;
	}
	else{
		activity.rowSpacing = activity.containerHeight;
	}
	
		return reqWidth;
},

	/*
	 * Function to read questions from the input XML file.
	 */

	readQuestionsFromXml :function(fileName)  {
	    var questions = new Array();
	    var questionPath="activity/questionsets";
	    var optionPath="activity/questionsets/questionset/options";
	    if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	    }

	    xmlhttp.open("GET","../../content/" + fileName,false);
	    xmlhttp.send();
	    xmlDoc=xmlhttp.responseXML;
	    if (window.XMLHttpRequest) {
		var questionNodes=xmlDoc.getElementsByTagName("questionset");
		//var questionResult = questionNodes.iterateNext();


		for( var questionNum = 0; questionNum< questionNodes.length ; questionNum++){
		    var question= new Question();
		    question.blankCount = questionNodes[questionNum].getElementsByTagName("question")[0].childNodes[1].childNodes[0].nodeValue;


		    var options = new Array();
		    var optionElements = questionNodes[questionNum].getElementsByTagName("options")[0].getElementsByTagName("option");
		    for(var optionNum = 0; optionNum < optionElements.length ; optionNum++){
			options[optionNum] = optionElements[optionNum].childNodes[1].childNodes[0].nodeValue;

		    }

		    question.options = options;



		    var answers = new Array();
		    var answerElements = questionNodes[questionNum].getElementsByTagName("answers")[0].getElementsByTagName("answer");

		    for(var answerNum = 0; answerNum < answerElements.length ; answerNum++){

			answers[answerNum] = answerElements[answerNum].childNodes[1].childNodes[0].nodeValue;

		    }
		    question.answers = answers;

		    questions[questionNum] = question;
		}

	    }
	    return questions;
	},

	changeLanguage : function(languageParam)  {
	    language = languageParam;
	},

	showNext : function (){
		if(this.currentQuestion < this.activity.questions.length-1){
			this.currentQuestion = this.currentQuestion+1;
			this.activity.displayQuestion(this.currentQuestion);
		}
		else
		return;
	},

	showPrevious : function (){
		if(this.currentQuestion > 0){
			this.currentQuestion = this.currentQuestion-1;
			this.activity.displayQuestion(this.currentQuestion);
		}
		else
		return;
	},
	
	resize : function(activity)  {
		
		this.activity.canvasWidth = this.getContainerWidth(this.activity, activity.maxOptions);
		
		this.activity.onResize(this.currentQuestion);
	}


	
}

