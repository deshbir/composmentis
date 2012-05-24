$(document).ready(function () {

    var IndexView = Backbone.View.extend({

        //template:_.template($('#index-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            TemplateCache.templateManager.get('ngldemo/index', function (template) {
                $("#backbone_container").html(template);
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

            TemplateCache.templateManager.get('ngldemo/login', function (template) {
                $("#backbone_container").html(template);
            });

            //$("#container").html(this.template);
        }

    });

    var SplashView = Backbone.View.extend({

        //template:_.template($('#login-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            TemplateCache.templateManager.get('ngldemo/splash', function (template) {
                $("#backbone_container").html(template);
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

            TemplateCache.templateManager.get('ngldemo/home', function (template) {
                $("#backbone_container").html(template);
            });

            //$("#container").html(this.template);
        }

    });

    var ActivityView = Backbone.View.extend({

        //template:_.template($('#login-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            TemplateCache.templateManager.get('ngldemo/activity', function (template) {
                $("#backbone_container").html(template);
            });

            $LAB.setOptions({AlwaysPreserveOrder:true})
                .script(['/public/javascripts/activityengine/kinetic-v3.9.3.js',
                '/public/javascripts/activityengine/raf.js',
                '/public/javascripts/activityengine/animate.js',
                '/public/javascripts/activityengine/scroller.js',
                '/public/javascripts/activityengine/easyScroller.js',
                '/public/javascripts/activityengine/container.js',
                '/public/javascripts/activityengine/activity.js',
                '/public/javascripts/activityengine/activity-engine-init.js']).wait(function () {
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
            "ngldemo/activity":"Activity",
            "ngldemo/splash":"Splash"
        },

        Index:function () {
            indexView = new IndexView();

        },

        Home:function () {
            homeView = new HomeView();

        },

        Login:function () {
            loginView = new LoginView();

        },

        Activity:function () {
            activityView = new ActivityView();

        },

        Splash:function () {
            splashView = new SplashView();

        }

    });

    var app_router = new AppRouter;
    Backbone.history.start();

    if (window.location.href.indexOf("#") == -1) {
        app_router.navigate("ngldemo/splash", {trigger:true});
    }

    $.ajaxSetup({
        global:true
    });

    $(document).ajaxStart(function () {
        $("#loadingIcon").show();
    }).ajaxStop(
        function () {
            $("#loadingIcon").hide();
        }).ajaxError(function (event, request, settings, error) {

            $("#error-modal .modal-body").html(request.responseText);
            $("#error-modal .error-status-code").html("Status code:" + request.status);
            $("#error-modal .error-message").html("Error Message:" + error);
            $("#error-modal .error-url").html("URL:" + settings.url);

            //launch error modal dialog such that it centers itself, and width is based on the content.
            $('#error-modal').modal({
                backdrop:true,
                keyboard:true
            }).css({
                    width:'auto',
                    'margin-left':function () {
                        return -($(this).width() / 2);
                    }
                });
            //app_router.navigate("ngldemo/login",{trigger:true});
            window.history.back();
        });

});