/*
 *Prototyping new Properties to Kinetic JS Objects
 */

    Kinetic.Layer.prototype.name="";
    Kinetic.Layer.prototype.usedX=0;
    Kinetic.Layer.prototype.usedY=0;

    Kinetic.Text.prototype.name="";
    Kinetic.Text.prototype.owner=null;
    Kinetic.Text.prototype.startX=0;
    Kinetic.Text.prototype.startY=30;


    Kinetic.Rect.prototype.name="";
    Kinetic.Rect.prototype.empty=true;
    Kinetic.Rect.prototype.child=true;
    Kinetic.Rect.prototype.startX=true;

    Kinetic.Group.prototype.width=0;
    Kinetic.Group.prototype.height=0;

    Kinetic.Shape.prototype.startX=0;
    Kinetic.Shape.prototype.width=0;
    Kinetic.Shape.prototype.height=0;


    AnimationActivity = {};

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

        //currently tapped option
        activeBox : null,
        //true if target of touch event is a draggable object
        isDraggableElement : false,

        containerBoxNameMap : new Object(),
        layers : new Array(),
        correctLayer : null,
        incorrectLayer : null,
        stage : null,
        containerBoxes : new Array(),
        optionBoxes : new Array(),

        // Reading questions from XML file. "this.questions" is required as a global variable.
        questions : new Array(),
        startPos : 0,



        /*
         * The function to be called to start painting the Canvas
         */

        paint : function (language) {

            Kinetic.Stage.prototype.language = language;
            // calculating width of the container, based upon the number of questions.

            var containerParentWidth = document.getElementById("containerParent").offsetWidth;
            this.margin = (containerParentWidth-this.canvasWidth)*3/8;

            this.canvasWidth = this.canvasWidth + this.margin*2;


            // creating a different layer for each question
            for(var questionNum= 0; questionNum < this.questions.length; questionNum++){
                this.layers[questionNum] = new Kinetic.Layer();
                this.layers[questionNum].name=(questionNum)+"";
            }





            // creating this.stage to add different this.layers.
            this.stage = new Kinetic.Stage({
                container: 'containerDiv',
                width: this.canvasWidth,
                height:300
            });


            // paint all the this.questions in respective this.layers.
            this.paintActivity(this.questions, this.layers, this.maxOptions);
            //adding response layers(correct, incorrect images)
            this.addResponseLayers(this.stage);

            // bringing first question to top.
            this.layers[0].moveToTop();
            this.scrollCanvas();
        },

        /*
         *function to add the tick and cross images for correct and incorrect response
         */
        addResponseLayers : function(stage){

            var imageWidth = 80;
            var imageHeight = 80;
            //changing the dimensions of the response layers if they are already present i.e on resizing
            if(this.correctLayer !=null){
                this.correctLayer.children[0].setWidth(stage.getWidth());
                this.correctLayer.children[0].setHeight(stage.getHeight());
                this.incorrectLayer.children[0].setWidth(stage.getWidth());
                this.incorrectLayer.children[0].setHeight(stage.getHeight());


                // add the shape to the layer
                stage.add(this.correctLayer);
                this.correctLayer.moveToBottom();


                stage.add(this.incorrectLayer);
                this.incorrectLayer.moveToBottom();
                return;

            }
            //building the new layer if they are not already present
            else{
                var correctLayer = new Kinetic.Layer();
                var incorrectLayer = new Kinetic.Layer();
                var correctImage = new Image();
                correctImage.src = "../../../public/images/correct120by120.png";

                var incorrectImage = new Image();
                incorrectImage.src = "../../../public/images/incorrect120by120.png";

                var rect1 = new Kinetic.Rect({
                    x:0,
                    y:0,
                    width:stage.getWidth(),
                    height:stage.getHeight(),
                    fill:"rgb(232,232,232)",
                    alpha:0.5
                });
                correctLayer.add(rect1);
                var rect2 = new Kinetic.Rect({
                    x:0,
                    y:0,
                    width:stage.getWidth(),
                    height:stage.getHeight(),
                    fill:"rgb(232,232,232)",
                    alpha:0.5
                });
                incorrectLayer.add(rect2);

                correctImage.onload = function() {
                    var tickImage = new Kinetic.Image({
                        x: 0,//(stage.getWidth()/2 -imageWidth) ,
                        y: 0,//(stage.getHeight()/2 - imageHeight),
                        image: correctImage,
                        width: imageWidth,
                        height: imageHeight,
                        alpha: 1
                    });
                    correctLayer.add(tickImage);
                };


                incorrectImage.onload = function() {
                    var crossImage = new Kinetic.Image({
                        x: 0,//(stage.getWidth()/2 -imageWidth),
                        y: 0,//(stage.getHeight()/2 - imageHeight),
                        image: incorrectImage,
                        width: imageWidth,
                        height: imageHeight,
                        alpha: 1
                    });

                    incorrectLayer.add(crossImage);
                };


                // add the shape to the layer
                stage.add(correctLayer);
                correctLayer.moveToBottom();


                stage.add(incorrectLayer);
                incorrectLayer.moveToBottom();

                this.correctLayer = correctLayer;
                this.incorrectLayer = incorrectLayer;
            }
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

        onResize : function (currentQuestion, language)  {

            //save the old state before re-painting
            var oldContainers = this.containerBoxNameMap ;
            var oldOptionBoxes = this.optionBoxes ;

            this.reConfigure();
            this.containerBoxNameMap = new Object();
            this.optionBoxes = new Array();


            //margins between the hidden containers and draggable options
            marginLeft = (this.containerWidth)/2;
            marginTop = (this.containerHeight - this.optionHeight)/2;
            this.paint(language);

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
                    this.containerBoxNameMap [oldOptionBoxes[i].owner.name].child = this.optionBoxes[i];
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
            outerRectangle.moveToBottom();

            var outerMostRectangle =  new Kinetic.Rect({
                width: 0,
                height:0,
                fill:"white"
            });

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
                    //stroke: "#999900",
                    stroke: "#FFFFFF",
                    visible:true
                });



                questionBox.empty = true;
                questionBox.name = optionBoxName;
                this.addEventHandlers(questionBox);


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
         * function to add event handlers to container boxes to support
         * performing activity by tapping on boxes.
         */

        addEventHandlers : function(containerBox){
            var activity = this;
            marginLeft = (activity.containerWidth)/2;
            marginTop = (activity.containerHeight - activity.optionHeight)/2;
            containerBox.on("touchstart mousedown",function(){
                //if no box is tapped return
                if(activity.activeBox == null){
                    return;
                }
                activity.isDraggableElement = false;
                var container = this;
                var containerName = this.name;
                var containerNum = parseInt(containerName.substring(containerName.indexOf(",")+1,containerName.indexOf("b")));
                var questionNum = parseInt(containerName.substring(0,containerName.indexOf("l")));
                if(containerNum <= activity.questions[questionNum].options.length && container.empty == true){
                    //activity.activeBox.setStroke("#555");
                    activity.activeBox.transitionTo({
                        stroke:"#555",
                        strokeWidth : 2,
                        scale:{
                            x:1,
                            y:1
                        },
                        rotation: 0,
                        x: container.attrs.x + marginLeft,
                        y: container.attrs.y  + marginTop,
                        alpha: 1,
                        duration:.25
                    });
                    activity.activeBox.owner.empty = true;
                    activity.activeBox.owner = container;
                    container.child = activity.activeBox;
                    container.empty = false;

                    activity.activeBox = null;

                }
                else{
                    activity.resetBox(activity.layers[questionNum],activity.activeBox);
                }
            });

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
                box.on("touchstart mousedown",function(){
                    this.moveToTop();
                    activity.isDraggableElement = true;
                    if(activity.activeBox!=null){
                        if(activity.activeBox == this){
                            activity.resetBox(layer, this);
                            return;
                        }
                        else{
                            activity.removeHighlight(activity.activeBox);
                        }
                    }
                    activity.highlightBox(this);

                });

                //change cursor style on the boxes
                box.on("mouseover",function(){

                    document.body.style.cursor = "pointer";
                });
                box.on("mousedown",function(){
                    this.moveToTop();
                });

                box.on("mouseout",function(){

                    document.body.style.cursor = "default";
                });

                box.on("dragend", function() {
                        activity.removeHighlight(this);
                        activity.isDraggableElement = false;
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
                                alpha: 1,
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
         * function to highlight the draggable box
         */
        highlightBox : function (box){
            var activity = this;
            //this.attrs.stroke = "red";
            activity.activeBox = box;
            box.setStroke("red");
            //box.setStrokeWidth(3);
            box.transitionTo({
                strokeWidth:3,
                duration:0.01
            });
        },

        /*
         * function to highlight the draggable box
         */
        removeHighlight : function(box){
            var activity = this;
            activity.activeBox = null;
            box.setStroke("#555");
            //box.setStrokeWidth(3);
            box.transitionTo({
                strokeWidth:2,
                duration:0.01
            });

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
            activity.removeHighlight(box);

            var defaultContainer = this.containerBoxNameMap[layer.name + "l,"+(this.questions[parseInt(layer.name)].options.length + parseInt(box.name)) + "b"];

            if(box.owner.name != defaultContainer.name){

                box.owner.empty = true;
                box.owner  = defaultContainer;
            }
            box.setStroke("#555");
            box.setStrokeWidth(2);
            box.transitionTo({
                scale:{
                    x:1,
                    y:1
                },
                x: box.startX,
                y: box.startY,
                alpha: 1,
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

            //this.layers[this.layers.length-1].moveToTop();
        },

        /*
         * function to scroll on canvas (without flick)
         */

        scrollCanvas : function (){
            var activity = this;
            var div = document.getElementById('containerDiv');

            div.ontouchstart = function(e){
                //alert(e.screenY);
                this.startPos = e.changedTouches[0].pageY;
                document.getElementById('containerDiv').ontouchmove =  function(e){

                    if( activity.isDraggableElement){
                        return;
                    }

                    //window.scrollTo(0, this.startPos - e.pageY+window.pageYOffset);
                    window.scrollTo(0, this.startPos - e.changedTouches[0].pageY+window.pageYOffset);
                    //alert(this.startPos + "%" + e.changedTouches[0].pageY + "%" + window.pageYOffset);
                };

            };

            document.ontouchend = function(){

                document.getElementById('containerDiv').ontouchmove = null;
            };
        },

        displayQuestion : function(layerNum) {
            //this.questions[layerNum].isAttempted = true;

            this.stage.setSize(this.canvasWidth, this.layers[layerNum].usedY + this.containerHeight+2);
            document.getElementById("containerDiv").style.height = (this.layers[layerNum].usedY+this.containerHeight+2)+"px";
            document.getElementById("containerDiv").style.width = this.canvasWidth+"px";
            this.showLayer(layerNum);
        },

        animate : function(isCorrect) {
            var imageLayer = this.incorrectLayer;
            if (isCorrect) {
                imageLayer = this.correctLayer;
            }
            imageLayer.moveToTop();


            var image = imageLayer.children[1];
            image.attrs.x=0;
            image.attrs.y=0;
            image.transitionTo({
                x:(this.stage.getWidth()-image.attrs.width)/2,
                y:(this.stage.getHeight()-image.attrs.height)/2,
                duration: 0.5,
                easing: "ease-out"
            });



        }

    };

    function Question() {
        blankCount =0;
        options =null;
        answers =null;
        isVisited =false;
        isAttempted = false;
        isCorrect = false;
    }

    Container = {};

    Container.GlobalObject = {

        currentQuestion : 0,
        activity : null,


        initialize : function(activity, language) {
            //console.log("Under initialize");

            this.activity = activity;
            //this.activity.questions = this.readQuestionsFromXml("sample_dndfs.xml");
            this.activity.questions = this.parseQuestionsFromJson(new Input.Json());
            this.activity.maxOptions = this.getMaxOptions(this.activity.questions);
            this.activity.canvasWidth = this.getContainerWidth(activity, activity.maxOptions);
            this.activity.paint(language);

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
            $.ajax({
                type: "GET",
                url: "../../public/content/" + fileName,
                dataType: "xml",
                success: function(xml) {
                    $(xml).find("questionset").each(function(){
                        var question= new Question();
                        question.blankCount = $(this).find("question").find("content").text();

                        var options = new Array();
                        $(this).find("option").each(function(){
                            options.push($(this).find("content").text());
                        });
                        question.options = options;

                        var answers = new Array();
                        $(this).find("answer").each(function(){
                            answers.push($(this).find("content").text());
                        });
                        question.answers = answers;
                        questions.push(question);



                    });

                },
                async:false
            });


            return questions;
        },



        parseQuestionsFromJson :function(jsonObject)  {
            var questions = new Array();
            var questionSetArray = jsonObject.activity.questionsets.questionset;

            for(var questionNum = 0; questionNum<questionSetArray.length; questionNum++) {
                var question= new Question();

                question.blankCount = questionSetArray[questionNum].question.content.text;

                var options = new Array();
                for(var optionNum = 0; optionNum<questionSetArray[questionNum].options.option.length; optionNum++) {
                    options.push(questionSetArray[questionNum].options.option[optionNum].content.text);
                }
                question.options = options;

                var answers = new Array();
                for(var answersNum = 0; answersNum<questionSetArray[questionNum].answers.answer.length; answersNum++) {
                    answers.push(questionSetArray[questionNum].answers.answer[answersNum].content.text);

                }
                question.answers = answers;

                questions.push(question);
            }
            return questions;
        },

        changeLanguage : function(languageParam)  {
            this.activity.language = languageParam;
        },

        showNext : function (){
            if(this.currentQuestion < this.activity.questions.length-1){
                this.currentQuestion = this.currentQuestion+1;

                this.activity.displayQuestion(this.currentQuestion);
                this.showResult();

            } else {
                return;
            }
        },

        showPrevious : function (){
            if(this.currentQuestion > 0){
                this.currentQuestion = this.currentQuestion-1;
                this.activity.displayQuestion(this.currentQuestion);
                this.showResult();
            }
            else
                return;
        },

        resize : function(activity, language)  {

            this.activity.canvasWidth = this.getContainerWidth(this.activity, activity.maxOptions);

            this.activity.onResize(this.currentQuestion, language);
            this.showResult();

        },

        /*
         * function to retake a single question
         */
        restartActivity : function () {
            this.activity.layers[this.currentQuestion].moveToTop();
            this.activity.questions[this.currentQuestion].isCorrect = false;
            this.activity.questions[this.currentQuestion].isAttempted = false;
            var boxCount = 0;
            for (var questionNum = 0; questionNum < this.currentQuestion; questionNum++){
                boxCount += this.activity.questions[questionNum].options.length;
            }

            for(var i = boxCount ; i < boxCount + this.activity.questions[this.currentQuestion].options.length; i++){
                this.activity.optionBoxes[i].owner.empty =true;

                this.activity.optionBoxes[i].owner.child = null;
                //this.activity.optionBoxes[i].owner = null;
                this.activity.optionBoxes[i].owner = this.activity.containerBoxNameMap[this.currentQuestion +"l," +(this.activity.questions[this.currentQuestion].options.length + i+1)+"b"];
                this.activity.optionBoxes[i].transitionTo({
                    rotation: 0,
                    x:  this.activity.optionBoxes[i].startX,
                    y:  this.activity.optionBoxes[i].startY,
                    duration:.01
                });
            }
        },

        validateAnswers : function() {
            // Validate all questions on submit
            // for(var qNum = 0; qNum < this.activity.questions.length; qNum++ ){
            var qNum = this.currentQuestion;
            var studentResponse = "";
            this.activity.questions[qNum].isAttempted=true;

            for(var oNum = 0; oNum < this.activity.questions[qNum].options.length; oNum++) {
                var optionBoxName = qNum+"l,"+(oNum+1)+"b";
                var box = this.activity.containerBoxNameMap[optionBoxName];
                if(box.empty == true) {
                    // if the option is left blank
                    this.activity.questions[qNum].isCorrect = false;
                    break;

                } else {
                    studentResponse = studentResponse +" "+ box.child.attrs.text;
                }
            }

            //move to next question if not attempted completely
            // Used for Validating all questions on submit
            /*if(studentResponse == ""){
             continue;
             }*/

            //replacing multiple spaces with single spaces if any
            studentResponse = studentResponse.replace( /  +/g, ' ' );
            studentResponse = studentResponse.replace(/^\s+|\s+$/g,"");

            for(var num = 0; num < this.activity.questions[qNum].answers.length; num++){

                //correct if true otherwise its incorrect by default
                if(studentResponse == this.activity.questions[qNum].answers[num]){
                    this.activity.questions[qNum].isCorrect = true;
                    break;
                }
            }
            //}
            this.showResult();
        },

        showResult : function() {
            if(this.activity.questions[this.currentQuestion].isAttempted == true) {
                var imageLayer = this.activity.incorrectLayer;
                if(this.activity.questions[this.currentQuestion].isCorrect == true) {
                    this.activity.animate(true);
                } else {
                    this.activity.animate(false);
                }
            } else {
                // else if not Attempted

            }
        }


    }



    var Input = {};

    Input.Json = function () {
        return {
            "activity": {
                "-templateid": "DNDFS",
                "-defaultscore": "1",
                "-generatorid": "PageSeeder",
                "directions": {
                    "content": {
                        "type": "text",
                        "tag": "directions",
                        "cdata-section": "Drag the correct option from the set of <b>scrambled words</b> and drop that option from its default position into its correct slot in a predetermined screen area (the drop slots) to form a correct and meaningful sentence. Click Submit to check your answers."
                    }
                },
                "questionsets": {
                    "questionset": [
                        {
                            "question": {
                                "content": {
                                    "type": "number",
                                    "tag": "blankCount",
                                    "text": "6"
                                }
                            },
                            "options": {
                                "option": [
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "a watch"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "gives"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "her"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "Ahmed"
                                        }
                                    }
                                ]
                            },
                            "answers": {
                                "answer": [{
                                    "content": {
                                        "type": "text",
                                        "tag": "answerText",
                                        "text": "Ahmed gives her a watch"
                                    }
                                }]
                            }
                        },
                        {
                            "question": {
                                "content": {
                                    "type": "number",
                                    "tag": "blankCount",
                                    "text": "5"
                                }
                            },
                            "options": {
                                "option": [
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "Geeta plays"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "Raj plays"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "carrom"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "badminton"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "while"
                                        }
                                    }
                                ]
                            },
                            "answers": {
                                "answer": [
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "answerText",
                                            "text": "Raj plays badminton while Geeta plays carrom"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "answerText",
                                            "text": "Geeta plays badminton while Raj plays carrom"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "answerText",
                                            "text": "Raj plays carrom while Geeta plays badminton"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "answerText",
                                            "text": "Geeta plays carrom while Raj plays badminton"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "question": {
                                "content": {
                                    "type": "number",
                                    "tag": "blankCount",
                                    "text": "4"
                                }
                            },
                            "options": {
                                "option": [
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "a lot"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "calls"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "she"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "me"
                                        }
                                    }
                                ]
                            },
                            "answers": {
                                "answer": [{
                                    "content": {
                                        "type": "text",
                                        "tag": "answerText",
                                        "text": "she calls me a lot"
                                    }
                                }]
                            }
                        },
                        {
                            "question": {
                                "content": {
                                    "type": "number",
                                    "tag": "blankCount",
                                    "text": "4"
                                }
                            },
                            "options": {
                                "option": [
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "it"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "sent"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "I"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "to him"
                                        }
                                    }
                                ]
                            },
                            "answers": {
                                "answer": [{
                                    "content": {
                                        "type": "text",
                                        "tag": "answerText",
                                        "text": "I sent it to him"
                                    }
                                }]
                            }
                        },
                        {
                            "question": {
                                "content": {
                                    "type": "number",
                                    "tag": "blankCount",
                                    "text": "5"
                                }
                            },
                            "options": {
                                "option": [
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "a gift"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "gave"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "yesterday"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "him"
                                        }
                                    },
                                    {
                                        "content": {
                                            "type": "text",
                                            "tag": "optionText",
                                            "text": "she"
                                        }
                                    }
                                ]
                            },
                            "answers": {
                                "answer": [{
                                    "content": {
                                        "type": "text",
                                        "tag": "answerText",
                                        "text": "she gave him a gift yesterday"
                                    }
                                }]
                            }
                        }
                    ]
                }
            }
        }
    };