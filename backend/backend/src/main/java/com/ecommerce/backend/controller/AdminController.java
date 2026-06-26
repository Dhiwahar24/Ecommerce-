package com.ecommerce.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://ecommerce-git-auth-backend-updates-dhiwahar24s-projects.vercel.app"
})
public class AdminController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginData) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();

        // simple hardcoded admin check
        if ("admin".equals(username) && "admin123".equals(password)) {
            response.put("status", "success");
            response.put("message", "Login successful");
        } else {
            response.put("status", "failed");
            response.put("message", "Invalid credentials");
        }

        return response;
    }
}
