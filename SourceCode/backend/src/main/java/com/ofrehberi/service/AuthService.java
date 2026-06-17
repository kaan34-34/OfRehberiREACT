package com.ofrehberi.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.ofrehberi.dto.AuthUserDto;
import com.ofrehberi.dto.FirebaseLoginRequest;
import com.ofrehberi.dto.LoginRequest;
import com.ofrehberi.dto.RegisterRequest;
import com.ofrehberi.entity.AppUser;
import com.ofrehberi.exception.ForbiddenOperationException;
import com.ofrehberi.repository.AppUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
  private final AppUserRepository userRepository;

  public AuthService(AppUserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Transactional
  public AuthUserDto register(RegisterRequest request) {
    String email = request.email().trim().toLowerCase();
    if (userRepository.existsByEmail(email)) {
      throw new ForbiddenOperationException("Bu e-posta adresiyle kayıtlı kullanıcı var.");
    }

    AppUser user = new AppUser();
    user.setFullName(request.fullName().trim());
    user.setEmail(email);
    user.setPasswordHash(request.password());
    user.setRole("USER");
    return toDto(userRepository.save(user));
  }

  @Transactional
  public AuthUserDto loginWithFirebase(FirebaseLoginRequest request) {
    FirebaseToken token;
    try {
      token = FirebaseAuth.getInstance().verifyIdToken(request.idToken());
    } catch (FirebaseAuthException error) {
      throw new ForbiddenOperationException("Firebase token doğrulanamadı: " + error.getMessage());
    }

    String email = token.getEmail() == null ? "" : token.getEmail().trim().toLowerCase();
    String fullName = token.getName() == null || token.getName().isBlank() ? email : token.getName();
    boolean hasAdminClaim = Boolean.TRUE.equals(token.getClaims().get("admin"));

    AppUser user = userRepository.findByFirebaseUid(token.getUid())
        .or(() -> userRepository.findByEmail(email))
        .orElseGet(AppUser::new);
    user.setFirebaseUid(token.getUid());
    user.setFullName(user.getFullName() == null || user.getFullName().isBlank() ? fullName : user.getFullName());
    user.setEmail(email);
    if (hasAdminClaim) {
      user.setRole("ADMIN");
    } else if (user.getRole() == null || user.getRole().isBlank()) {
      user.setRole("USER");
    }
    return toDto(userRepository.save(user));
  }

  @Transactional(readOnly = true)
  public AuthUserDto login(LoginRequest request) {
    AppUser user = userRepository.findByEmail(request.email().trim().toLowerCase())
        .orElseThrow(() -> new ForbiddenOperationException("E-posta veya şifre hatalı."));
    if (!request.password().equals(user.getPasswordHash())) {
      throw new ForbiddenOperationException("E-posta veya şifre hatalı.");
    }
    return toDto(user);
  }

  private AuthUserDto toDto(AppUser user) {
    return new AuthUserDto(user.getId(), user.getFullName(), user.getEmail(), user.getFirebaseUid(), user.getRole());
  }
}
