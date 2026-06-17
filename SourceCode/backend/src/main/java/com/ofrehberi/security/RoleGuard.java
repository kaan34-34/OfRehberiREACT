package com.ofrehberi.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.ofrehberi.repository.AppUserRepository;
import com.ofrehberi.exception.ForbiddenOperationException;
import org.springframework.stereotype.Component;

@Component
public class RoleGuard {
  private final AppUserRepository userRepository;

  public RoleGuard(AppUserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void requireAdmin(String roleHeaderOrAuthorization) {
    if (roleHeaderOrAuthorization != null && roleHeaderOrAuthorization.startsWith("Bearer ")) {
      String idToken = roleHeaderOrAuthorization.substring("Bearer ".length());
      try {
        FirebaseToken token = FirebaseAuth.getInstance().verifyIdToken(idToken);
        Object adminClaim = token.getClaims().get("admin");
        if (Boolean.TRUE.equals(adminClaim)) {
          return;
        }
        String email = token.getEmail() == null ? "" : token.getEmail().trim().toLowerCase();
        boolean hasAdminRole = userRepository.findByFirebaseUid(token.getUid())
            .or(() -> userRepository.findByEmail(email))
            .map(user -> "ADMIN".equalsIgnoreCase(user.getRole()))
            .orElse(false);
        if (hasAdminRole) {
          return;
        }
      } catch (FirebaseAuthException ignored) {
        throw new ForbiddenOperationException("Firebase admin token doğrulanamadı.");
      }
    }

    throw new ForbiddenOperationException("Bu işlem için admin yetkisi gerekir.");
  }
}
