package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Dto.LoginRequestDTO;
import com.example.demo.Dto.UserDTO;
import com.example.demo.Dto.UserSessionDTO;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
 
	@Autowired
	private UserService userService;
 
	@PostMapping("/register")
    public String register(@RequestBody UserDTO registrationRequest) {
        return userService.registerNewUser(registrationRequest);
    }
	
	  @PostMapping("/getRole")
	    public String roleGetter(@RequestBody  UserDTO userDTO) {
	      System.out.println(userDTO.getRole()); 
		  return userService.roleSender(userDTO.getEmail());
	    }
	
	@PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO loginRequest) {
        return userService.loginUser(loginRequest);
        

    }
	
	 @PostMapping("/logout")
	    public String logout(@RequestBody LoginRequestDTO logoutRequest) {
	        return userService.logoutUser(logoutRequest.getEmail());
	    }

	  @GetMapping("/sessions")
	    public List<UserSessionDTO> getAllUserSessions() {
	        return userService.getAllUserSessions();
	    }
}