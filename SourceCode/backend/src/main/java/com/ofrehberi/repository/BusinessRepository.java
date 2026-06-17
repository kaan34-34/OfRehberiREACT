package com.ofrehberi.repository;

import com.ofrehberi.entity.Business;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<Business, String> {
  Optional<Business> findBySlug(String slug);
  List<Business> findByFeaturedTrue();
}
