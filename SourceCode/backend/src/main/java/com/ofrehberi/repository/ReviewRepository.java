package com.ofrehberi.repository;

import com.ofrehberi.entity.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, String> {
  List<Review> findAllByOrderByReviewDateDesc();
  List<Review> findByBusinessIdOrderByReviewDateDesc(String businessId);
  List<Review> findByUserIdOrderByReviewDateDesc(Long userId);
}
