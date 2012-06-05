    ActivityEngineInit = new function() {
        console.log('ActivityEngineInit');
        this.init = function(lang) {
            // Handler for .ready() called.
            container = Container.GlobalObject;
            activity = AnimationActivity.GlobalObject;
            container.initialize(activity, lang);
            window.addEventListener('resize', function (){
                    container.resize(activity, lang); },
                false);
            var navParent = document.getElementById("navParent");
            if(navParent != null && navParent.children== undefined){
                container.addListenerToButtons(activity, navParent.children);
            }
            $(".btn-prev").click(function (){
                container.showPrevious();
            });
            $(".btn-next").click(function (){
                container.showNext();
            });
            $(".btn-submit").click(function (){
                container.validateAnswers();
            });
            $(".btn-retake").click(function (){
                container.restartActivity();
            });
        }

    };