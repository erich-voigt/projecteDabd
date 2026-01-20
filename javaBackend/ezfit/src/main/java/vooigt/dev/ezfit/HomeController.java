package vooigt.dev.ezfit;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import javax.sql.DataSource;
import java.sql.Connection;

@RestController
public class HomeController {

    private final DataSource dataSource;

    public HomeController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/")
    public String home() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                return "connection.valid";
            } else {
                return "connection.invalid";
            }
        } catch (Exception e) {
            return "db.error: " + e.getMessage();
        }
    }
    
}
