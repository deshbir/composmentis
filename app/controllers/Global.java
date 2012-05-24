package controllers;

import play.*;
import play.classloading.ApplicationClasses;
import play.i18n.Lang;
import play.mvc.*;

import java.util.*;

import models.*;

public class Global extends Controller {

    @Before
    static void globalBeforeInterceptor() {
        //Basic Auth
        /*
        String password = request.password;
        if ( password == null ) {
            unauthorized( "Compro Technologies DEMO site" );
        }
        else if (!password.equalsIgnoreCase("play"))
        {
            unauthorized( "Compro Technologies DEMO site" );
        }
        */

        //Get Language Selections from Request & Cookie
        String lang_from_request = request.params.get("lang");
        Http.Cookie lang_from_cookie = request.cookies.get("lang");

        if(lang_from_request != null)  {
            //User has specifically requested a language change
            Lang.set(lang_from_request);

            //Update the cookie (if its not the same value)
            if(lang_from_cookie != null && !lang_from_cookie.value.equalsIgnoreCase(lang_from_request))
            {
                response.setCookie("lang", lang_from_request);
            }

            if(lang_from_cookie == null)
            {
                response.setCookie("lang", lang_from_request);
            }
        }
        else
        {
            //Set the last language selected by the user (cookie)
            if(lang_from_cookie!=null && !lang_from_cookie.value.equalsIgnoreCase(lang_from_request))    {
                Lang.set(lang_from_cookie.value);
            }
        }


        //Setup Application delivery mode & theme
        //Check the default from configuration

        String delivery_mode_from_config = Play.configuration.getProperty("application.delivery");
        String theme_from_config = Play.configuration.getProperty("application.theme");

        //Set the Flash scope for delivery mode based on the configuration
        if(delivery_mode_from_config != null)
        {
            flash.put("application.delivery", delivery_mode_from_config);
        }

        //Set the Flash scope for theme based on the configuration
        if(theme_from_config != null)
        {
            flash.put("application.theme", theme_from_config);
        }


        String current_url = request.url;

        /*Possible URL styles
        /ngldemo/<theme>/<delivery-mode>/home
        /ngldemo/<theme>/<delivery-mode>/index

        Possible themes
        "ngconnect"
        "myelt"
        "ourworld"

        Possible delivery modes
        "traditional"
        "singlepage"
        "offline"

        */

        if( params.get("theme")!=null)  {
            flash.put("application.theme", params.get("theme"));
        }

        if (params.get("deliverymode")!= null)    {
            flash.put("application.delivery", params.get("deliverymode"));
        }




    }


}
