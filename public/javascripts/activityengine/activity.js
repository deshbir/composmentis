/*
 *Prototyping new Properties to Kinetic JS Objects
 */

Kinetic.Layer.prototype.name="";
Kinetic.Layer.prototype.usedX=0;
Kinetic.Layer.prototype.usedY=0;

Kinetic.Text.prototype.name="";
Kinetic.Text.prototype.owner=null;
Kinetic.Text.prototype.startX=0;
Kinetic.Text.prototype.startY=0;


Kinetic.Rect.prototype.name="";
Kinetic.Rect.prototype.empty=true;
Kinetic.Rect.prototype.child=true;
Kinetic.Rect.prototype.startX=true;

Kinetic.Group.prototype.width=0;
Kinetic.Group.prototype.height=0;

Kinetic.Shape.prototype.startX=0;
Kinetic.Shape.prototype.width=0;
Kinetic.Shape.prototype.height=0;
	
	
	

/*
 *configurations
 */

var margin = 0;
var useMargin = true;
var currentQuestion = 0;

//width, height of hidden containers
var containerWidth = 120;
var containerHeight = 50;

//width, height of draggable options
var optionWidth = 110;
var optionHeight = 40;


var canvasWidth = 0;
var maxUsedX=0;

function Question() {
	this.blankCount=0;
	this.options = new Object();
	this.answers = new Object();
	this.isVisited = false;
	this.isAttemptCorrect = false;
}

var containerBoxNameMap = new Object();
var containersMidY = 0;
var layers = new Array();
var stage = null;
var containerBoxes = new Array();
var optionBoxes = new Array();



// Reading questions from XML file. "questions" is required as a global variable.
var questions = new Array();
questions = readQuestionsFromXml("sample_dndfs.xml");



/*
* The function to be called to start painting the Canvas
*/

function initialize() {

	// Width of the activity is based upon the maximum options in any question.
	var maxOptions = getMaxOptions(questions);

	
	// calculating width of the container, based upon the number of questions.	
	canvasWidth = getContainerWidth(maxOptions);

	// creating a different layers for each question
	for(var questionNum= 0; questionNum < questions.length; questionNum++){
		layers[questionNum] = new Kinetic.Layer();
		layers[questionNum].name=(questionNum)+"";
	}

	// creating stage to add different layers.
	stage = new Kinetic.Stage({
				container: 'containerDiv',
				width: canvasWidth,
		    });

	// paint all the questions in respective layers.
	paintActivity(questions, layers, maxOptions);

	// bringing first question to top.
	layers[0].moveToTop();
}

/*
* function is called when browser window is resized.
* 
* The activity is re-painted according to new available 
* size and draggable option boxes are moved to their 
* positions prior to resizing.
*/

function onResize() {
	
	var  parent = document.getElementById("containerParent");
	var  child = document.getElementById("containerDiv");
	
	//activity container is first removed and then added again
	parent.removeChild(child);
	var containerDiv = document.createElement('div');
	containerDiv.setAttribute('id','containerDiv');

	parent.appendChild(containerDiv);
	stage.clear();
	stage = null;
	
	//save the old state before re-painting
	var oldContainers = containerBoxNameMap ;
	var oldOptionBoxes = optionBoxes ;
	
	//re-initialize global objects to their initial state
	
	useMargin = true;
	maxUsedX = 0;
	containerBoxNameMap = new Object();
	optionBoxes = new Array();
	initialize();
	
	//margins between the hidden containers and draggable options
	marginLeft = (containerWidth - optionWidth)/2; 
	marginTop = (containerHeight - optionHeight)/2;
	
	for(var i=0; i < oldOptionBoxes.length; i++ ){
		if(optionBoxes[i].owner.name != oldOptionBoxes[i].owner.name){
		
			optionBoxes[i].transitionTo({
					rotation: 0,
					x: containerBoxNameMap [oldOptionBoxes[i].owner.name].attrs.x + marginLeft,
					y:  containerBoxNameMap [oldOptionBoxes[i].owner.name].attrs.y + marginTop,
					alpha: 1,
					duration:.01
					});	
			optionBoxes[i].owner = containerBoxNameMap [oldOptionBoxes[i].owner.name];
			containerBoxNameMap [oldOptionBoxes[i].owner.name].empty = false;
		}
	}
	
	displayQuestion(currentQuestion);
}


