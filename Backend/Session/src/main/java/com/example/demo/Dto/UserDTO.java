package com.example.demo.Dto;

import com.example.demo.entitie.Role;

public class UserDTO {
    private String email;
    private String password;
    private Role role;
 
    // Getters and Setters
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
 
    public Role getRole() {
        return role;
    }
 
    public void setRole(Role role) {
        this.role = role;
    }
}
 