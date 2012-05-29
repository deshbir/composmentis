TemplateCache = new function() {
	
	this.templateManager = {
		templates: {},
		get: function(id, callback){



			var template = this.templates[id];
			if (template) {
				callback(template);
           } else if (global_offline_mode){

                if (typeof id != 'undefined') {
                    id = id.split('?')[0]
                }

                var template = preloaderViews[id];
                callback(template);
			} else {
				var that = this;
				$.ajax({
				url: id,
				dataType: "html",
				async: false,
				success: function(template) {
						that.templates[id] = template;
						callback(template);
				}
			    });
			}
		},
        clearTemplateCache : function(){
            this.templates = {};
        },

        clearOneTemplateCache : function(name){
            var t = this.templates;
            for (var id in t) {
                if (id.indexOf(name) > -1) {
                   delete this.templates[id];
               }
            }
        }
    }

};



