import org.junit.*;
import java.util.*;
import play.test.*;
import models.*;

public class BasicUserTest extends UnitTest {

   @Before
    public void setup() {
        Fixtures.deleteAllModels();
    }

    @Test
    public void createAndRetrieveUser() {

        // Create a new user and save it
        new User ("bob.the.builder1@gmail.com", "Bob", "secret").save();

        // Retrieve the user with e-mail address bob@gmail.com
        User bob = User.find("byEmail", "bob.the.builder1@gmail.com").first();

        // Test
        assertNotNull(bob);
        assertEquals("Bob", bob.fullname);
    }

    @Test
    public void tryAuthenticateAsUser() {
        // Create a new user and save it
        new User("bob.the.builder2@gmail.com", "Bob", "secret").save();

        // Test
        assertNotNull(User.authenticate("bob.the.builder2@gmail.com", "secret"));
        assertNull(User.authenticate("bob.the.builder2@gmail.com", "badpassword"));
        assertNull(User.authenticate("tom@gmail.com", "secret"));
    }

    @Test
    public void fullTest() {
        Fixtures.loadModels("data.yml");

        // Count things
        assertEquals(3, User.count());

        // Try to connect as users
        assertNotNull(User.authenticate("bob.the.builder100@gmail.com", "secret"));
        assertNotNull(User.authenticate("bob.the.builder101@gmail.com", "secret"));
        assertNotNull(User.authenticate("bob.the.builder102@gmail.com", "secret"));

        assertNull(User.authenticate("jeff@gmail.com", "badpassword"));
        assertNull(User.authenticate("tom@gmail.com", "secret"));

        // Find all the Bob's
        List<User> bobPosts = User.find("fullname", "Bob").fetch();
        assertEquals(3, bobPosts.size());

        // Add a new user
        new User ("bob.the.builder103@gmail.com", "Bob", "secret").save();
        new User ("bob.the.builder104@gmail.com", "Bob", "secret").save();

        assertEquals(5, User.count());
    }

}
