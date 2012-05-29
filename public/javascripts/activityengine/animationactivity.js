var AnimationActivity = {};

AnimationActivity.GlobalObject = {
	rowSpacing : 0,
	topRowSpacing : 20,

	margin : 0,
	reducedLayout : false,

	//width, height of hidden containers
	containerWidth : 120,
	containerHeight : 70,

	//width, height of draggable options
	optionWidth : 110,
	optionHeight : 40,

	canvasWidth : 0,
	maxUsedX:0,
	maxOptions:0,


	containerBoxNameMap : new Object(),
	layers : new Array(),
	stage : null,
	containerBoxes : new Array(),
	optionBoxes : new Array(),

	// Reading questions from XML file. "this.questions" is required as a global variable.
	questions : new Array(),
	startPos : 0,
	


/*
 * The function to be called to start painting the Canvas
 */

	paint : function () {


	    // Width of the activity is based upon the maximum options in any question.
	    


	    // calculating width of the container, based upon the number of this.questions.
		
	    var containerParentWidth = document.getElementById("containerParent").offsetWidth;
	    this.margin = (containerParentWidth-this.canvasWidth)*3/8;
		
	    this.canvasWidth = this.canvasWidth + this.margin*2;


	    // creating a different this.layers for each question
	    for(var questionNum= 0; questionNum < this.questions.length; questionNum++){
		this.layers[questionNum] = new Kinetic.Layer();
		this.layers[questionNum].name=(questionNum)+"";
	    }

	    // creating this.stage to add different this.layers.
	    this.stage = new Kinetic.Stage({
		container: 'containerDiv',
		width: this.canvasWidth,
	    });

	    // paint all the this.questions in respective this.layers.
	    this.paintActivity(this.questions, this.layers, this.maxOptions);

	    // bringing first question to top.
	    this.layers[0].moveToTop();
	    this.scrollCanvas();
	},


	enableScrolling : function () {
	    var body = document.body;
	    var scrollableDiv = document.createElement('div');
	    scrollableDiv.setAttribute('id',"scrollableDiv");

	    while (body.hasChildNodes()) {
		var node = body.lastChild;
		scrollableDiv.appendChild(node);
		// Don't know how that is working without ever removing the children from body node.
		//    	body.removeChild(node);
	    }
	    //scrollableDiv.setAttribute('data-scrollable','y');
	    body.appendChild(scrollableDiv);

	    var height = "height:"+window.innerHeight+"px";
	    document.body.setAttribute('style',height);
	},

/*
*/

	reConfigure : function () {
	    var  parent = document.getElementById("containerParent");
	    var  child = document.getElementById("containerDiv");

	    //activity container is first removed and then added again
	    parent.removeChild(child);
	    var containerDiv = document.createElement('div');
	    containerDiv.setAttribute('id','containerDiv');

	    parent.appendChild(containerDiv);
	    this.stage.clear();
	    this.stage = null;



	    //re-initialize global objects to their initial state

	//this.reducedLayout = false;
	    this.maxUsedX = 0;


	},


	/*
	 * function is called when browser window is resized.
	 *
	 * The activity is re-painted according to new available
	 * size and draggable option boxes are moved to their
	 * positions prior to resizing.
	 */

	onResize : function (currentQuestion)  {
		
	//save the old state before re-painting
	    var oldContainers = this.containerBoxNameMap ;
	    var oldOptionBoxes = this.optionBoxes ;

	    this.reConfigure();
	    this.containerBoxNameMap = new Object();
	    this.optionBoxes = new Array();


	//margins between the hidden containers and draggable options
	marginLeft = (this.containerWidth)/2;
	marginTop = (this.containerHeight - this.optionHeight)/2;
	    this.paint();

	    for(var i=0; i < oldOptionBoxes.length; i++ ){
		if(this.optionBoxes[i].owner.name != oldOptionBoxes[i].owner.name){

		    this.optionBoxes[i].transitionTo({
			rotation: 0,
			x: this.containerBoxNameMap [oldOptionBoxes[i].owner.name].attrs.x + marginLeft,
			y:  this.containerBoxNameMap [oldOptionBoxes[i].owner.name].attrs.y + marginTop,
			alpha: 1,
			duration:.01
		    });
		    this.optionBoxes[i].owner = this.containerBoxNameMap [oldOptionBoxes[i].owner.name];
		    this.containerBoxNameMap [oldOptionBoxes[i].owner.name].empty = false;
		}
	    }

	    this.displayQuestion(currentQuestion);
	},


/*
 * function to add the hidden container boxes to the respective this.layers
 * @params
 * layer - kinetic js layer to which the box is to be added
 * box - the container to be added
 * startX - the initial x-coordinate where the box is to be placed
 */

	addBoxtoLayer : function (layer, box, startX) {
	    if(layer.usedX + box.attrs.width > this.canvasWidth) {
		// adding box to the New Level

		this.maxUsedX = layer.usedX;
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
	},


/*
 * function to Paint the whole activity
 * @params
 * this.questions - the array of Question() to be painted
 * this.layers - array of Kinetic js this.layers
 * maxOptions - maximum number of options in a single question
 */

	paintActivity: function(questions, layers, maxOptions) {

	    var layerHeightMax = 0;
	    var layerWidthMax = 0;
	    for(var i = 0; i < questions.length ; i++){

	  if(!this.reducedLayout){
		layers[i].usedX += (maxOptions-questions[i].options.length)*this.containerWidth/2 + this.margin;
	    }else
	    {
		layers[i].usedX += this.margin;
	    }


		layers[i].usedY +=this.topRowSpacing;

		var question = this.paintQuestion(questions[i].options, layers[i]);

		if(layers[i].usedY > layerHeightMax ) {
		    layerHeightMax = layers[i].usedY;
		}

		if(layers[i].usedX > layerWidthMax ) {
		    layerWidthMax = layers[i].usedX;
		}


		layers[i].add(question);
		this.stage.add(layers[i]);
	    }
	    this.displayQuestion(0);
	},


/*
 * Function to paint a single question
 * @params
 * options - array of options from a question
 * layer - question is painted on this layer
 * @return -  a single painted Question as an Object
 */
	paintQuestion : function (options, layer){
	    var optionGroup = new Kinetic.Group({});
	    var usedX = layer.usedX;
	    this.paintContainerBox(layer, options, layer.usedX, optionGroup);

	    var outerRectangle =  new Kinetic.Rect({
		width: this.canvasWidth,
		height:layer.usedY + this.containerHeight + this.rowSpacing + this.topRowSpacing,
		fill:"white"
	    });

	    outerRectangle.setPosition(0, 0);
	    optionGroup.add(outerRectangle);

	    var outerMostRectangle =  new Kinetic.Rect({
		width: 0,
		height:0,
		fill:"white"
	    });

	    outerRectangle.setPosition(0, 0);
	    optionGroup.add(outerMostRectangle);

	    layer.usedY = this.topRowSpacing;
	    layer.usedX = usedX;
	    this.paintAnswerPlaceHolder(layer, options, layer.usedX, optionGroup);

	    //starting new level for answer options
	    layer.usedX = usedX;
	    layer.usedY = layer.usedY + this.containerHeight + this.rowSpacing;
	    this.paintOptionBox(layer, options, layer.usedX, optionGroup);
	    if(this.maxUsedX !=0){
		layer.usedX= this.maxUsedX;
	    }
	    return optionGroup;
	},


/*
 * Function to paint the containers for Answer Placeholders and draggable this.optionBoxes
 */

	paintContainerBox : function(layer, options, startX, optionGroup) {
	    var layerName = layer.name;
	    for(var num=0;num<options.length*2;num++) {
		var optionBoxName = layerName+"l,"+(num+1)+"b";
		var questionBox = new Kinetic.Rect({
		    width : this.containerWidth,
		    height: this.containerHeight,
		    fill: "#FFFFFF",
		    stroke: "#999900",
		    visible:false
		});

		questionBox.empty = true;
		questionBox.name = optionBoxName;

		//starting new level for the answer options
		if(num == options.length){
			layer.usedY = layer.usedY + this.containerHeight + this.rowSpacing ;
			layer.usedX = startX;
		}

		var containerBox = this.addBoxtoLayer(layer, questionBox, startX);
		this.containerBoxes.push(containerBox);
		optionGroup.add(containerBox);
		this.containerBoxNameMap[optionBoxName]=questionBox;
	    }
	},


/*
 * Function to paint the options
 */

	 paintOptionBox : function(layer, questions, startX, optionGroup) {
	    var width = this.optionWidth;
	    var fontSize = 14;
	    var paddingTop = (this.optionHeight - fontSize)/2;
	    var canvas = layer.getCanvas();
	    var context = canvas.getContext("2d");
	    var metrics = null;

	    for(var num=0;num<questions.length;num++) {
		var paddingLeft = 0;
		var optionBoxName = (num+1)+"";
		var optionBox = new Kinetic.Text({
		    x:this.containerWidth/2,
		    y:this.containerHeight/2,
		    stroke:"#555555",
		    fill:"white",
		    text:questions[num],
		    textFill: "black",
		    fontSize: fontSize,
		    fontFamily: "Helvetica Neue",
		    paddingLeft: paddingLeft,
		    strokeWidth: 2,
		    draggable:true,
		    align: "center",
		    dragBounds:{
			top: 0,
			left: this.optionWidth/2,
			right:this.stage.getWidth()-this.optionWidth/2
		    }
		});
		optionBox.width = this.containerWidth;
		optionBox.height = this.containerHeight;
		optionBox.name = optionBoxName;
		optionBox.owner = this.containerBoxNameMap[layer.name +"l," +(questions.length + num +1)+"b"];
		context.font = optionBox.attrs.fontStyle + ' ' + optionBox.attrs.fontSize + 'pt ' + optionBox.attrs.fontFamily;
		metrics = context.measureText(questions[num]);

		paddingLeft = (this.optionWidth - metrics.width)/2;

		optionBox.setPadding(paddingLeft, paddingTop);

		var optionBoxCopy = new Kinetic.Text({
		    x:0,
		    y:0,
		    stroke:"rgb(200,200,200)",
		    fill:"rgb(232,232,232)",
		    text:questions[num],
		    textFill: "#777",
		    fontSize: fontSize,
		    fontFamily: "Helvetica Neue",
		    paddingLeft: paddingLeft,
		    strokeWidth: 2,
		    draggable:false,
		    align: "center",
		    verticalAlign: "top"
		});

		optionBoxCopy.setPadding(paddingLeft, paddingTop);
		optionBoxCopy.width = this.containerWidth;
		optionBoxCopy.height = this.containerHeight;
		optionBoxCopy.name = optionBoxName + "copy";
		optionBoxCopy.owner = this.containerBoxNameMap[layer.name +"l," +(questions.length + num +1)+"b"];
		this.addEventQuestionBox(layer, optionBox, startX);
		this.optionBoxes.push(optionBox);
		this.addOptionBoxtoLayer(layer, optionBox, optionBoxCopy, startX, optionGroup);
	    }
	},


	/*
	 * function to paint the answer palceholder lines
	 */

	paintAnswerPlaceHolder : function (layer, options, startX, optionGroup){
	    var width = this.optionWidth*0.8;
	    var vMargin = (this.containerHeight - this.optionHeight)/2;
	    var hMargin = this.optionWidth*0.1;
	    var optionNum;
	    for(var num=0;num<options.length;num++) {
		//add option numbers if all options are not in a single row
		if(this.reducedLayout){
			optionNum = num+1;
		}
		else {
			optionNum = "";
		}


		var placeHolder = new Kinetic.Shape({
			drawFunc: function(){
				var context = this.getContext();
				context.strokeStyle = "black";
				context.lineWidth = 2;
				context.fillText(this.attrs.name, hMargin, vMargin + AnimationActivity.GlobalObject.optionHeight+10);
				context.moveTo(hMargin, vMargin + AnimationActivity.GlobalObject.optionHeight);
				context.lineTo(width + hMargin, vMargin + AnimationActivity.GlobalObject.optionHeight);
				context.stroke();
			},
			stroke: "#339900",
			width:AnimationActivity.GlobalObject.containerWidth,
			height:AnimationActivity.GlobalObject.containerHeight,
			strokeWidth: 2,
			listening:false,
			name:optionNum
			});

		placeHolder.width = this.containerWidth;
		placeHolder.height = this.containerHeight;

		if(layer.usedX + placeHolder.width > this.canvasWidth) {
		    // adding box to the New Level

		    this.maxUsedX = layer.usedX;
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
	},


/*
 * function to add handlers on dragend event of the options
 */

	addEventQuestionBox : function (layer, box, startX) {
		var activity = this;
		var stage = this.stage;	

	    if(box.attrs.draggable==true) {
		box.on("touchstart",function(){

		    isDraggableElement = true;
		});

		//change cursor style on the boxes
		 box.on("mouseover",function(){

			document.body.style.cursor = "pointer";
		});
		  box.on("mouseout",function(){

			document.body.style.cursor = "default";
		});

		box.on("dragend", function() {
			isDraggableElement = false;
			marginLeft = (activity.containerWidth)/2;
			marginTop = (activity.containerHeight - activity.optionHeight)/2;



			var container = activity.findContainer(layer, box, startX);

			if(container == undefined || container == null ){
			    activity.resetBox(layer, this);
			    return;
			}
			var containerName = container.name;
			var containerNumber = parseInt(containerName.substring(containerName.indexOf(",")+1,containerName.indexOf("b")));
			var questionNum = parseInt(containerName.substring(0,containerName.indexOf("l")));
			if( containerNumber > (activity.questions[questionNum].options.length)){

			    activity.resetBox(layer, this);
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
			    activity.resetBox(layer, this);
			}

		    }

		);
	    }
	},



/*
 * function to find the container to which the option should be
 * moved when it is dropped somewhere.
 */

	findContainer : function (layer, box, startX){
	    var layerName = layer.name;

	    var boxInWidth = this.boxesInWidth(layer, box, startX);

	    // Need to add box.attrs.height in layer.usedY to make for the last row.

	    var containerNumberX = boxInWidth - Math.round((layer.usedX - box.attrs.x + box.width/2)/box.width)+1;
	    var containerNumberY = Math.ceil((box.attrs.y - this.topRowSpacing + (this.optionHeight)/2)/box.height);
	    if(containerNumberX<1 || containerNumberY < 1){
		return null;
	    }
	    var containerName = Math.round(boxInWidth*(containerNumberY - 1)+containerNumberX)+ "";

	    var container = this.containerBoxNameMap[layerName +"l,"+containerName+"b"];
	    return container;
	},


	boxesInWidth : function (layer, box, startX) {

	    return ((layer.usedX-startX)/box.width);
	},



/*
 * function to reset the option box to its initial position
 */

	resetBox : function (layer, box) {

	    var defaultContainer = this.containerBoxNameMap[layer.name + "l,"+(this.questions[parseInt(layer.name)].options.length + parseInt(box.name)) + "b"];

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
	},



/*
 * function to add draggable this.optionBoxes and background
 * non-draggable copies of these this.optionBoxes to a layer.
 */
	addOptionBoxtoLayer : function (layer, optionBox, optionBoxCopy , startX, optionGroup) {
	    marginLeft = (this.containerWidth)/2;
	    marginTop = (this.containerHeight - this.optionHeight)/2


	    if(layer.usedX + optionBox.width > this.canvasWidth) {
		// adding optionBox to the New Level
		this.maxUsedX = layer.usedX;
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
	},


/*
 * function to move a layer to top of all this.layers
 * @params layerNum - index of ther layer to be moved
 */

	showLayer : function (layerNum) {
	    this.layers[layerNum].moveToTop();
	},

/*
 * function to scroll on canvas (without flick)
 */

	scrollCanvas : function (){
	    var div = document.getElementById('containerDiv');

	    div.ontouchstart = function(e){

		if(isDraggableElement){
		    return;
		}
		this.startPos = e.pageY;
		document.getElementById('containerDiv').ontouchmove =  function(e){
		    window.scrollTo(0, this.startPos - e.pageY+window.pageYOffset);

		};
	    };

	    document.ontouchend = function(){

		document.getElementById('containerDiv').ontouchmove = null;
	    };
	},

	restartActivity : function () {
		reConfigure();
		paint();
	},
	
	displayQuestion : function(layerNum) {
	    this.stage.setSize(this.canvasWidth, this.layers[layerNum].usedY + this.containerHeight+2);
	    document.getElementById("containerDiv").style.height = (this.layers[layerNum].usedY+this.containerHeight+2)+"px";
	    document.getElementById("containerDiv").style.width = this.canvasWidth+"px";
	    this.showLayer(layerNum);
	}	

};

function Question() {
    blankCount =0;
    options =null;
    answers =null,
    isVisited =false;
    isAttemptCorrect = false;
}

