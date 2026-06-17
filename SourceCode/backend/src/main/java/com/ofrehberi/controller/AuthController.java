package com.ofrehberi.controller;

import com.ofrehberi.dto.AuthUserDto;
import com.ofrehberi.dto.FirebaseLoginRequest;
import com.ofrehberi.dto.LoginRequest;
import com.ofrehberi.dto.RegisterRequest;
import com.ofrehberi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  public AuthUserDto register(@Valid @RequestBody RegisterRequest request) {
    return authService.register(request);
  }

  @PostMapping("/login")
  public AuthUserDto login(@Valid @RequestBody LoginRequest request) {
    return authService.login(request);
  }

  @PostMapping("/firebase-login")
  public AuthUserDto firebaseLogin(@Valid @RequestBody FirebaseLoginRequest request) {
    return authService.loginWithFirebase(request);
  }
}