/*
* function to add the hidden container boxes to the respective layers
* @params 
* layer - kinetic js layer to which the box is to be added
* box - the container to be added
* startX - the initial x-coordinate where the box is to be placed
*/

function addBoxtoLayer(layer, box, startX) {
	if(layer.usedX + box.attrs.width > canvasWidth) {
	// adding box to the New Level

		maxUsedX = layer.usedX;
		layer.usedX = startX;
		layer.usedY = layer.usedY + box.attrs.height;
		box.attrs.x = layer.usedX;
		box.attrs.y = layer.usedY;
		layer.usedX = startX + box.attrs.width;
	} else {
	// adding box to the Same Level
		box.attrs.x = layer.usedX;
		box.attrs.y = layer.usedY;
		layer.usedX= layer.usedX+box.attrs.width;
	}
	return box;
}

	
/*
* function to Paint the whole activity
* @params
* questions - the array of Question() to be painted
* layers - array of Kinetic js layers
* maxOptions - maximum number of options in a single question
*/	
	
function paintActivity(questions, layers, maxOptions){
	

	var layerHeightMax = 0;	
	var layerWidthMax = 0;	
	for(var i = 0; i < questions.length ; i++){

		if(useMargin) {
			layers[i].usedX += (maxOptions-questions[i].options.length)*containerWidth/2;
		}

		var question = paintQuestion(questions[i].options, layers[i]);

		if(layers[i].usedY > layerHeightMax ) {
			layerHeightMax = layers[i].usedY;
		}

		if(layers[i].usedX > layerWidthMax ) {
			layerWidthMax = layers[i].usedX;
		}


		layers[i].add(question);
		stage.add(layers[i]);
	}	
	displayQuestion(0);
}
	
	
	
/*
* Function to paint a single question
* @params
* options - array of options from a question
* layer - question is painted on this layer	
* @return -  a single painted Question as an Object
*/
function paintQuestion(options, layer){

	var optionGroup = new Kinetic.Group({});

	var usedX = layer.usedX;


	paintContainerBox(layer, options, layer.usedX, optionGroup);

	var outerRectangle =  new Kinetic.Rect({

				width: canvasWidth,
				height:layer.usedY + containerHeight + 2,
				fill:"white",
			});


	outerRectangle.setPosition(0, 0);
	optionGroup.add(outerRectangle);

	var outerMostRectangle =  new Kinetic.Rect({
				width: 0,
				height:0,
				fill:"white",
			});

	outerRectangle.setPosition(0, 0);
	optionGroup.add(outerMostRectangle);



	layer.usedY = 0;
	layer.usedX = usedX;
	paintAnswerPlaceHolder(layer, options, layer.usedX, optionGroup);

	//starting new level for answer options
	layer.usedX = usedX;
	layer.usedY = layer.usedY + 2*containerHeight;


	paintOptionBox(layer, options, layer.usedX, optionGroup);


	if(maxUsedX !=0){
	layer.usedX= maxUsedX;
	}

	return optionGroup;


}
	
	
	
/*
* Function to paint the containers for Answer Placeholders and draggable optionBoxes 
*/

function paintContainerBox(layer, options, startX, optionGroup) {
	var layerName = layer.name;
	for(var num=0;num<options.length*2;num++) {
		var optionBoxName = layerName+"l,"+(num+1)+"b";
		var questionBox = new Kinetic.Rect({
			width : containerWidth,
			height: containerHeight,
			fill: "#FFFFFF",
			stroke: "#999900",
			visible:false
		});

		questionBox.empty = true;
		questionBox.name = optionBoxName;

		//starting new level for the answer options
		if(num == options.length){
			layer.usedY = layer.usedY + 2*containerHeight;
			layer.usedX = startX;
		}

		var containerBox = addBoxtoLayer(layer, questionBox, startX);
		containerBoxes.push(containerBox);
		optionGroup.add(containerBox);
		containerBoxNameMap[optionBoxName]=questionBox;
		if(num == options.length-1) {
			containersMidY=layer.usedY;
		}
	}
}
	

