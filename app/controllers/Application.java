package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Global {

    public static void index() {
        List<User> allUsers = User.findAll();
        render(allUsers);
    }

}