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
        session.put("user", userName);
        renderTemplate("NGLDemo/home");
    }

    public static void logout() {
        session.remove("user");
        renderTemplate("NGLDemo/index");
    }

    public static void activity() {
        renderX();
    }

    public static void splash() {
        renderX();
    }

}