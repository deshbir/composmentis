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
        else if (!password.equalsIgnoreCase("ngl2012"))
        {
            unauthorized( "Compro Technologies DEMO site" );
        }*/


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

    /*
     Custom View Renderer to handle theme and delivery mode variations.
     */
    static void renderX(Object... args) {

        String defaultTemplate = template();

        if(defaultTemplate == null)
        {
            /* This shouldn't be happening. But if it does, lets default */
            render();
            //EXIT
        }
        else
        {
            renderTemplateX(defaultTemplate, args);

        }
    }

    static void redirectX(String controller, String action) {

        String appTheme = flash.get("application.theme");
        String appDeliveryMode = flash.get("application.delivery");

        String url = "/" + controller + "/" + appTheme + "/" +   appDeliveryMode + "/" + action;

        redirect(url);
    }

    static void renderTemplateX(String templateName, Object... args) {

        String appTheme = flash.get("application.theme");
        String appDeliveryMode = flash.get("application.delivery");

        int locSepViewHtml = templateName.lastIndexOf('/');

        if( locSepViewHtml > 0)
        {
            String part1 = templateName.substring(0, locSepViewHtml);
            String part2 = templateName.substring(locSepViewHtml+1, templateName.length());

            //check if a "theme" override exists.

            String candidateOverrideView = part1 + "/" + appTheme + "/" + part2;
            if(templateExists(candidateOverrideView))   {
                //Logger.info("Overriding View - " + candidateOverrideView);
                renderTemplate(candidateOverrideView, args);
            }
            else    {
                renderTemplate(templateName, args);
            }

        }

    }


}
