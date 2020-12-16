package springrest.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springrest.model.User;

@RestController
@RequestMapping("/users/api")
public class UserApiController {

    @GetMapping("/user")
    public ResponseEntity<User> currentUser(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return currentUser != null
                ? new ResponseEntity<>(currentUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
