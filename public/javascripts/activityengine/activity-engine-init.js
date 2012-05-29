ActivityEngineInit = new function() {

    this.init = function() {
        // Handler for .ready() called.
        container = Container.GlobalObject;
        activity = AnimationActivity.GlobalObject;
        container.initialize(activity);
        window.addEventListener('resize', function (){
                container.resize(activity); },
            false);
        var navParent = document.getElementById("navParent");
        if(navParent != null && navParent.children== undefined){
            container.addListenerToButtons(activity, navParent.children);
        }
        $(".btn-prev").click(function (){
                container.showPrevious(); }
        );
        $(".btn-next").click(function (){
                container.showNext(); }
        );
    }


};