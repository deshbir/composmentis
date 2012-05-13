$(document).ready(function () {

    var IndexView = Backbone.View.extend({

        //template:_.template($('#index-template').html()),

        initialize:function () {
            this.render();
        },

        render:function () {

            $.ajax({
                url: "ngldemo/index",

                success:function(data) {
                    $("#backbone_container").html( data );
                }
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

             $.ajax({
                 url: "ngldemo/login",

                 success:function(data) {
                    $("#backbone_container").html( data );
                 }
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

            $.ajax({
                url: "ngldemo/home",

                success:function(data) {
                    $("#backbone_container").html( data );
                }
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

            $.ajax({
                url: "ngldemo/launch_activity",

                success:function(data) {
                    $("#backbone_container").html( data );
                }
            });

            //$("#container").html(this.template);
        }

    });

    var AppRouter = Backbone.Router.extend({
        routes:{
            "index":"Index",
            "login":"Login",
            "home":"Home",
            "launch_activity":"Launch_Activity"
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
    var indexView = new IndexView();
    Backbone.history.start();


});