/*
* Function to paint the options
*/

function paintOptionBox(layer, questions, startX, optionGroup) {
var width = optionWidth;
var fontSize = 14;
var paddingTop = (optionHeight - fontSize)/2;
var canvas = layer.getCanvas();
var context = canvas.getContext("2d");
var metrics = null;

for(var num=0;num<questions.length;num++) {
	var paddingLeft = 0;
	var optionBoxName = (num+1)+"";
	var optionBox = new Kinetic.Text({
					x:0,
					y:0,
					stroke:"#555555",
					fill:"white",
					text:questions[num],
					textFill: "black",
					fontSize: fontSize,
					fontFamily: "Helvetica Neue",
					paddingLeft: 5,
					paddingTop:paddingTop,
					strokeWidth: 2,
					draggable:true,
					align: "left",
					verticalAlign: "top",
					dragBounds:{
						top: 0,
						left: 0,
						right: stage.getWidth() - optionWidth
					}
				});
	optionBox.width = containerWidth;
	optionBox.height = containerHeight; 
	optionBox.name = optionBoxName;
	optionBox.owner = containerBoxNameMap[layer.name +"l," +(questions.length + num +1)+"b"];
	context.font = optionBox.attrs.fontStyle + ' ' + optionBox.attrs.fontSize + 'pt ' + optionBox.attrs.fontFamily;	
	metrics = context.measureText(questions[num]);

	paddingLeft = (optionWidth - metrics.width)/2;

	optionBox.setPadding(paddingLeft, paddingTop);		

	var optionBoxCopy = new Kinetic.Text({
					x:0,
					y:0,
					stroke:"#777",
					fill:"#EAFAEE",
					text:questions[num],
					textFill: "#777",
					fontSize: fontSize,
					fontFamily: "Helvetica Neue",
					paddingLeft: paddingLeft,
					paddingTop:paddingTop,
					strokeWidth: 2,
					draggable:false,
					align: "left",
					verticalAlign: "top"
				});

	optionBoxCopy.width = containerWidth;
	optionBoxCopy.height = containerHeight; 
	optionBoxCopy.name = optionBoxName + "copy";
	optionBoxCopy.owner = containerBoxNameMap[layer.name +"l," +(questions.length + num +1)+"b"];
	addEventQuestionBox(layer, optionBox, startX);
	optionBoxes.push(optionBox);
	addOptionBoxtoLayer(layer, optionBox, optionBoxCopy, startX, optionGroup);
	}
}


/*
* function to paint the answer palceholder lines
*/

function paintAnswerPlaceHolder(layer, questions, startX, optionGroup){
	var width = optionWidth - optionHeight;
	var vMargin = (containerHeight - optionHeight)/2;
	var hMargin = (containerWidth - optionWidth)/2;
	for(var num=0;num<questions.length;num++) {
		var placeHolder = new Kinetic.Shape({
			drawFunc: function(){
				var context = this.getContext();
				context.moveTo(hMargin + (optionHeight/2), vMargin + optionHeight);

				context.lineTo((optionHeight/2) + width + hMargin, vMargin + optionHeight);
				context.stroke();
			},
			stroke: "#339900",
			width:containerWidth,
			height:containerHeight,
			strokeWidth: 2,
			listening:false
		});

		placeHolder.width = containerWidth;
		placeHolder.height = containerHeight;

		if(layer.usedX + placeHolder.width > canvasWidth) {
		// adding box to the New Level

			maxUsedX = layer.usedX;
			layer.usedX = startX;
			layer.usedY = layer.usedY + placeHolder.height;
			placeHolder.attrs.x = layer.usedX;
			placeHolder.attrs.y = layer.usedY;
			layer.usedX = startX + placeHolder.width;
		} else {
		// adding box to the Same Level
			placeHolder.attrs.x = layer.usedX;
			placeHolder.attrs.y = layer.usedY;
			layer.usedX= layer.usedX+placeHolder.width;

		}
		optionGroup.add(placeHolder);

	}
}


/*
* function to add handlers on dragend event of the options
*/

