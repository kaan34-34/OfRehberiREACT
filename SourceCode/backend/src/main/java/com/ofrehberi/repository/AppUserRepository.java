package com.ofrehberi.repository;

import com.ofrehberi.entity.AppUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
  Optional<AppUser> findByEmail(String email);
  Optional<AppUser> findByFirebaseUid(String firebaseUid);
  boolean existsByEmail(String email);
}
