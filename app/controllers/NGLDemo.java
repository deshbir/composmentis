package controllers;

import play.*;
import play.mvc.*;
import play.i18n.*;

import java.util.*;

import models.*;

public class NGLDemo extends Global {

    public static void singlepage() {
        render();
    }

    public static void index() {
       render();
    }

    public static void home() {
        render();

    }

    public static void login() {
        render();
    }

    public static void authenticate() {
        String userName = params.get("username");
        session.put("user", userName);
        home();
    }

    public static void logout() {
        session.remove("user");
        index();
    }

    public static void activity() {
        render();
    }

    public static void splash() {
        render();
    }

}