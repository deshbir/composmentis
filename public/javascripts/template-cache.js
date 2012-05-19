TemplateCache = new function() {
	
	this.templateManager = {
		templates: {},
		get: function(id, callback){
			var template = this.templates[id];
			if (template) {
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
		}
	}
	
};



