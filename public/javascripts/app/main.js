$(document).ready(function () {

    var NGLBaseView = Backbone.View.extend({

        initialize:function (theme, deliverymode) {
            this.render(theme, deliverymode);
        },

        buildUri:function(controller, theme, deliverymode, action) {

            var serverUri;

            if( typeof theme == 'undefined' || typeof deliverymode == 'undefined') {
                serverUri = controller + '/' + action;
            }
            else    {
                serverUri = controller + '/' + theme + '/' + deliverymode + '/' + action;
            }

            return serverUri ;
        },

        defaultRender:function (controller, theme, deliverymode, action) {
            var serverUri = this.buildUri(controller, theme, deliverymode, action);
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
        render:function (theme, deliverymode) {
            this.defaultRender('ngldemo', theme, deliverymode, 'index');
        }
    });

    var LoginView = NGLBaseView.extend({
        render:function (theme, deliverymode) {
            this.defaultRender('ngldemo', theme, deliverymode, 'login');
        }
    });

    var AuthenticateView = NGLBaseView.extend({
        render:function (theme, deliverymode) {
            var username;
            username= $(".loginform #username").val();
            this.defaultRender('ngldemo', theme, deliverymode, 'authenticate?username=' + username);
        }
    });

    var LogoutView = NGLBaseView.extend({
        render:function (theme, deliverymode) {
            this.defaultRender('ngldemo', theme, deliverymode, 'logout');
        }
    });


    var SplashView = NGLBaseView.extend({
        render:function (theme, deliverymode) {
            this.defaultRender('ngldemo', theme, deliverymode, 'splash');
        }
    });

    var HomeView = NGLBaseView.extend({
        render:function (theme, deliverymode) {
            this.defaultRender('ngldemo', theme, deliverymode, 'home');
        }
    });

    var ActivityView = NGLBaseView.extend({

        render:function (theme, deliverymode) {

            this.defaultRender('ngldemo', theme, deliverymode, 'activity');

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
        routes:{
            "ngldemo/index":"Index",
            "ngldemo/:theme/:deliverymode/index":"Index",
            "ngldemo/login":"Login",
            "ngldemo/:theme/:deliverymode/login":"Login",
            "ngldemo/authenticate":"Authenticate",
            "ngldemo/:theme/:deliverymode/authenticate":"Authenticate",
            "ngldemo/logout":"Logout",
            "ngldemo/:theme/:deliverymode/logout":"Logout",
            "ngldemo/home":"Home",
            "ngldemo/:theme/:deliverymode/home":"Home",
            "ngldemo/activity":"Activity",
            "ngldemo/:theme/:deliverymode/activity":"Activity",
            "ngldemo/splash":"Splash",
            "ngldemo/:theme/:deliverymode/splash":"Splash"
        },

        Index:function (theme, deliverymode) {
            indexView = new IndexView(theme, deliverymode);

        },

        Home:function (theme, deliverymode) {
            homeView = new HomeView(theme, deliverymode);

        },

        Login:function (theme, deliverymode) {
            loginView = new LoginView(theme, deliverymode);

        },

        Authenticate:function (theme, deliverymode) {
            authenticateView = new AuthenticateView(theme, deliverymode);

        },

        Logout:function (theme, deliverymode) {
            loginView = new LogoutView(theme, deliverymode);

        },

        Activity:function (theme, deliverymode) {
            activityView = new ActivityView(theme, deliverymode);

        },

        Splash:function (theme, deliverymode) {
            splashView = new SplashView(theme, deliverymode);

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