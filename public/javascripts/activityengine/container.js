/*
 * function to add listeners to the question number Buttons
 */	
	
function addListenerToButtons(buttons){


	for(var i = 0; i < buttons.length; i++){
		buttons[i].style.cursor = "pointer";
		buttons[i].addEventListener('click', function(){selectQuestion(this, buttons);}, false);
	}

	//first question will be visited by default
	questions[currentQuestion].isVisited = true;

	buttons[currentQuestion].style.background = "rgb(204,232,187)";

}
	
	
		
/*
 * function to add function on click events to the question number buttons
 */	

function selectQuestion(buttonClicked, buttons){
	currentQuestion = parseInt(buttonClicked.attributes.id.nodeValue)-1;		
	questions[currentQuestion].isVisited = true;
	for(var n = 0; n < buttons.length; n++) {
		if(questions[n].isVisited == true){
			buttons[n].style.background = "rgb(248,252,160)";
		}
		else {
			buttons[n].style.background = "white";
		}

	}
	buttons[currentQuestion].style.background = "rgb(204,232,187)";
	displayQuestion(currentQuestion);
}

	

	
	function displayQuestion(layerNum) {
		stage.setSize(canvasWidth, layers[layerNum].usedY + containerHeight+2);
		document.getElementById("containerDiv").style.height = (layers[layerNum].usedY+containerHeight+10)+"px";
		document.getElementById("containerDiv").style.width = canvasWidth+"px";
		showLayer(layerNum);
	}	
	
	
	
	
/*
 * function to get the question with maximum options
 */
function getMaxOptions(questions) {
	var maxOptions = 0;
	for(var num=0;num<questions.length;num++) {
		if(questions[num].options.length > maxOptions) {
			maxOptions = questions[num].options.length;
		}
	}
	return maxOptions;
}
	
	
	
/*
 * function to claculate the width of the canvas to be drawn initially
 */

function getContainerWidth(maxOptions) {
	var totalOptions = maxOptions;
	var reqWidth = containerWidth*totalOptions;
	var availWidth = window.innerWidth;
	while (availWidth < reqWidth) {
		totalOptions = Math.round(totalOptions/2);
		reqWidth = containerWidth*totalOptions;
		useMargin = false;
	} 
return reqWidth;
}

	
	
/*
 * Function to read questions from the input XML file.
 */

function readQuestionsFromXml(fileName) {
	var questions = new Array();
	var questionPath="activity/questionsets";
	var optionPath="activity/questionsets/questionset/options";
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} 

	xmlhttp.open("GET","/public/content/"+fileName,false);
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
}
