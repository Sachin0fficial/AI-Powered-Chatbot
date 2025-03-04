package com.ai.gemini_chat.Controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.ai.gemini_chat.Entity.User;
import com.ai.gemini_chat.Repository.UserRepository;


@RestController
public class LogAndRegistration {
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
	    try {
	        
	        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

	        if (existingUser.isPresent()) {
	            return new ResponseEntity<>("User already exists. Please log in.", HttpStatus.CONFLICT);
	        }

	        
	        userRepository.save(user);
	        return ResponseEntity.ok("Registration successful");
	    } catch (Exception e) {
	        return new ResponseEntity<>("Registration failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}
	
	@GetMapping("/login/{email}/{password}")
    public ResponseEntity<?> getUser(@PathVariable String email, @PathVariable String password){
        User user = userRepository.findByEmailAndPassword(email, password);
        if (user != null) {
        	return ResponseEntity.ok("You Logged in");
        }
        else {
        	return new ResponseEntity<>("Login faild",HttpStatus.UNAUTHORIZED);
        }
        
    }
	
	

}
