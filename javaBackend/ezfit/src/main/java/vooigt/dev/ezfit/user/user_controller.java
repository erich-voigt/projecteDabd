package vooigt.dev.ezfit.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class user_controller {

    private final user_service userService;

    // Constructor injection
    public user_controller(user_service userService) {
        this.userService = userService;
    }
    
    @GetMapping("/user/{email}")
    public user_model get_user_by_email(@PathVariable String email) {
        try {
            return userService.get_user(email);
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Database error: " + e.getMessage(),
                e  // this is the cause
            );
        }
    }
}