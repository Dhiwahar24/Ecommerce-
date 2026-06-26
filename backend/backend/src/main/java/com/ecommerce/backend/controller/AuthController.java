package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://ecommerce-git-auth-backend-updates-dhiwahar24s-projects.vercel.app"
})
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> dbUser = userRepository.findByEmail(user.getEmail());

        if (dbUser.isPresent()) {
            if (dbUser.get().getPassword().equals(user.getPassword())) {
                return "LOGIN SUCCESS";
            }
        }

        return "INVALID CREDENTIALS";
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            return "EMAIL REQUIRED";
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "EMAIL ALREADY EXISTS";
        }

        user.setRole("USER");
        userRepository.save(user);
        return "REGISTER SUCCESS";
    }
}
