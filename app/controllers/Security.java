package controllers;

import models.*;

public class Security extends Secure.Security {

    static boolean authenticate(String username, String password) {
        return User.authenticate(username, password) != null;
    }

    static void onDisconnected() {
        NGLDemo.index();
    }

    static void onAuthenticated() {
        NGLDemo.home();
    }

    static boolean check(String profile) {
        if("admin".equals(profile)) {
            return User.find("byEmail", connected()).<User>first().isAdmin;
        }
        return false;
    }

}