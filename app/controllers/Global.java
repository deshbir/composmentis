package controllers;

import play.*;
import play.i18n.Lang;
import play.mvc.*;

import java.util.*;

import models.*;

public class Global extends Controller {

    @Before
    static void globalBeforeInterceptor() {

        //Get Language Selection

        String lang = request.params.get("lang");
        if(lang!=null)  {
            Lang.set(lang);
        }
    }


}