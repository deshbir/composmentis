ActivityEngineInit = new function() {

    this.init = function() {
        // Handler for .ready() called.
        initialize();
        window.addEventListener('resize', onResize, false);
        var navParent = document.getElementById("navParent");
        if(navParent != null && navParent.children== undefined){
            addListenerToButtons(navParent.children);
        }
    }

};