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

        defaultRender:function (controller, theme, deliverymode, action, lang) {

            /* Initialize NGL Theme  - Index is assumed to be the home page*/
            if( typeof theme != 'undefined')  {

                $("body").removeClass("theme-myelt theme-ngconnect"); //Fix this function to be generic
                $("body").addClass("theme-" + theme);
            }
            /* End of theme setup */


            var serverUri = this.buildUri(controller, theme, deliverymode, action, lang);
            app_router.lastVisitedAction = action;
            app_router.lastVisitedController = controller;
            TemplateCache.templateManager.get(serverUri, function (template) {

                $('#backbone_container').fadeOut(0, function() {
                    $(this).html(template).fadeIn(400);
                });
                //$("#backbone_container").html(template);
                //$("#backbone_container").css({ display:none});
                //$("#backbone_container").hide("slide", {}, 1000);

                                //$("#backbone_container").show("slide", { direction: "right" }, 1000);


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

            app_router.navigate(serverUri, {trigger: true, replace: true});

        }
    });

    var ActivityView = NGLBaseView.extend({

        render:function (theme, deliverymode, lang) {

            this.defaultRender('ngldemo', theme, deliverymode, 'activity', lang);

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