function addEventQuestionBox(layer, box, startX) {

	var stage = layer.getStage();

	if(box.attrs.draggable==true) {
		box.on("dragstart",function(){

		isDraggableElement = true;
		});

		box.on("dragend", function() {
					isDraggableElement = false;
					marginLeft = (containerWidth - optionWidth)/2; 
					marginTop = (containerHeight - optionHeight)/2;


					if(this.attrs.y > containersMidY+(box.height/2)) {

						resetBox(layer, this);
					} else {
						var container = findContainer(layer, box, startX);

						if(container == undefined ){
							resetBox(layer, this);
							return;
						}

						if(parseInt(container.name.substr(3,1)) > (questions[parseInt(container.name.substr(0,1))].options.length)){

							resetBox(layer, this);
							return;
						}
						if(container.empty==true) {
							container.empty=false;
							container.child=this;
							if(this.owner!=null) {
								this.owner.empty=true;
							}
							this.owner=container;


							this.transitionTo({
									rotation: 0,
									x: container.attrs.x + marginLeft,
									y: container.attrs.y + marginTop,
									alpha: 3,
									duration:.25
							});
							container=null;
						} else {
							resetBox(layer, this);
						}
					}
				}

			);
	}
}



/*
* function to find the container to which the option should be 
* moved when it is dropped somewhere.
*/

function findContainer(layer, box, startX){
	var layerName = layer.name;

	var boxInWidth = boxesInWidth(layer, box, startX);

	// Need to add box.attrs.height in layer.usedY to make for the last row.
	var boxInHeight = boxesInHeight(layer, box);

	var containerNumberX = boxInWidth - Math.round((layer.usedX - box.attrs.x)/box.width)+1;
	var containerNumberY = boxInHeight - Math.round(((layer.usedY+box.height) - box.attrs.y)/box.height)+1;
	var containerName = Math.round(boxInWidth*(containerNumberY - 1)+containerNumberX)+ "";

	var container = containerBoxNameMap[layerName +"l,"+containerName+"b"];
	return container;
}

function boxesInHeight(layer, box) {
	return ((layer.usedY+box.height)/box.height);
}

function boxesInWidth(layer, box, startX) {

	return ((layer.usedX-startX)/box.width);
}



/*
* function to reset the option box to its initial position
*/

function resetBox(layer, box) {

	var defaultContainer = containerBoxNameMap[layer.name + "l,"+(questions[parseInt(layer.name)].options.length + parseInt(box.name)) + "b"]; 

	if(box.owner.name != defaultContainer.name){

		box.owner.empty = true;
		box.owner  = defaultContainer;
	}

	box.transitionTo({
		x: box.startX,
		y: box.startY,
		alpha: 3,
		duration: .5
	});
}



/*
* function to add draggable optionBoxes and background 
* non-draggable copies of these optionBoxes to a layer.
*/
function addOptionBoxtoLayer(layer, optionBox, optionBoxCopy , startX, optionGroup) {
	marginLeft = (containerWidth - optionWidth)/2; 
	marginTop = (containerHeight - optionHeight)/2


	if(layer.usedX + optionBox.width > canvasWidth) {
	// adding optionBox to the New Level
		maxUsedX = layer.usedX;
		layer.usedX = startX;
		layer.usedY = layer.usedY + optionBox.height;

		optionBox.setPosition(layer.usedX + marginLeft, layer.usedY + marginTop);
		optionBoxCopy.setPosition(layer.usedX + marginLeft, layer.usedY + marginTop);
		layer.usedX = startX + optionBox.width;
	} else {
	// adding optionBox to the Same Level
		optionBox.setPosition(layer.usedX + marginLeft, layer.usedY + marginTop);
		optionBoxCopy.setPosition(layer.usedX + marginLeft, layer.usedY + marginTop);
		layer.usedX= layer.usedX+optionBox.width;

	}
	optionBox.startX = optionBox.attrs.x;
	optionBox.startY = optionBox.attrs.y;
	optionGroup.add(optionBoxCopy);
	optionGroup.add(optionBox);
	return optionBox;
}


/*
* function to move a layer to top of all layers
* @params layerNum - index of ther layer to be moved
*/

function showLayer(layerNum) {
		layers[layerNum].moveToTop();
}