package models;

import java.util.*;
import javax.persistence.*;

import play.db.jpa.*;

@Entity
public class User extends Model {

    public String email;
    public String fullname;
    public String password;
    public boolean isAdmin;

    public User(String email, String fullname, String password) {
        this.email = email;
        this.fullname = fullname;
        this.password = password;
    }

    public static User authenticate(String email, String password) {
        return find("byEmailAndPassword", email, password).first();
    }

}
