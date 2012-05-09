package controllers;

import play.*;
import play.i18n.Lang;
import play.mvc.*;

import java.util.*;

import models.*;

public class Global extends Controller {

    @Before
    static void globalBeforeInterceptor() {
        //Basic Auth
        String password = request.password;
        if ( password == null ) {
            unauthorized( "Compro Technologies DEMO site" );
        }
        else if (!password.equalsIgnoreCase("play"))
        {
            unauthorized( "Compro Technologies DEMO site" );
        }

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

    }


}
