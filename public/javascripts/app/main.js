$(document).ready(function () {

    var IndexView = Backbone.View.extend({

        //template:_.template($('#index-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            TemplateCache.templateManager.get('ngldemo/index', function(template){
                $("#backbone_container").html( template );
            });

            //$("#container").html(this.template);
        }

    });

    var LoginView = Backbone.View.extend({

        //template:_.template($('#login-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            TemplateCache.templateManager.get('ngldemo/login', function(template){
                $("#backbone_container").html( template );
            });

            //$("#container").html(this.template);
        }

    });

    var HomeView = Backbone.View.extend({

        //template:_.template($('#login-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            TemplateCache.templateManager.get('ngldemo/home', function(template){
                $("#backbone_container").html( template );
            });

            //$("#container").html(this.template);
        }

    });

    var Launch_ActivityView = Backbone.View.extend({

        //template:_.template($('#login-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            TemplateCache.templateManager.get('ngldemo/launch_activity', function(template){
                $("#backbone_container").html( template );
            });

            $LAB.setOptions({AlwaysPreserveOrder:true})
                .script(['/public/javascripts/activityengine/kinetic-v3.9.3.js',
                         '/public/javascripts/activityengine/raf.js',
                         '/public/javascripts/activityengine/animate.js',
                         '/public/javascripts/activityengine/scroller.js',
                         '/public/javascripts/activityengine/easyScroller.js',
                         '/public/javascripts/activityengine/container.js',
                         '/public/javascripts/activityengine/activity.js',
                         '/public/javascripts/activityengine/activity-engine-init.js']).wait(function() {
                    ActivityEngineInit.init();
                });

            //$("#container").html(this.template);

        }

    });

    var AppRouter = Backbone.Router.extend({
        routes:{
            "ngldemo/index":"Index",
            "ngldemo/login":"Login",
            "ngldemo/home":"Home",
            "ngldemo/launch_activity":"Launch_Activity"
        },

        Index:function () {
            homeView = new IndexView();

        },

        Home:function () {
            homeView = new HomeView();

        },

        Login:function () {
            loginView = new LoginView();

        },

        Launch_Activity:function () {
            loginView = new Launch_ActivityView();

        }

    });

    var app_router = new AppRouter;
    Backbone.history.start();

    if(window.location.href.indexOf("#") == -1) {
        app_router.navigate("ngldemo/index",{trigger:true});
    }
});