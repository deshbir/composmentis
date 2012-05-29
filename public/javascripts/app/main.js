$(document).ready(function () {

    var NGLBaseView = Backbone.View.extend({

        initialize:function (theme, deliverymode, lang) {
            this.render(theme, deliverymode, lang);
        },

        buildUri:function(controller, theme, deliverymode, action, lang) {

            var serverUri;

            if( typeof theme == 'undefined' || typeof deliverymode == 'undefined') {
                serverUri = controller + '/' + action;
            }
            else    {
                serverUri = controller + '/' + theme + '/' + deliverymode + '/' + action;
            }

            if(typeof lang != 'undefined')  {
                serverUri = serverUri + '?lang=' + lang;
            }

            return serverUri ;
        },

        defaultBeforeRender:function(controller, theme, deliverymode, action, lang)
        {
            //Use this for global initializations - applicable to all views
            /* Initialize NGL Theme  - Index is assumed to be the home page*/
            if( typeof theme != 'undefined')  {

                $("body").removeClass("theme-myelt theme-ngconnect"); //Fix this function to be generic
                $("body").addClass("theme-" + theme);
            }
            /* End of theme setup */


            //Custom Initialization - specific to individual views
            if (jQuery.isFunction(this.beforeRender))  {
                this.beforeRender();
            }
        },

        defaultAfterRender:function(controller, theme, deliverymode, action, lang)
        {
            //Use this for global initializations - applicable to all views
            $('.dropdown-toggle').dropdown();
            //Custom Initialization - specific to individual views
            if (jQuery.isFunction(this.afterRender))  {
                this.afterRender();
            }
        },

        defaultRender:function (controller, theme, deliverymode, action, lang) {



            var serverUri = this.buildUri(controller, theme, deliverymode, action, lang);
            app_router.lastVisitedAction = action;
            app_router.lastVisitedController = controller;

            //Pre-View Load Initialization
            this.defaultBeforeRender(controller, theme, deliverymode, action, lang);

            var that = this;
            TemplateCache.templateManager.get(serverUri, function (template) {

                $('#backbone_container').fadeOut(0, function() {
                    $(this).html(template).fadeIn(400);
                });

                //Post-View Load Initializations
                that.defaultAfterRender(controller, theme, deliverymode, action, lang);

            });
        }
    });


    var IndexView = NGLBaseView.extend({

        render:function (theme, deliverymode, lang) {
            this.defaultRender('ngldemo', theme, deliverymode, 'index', lang);
        }
    });

    var LoginView = NGLBaseView.extend({
        render:function (theme, deliverymode, lang) {
            this.defaultRender('ngldemo', theme, deliverymode, 'login', lang);
        }
    });

    var AuthenticateView = NGLBaseView.extend({
        render:function (theme, deliverymode, lang) {
            var username;
            username= $(".loginform #username").val();
            this.defaultRender('ngldemo', theme, deliverymode, 'authenticate?username=' + username, lang);
        }
    });

    var LogoutView = NGLBaseView.extend({
        render:function (theme, deliverymode, lang) {
            this.defaultRender('ngldemo', theme, deliverymode, 'logout', lang);
        },
        afterRender:function (){
            TemplateCache.templateManager.clearOneTemplateCache('index');
        }
    });


    var SplashView = NGLBaseView.extend({
        render:function (theme, deliverymode, lang) {
            this.defaultRender('ngldemo', theme, deliverymode, 'splash', lang);
        }
    });

    var HomeView = NGLBaseView.extend({
        render:function (theme, deliverymode, lang) {
            this.defaultRender('ngldemo', theme, deliverymode, 'home', lang);
        }
    });

    var SwitchlanguageView = NGLBaseView.extend({

        render:function (theme, deliverymode, lang) {

            var serverUri;

            if( typeof theme == 'undefined' || typeof deliverymode == 'undefined') {
                serverUri = app_router.lastVisitedController + '/' + app_router.lastVisitedAction + '/' + lang;
            }
            else    {
                serverUri = app_router.lastVisitedController + '/' + theme + '/' + deliverymode + '/' + app_router.lastVisitedAction + '/' + lang;
            }

            TemplateCache.templateManager.clearTemplateCache();

            app_router.navigate(serverUri, {trigger: true, replace: true});

        }
    });

    var ActivityView = NGLBaseView.extend({

        render:function (theme, deliverymode, lang) {
            this.defaultRender('ngldemo', theme, deliverymode, 'activity', lang);
        },

        afterRender:function (){
        $LAB.setOptions({AlwaysPreserveOrder:true})
            .script(['/public/javascripts/activityengine/kinetic-v3.9.3.js',
            '/public/javascripts/activityengine/raf.js',
            '/public/javascripts/activityengine/animate.js',
            '/public/javascripts/activityengine/scroller.js',
            '/public/javascripts/activityengine/easyScroller.js',
            '/public/javascripts/activityengine/container.js',
            '/public/javascripts/activityengine/activity.js',
            '/public/javascripts/activityengine/activity-engine-init.js',
            '/public/javascripts/activityengine/bind-activity-controls.js']).wait(function () {
                ActivityEngineInit.init();
            });
        }
    });

    var AppRouter = Backbone.Router.extend({
        lastVisitedAction:null,
        lastVisitedController:null,
        routes:{
            "ngldemo/index":"Index",
            "ngldemo/:theme/:deliverymode/index":"Index",
            "ngldemo/:theme/:deliverymode/index/:lang":"Index",
            "ngldemo/login":"Login",
            "ngldemo/:theme/:deliverymode/login":"Login",
            "ngldemo/:theme/:deliverymode/login/:lang":"Login",
            "ngldemo/authenticate":"Authenticate",
            "ngldemo/:theme/:deliverymode/authenticate":"Authenticate",
            "ngldemo/:theme/:deliverymode/authenticate/:lang":"Authenticate",
            "ngldemo/logout":"Logout",
            "ngldemo/:theme/:deliverymode/logout":"Logout",
            "ngldemo/:theme/:deliverymode/logout/:lang":"Logout",
            "ngldemo/home":"Home",
            "ngldemo/:theme/:deliverymode/home/:lang":"Home",
            "ngldemo/:theme/:deliverymode/home":"Home",
            "ngldemo/activity":"Activity",
            "ngldemo/:theme/:deliverymode/activity":"Activity",
            "ngldemo/:theme/:deliverymode/activity/:lang":"Activity",
            "ngldemo/splash":"Splash",
            "ngldemo/:theme/:deliverymode/splash":"Splash",
            "ngldemo/language/:lang":"Switchlanguage",
            "ngldemo/:theme/:deliverymode/language/:lang":"Switchlanguage"
        },

        Switchlanguage:function (theme, deliverymode, lang) {
            switchlanguageView = new SwitchlanguageView(theme, deliverymode, lang);
        },

        Index:function (theme, deliverymode, lang) {
            indexView = new IndexView(theme, deliverymode, lang);

        },

        Home:function (theme, deliverymode, lang) {
            homeView = new HomeView(theme, deliverymode, lang);

        },

        Login:function (theme, deliverymode, lang) {
            loginView = new LoginView(theme, deliverymode, lang);

        },

        Authenticate:function (theme, deliverymode, lang) {
            authenticateView = new AuthenticateView(theme, deliverymode, lang);

        },

        Logout:function (theme, deliverymode, lang) {
            loginView = new LogoutView(theme, deliverymode, lang);

        },

        Activity:function (theme, deliverymode, lang) {
            activityView = new ActivityView(theme, deliverymode, lang);

        },

        Splash:function (theme, deliverymode, lang) {
            splashView = new SplashView(theme, deliverymode, lang);

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