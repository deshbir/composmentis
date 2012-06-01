package controllers;

import play.*;
import play.mvc.*;
import play.i18n.*;

import java.util.*;

import models.*;

public class NGLDemo extends Global {

    public static void singlepage() {
        renderX();
    }

    public static void index() {
       renderX();
    }

    public static void home() {
        renderX();

    }

    public static void login() {
        renderX();
    }

    public static void authenticate() {
        String userName = params.get("username");

        /*Logger.info("userName:" + userName);
        if (userName==null || userName.length() ==0) {
            Logger.info("inside error zone");
            flash.equals("User name can not be null.");
            renderTemplateX("login");
        }  else {
        */
            session.put("user", userName);
            redirectX("ngldemo", "home");
        //}
    }

    public static void logout() {
        session.remove("user");
        redirectX("ngldemo", "index");
    }

    public static void activity() {
        renderX();
    }

    public static void reader() {
        renderX();
    }

}