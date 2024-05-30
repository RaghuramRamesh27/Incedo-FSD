package com.example.demo.controllers;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
 
import jakarta.servlet.http.HttpServletRequest;
 
 
@RestController
public class CsrfController {
 
    @GetMapping("/csrf-token")
    public CsrfToken csrfToken(HttpServletRequest request) {
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        return csrfToken;
    }
}