package com.ofrehberi.service;

import com.ofrehberi.dto.AdminReviewDto;
import com.ofrehberi.entity.Business;
import com.ofrehberi.entity.Review;
import com.ofrehberi.exception.ResourceNotFoundException;
import com.ofrehberi.repository.ReviewRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminReviewService {
  private final ReviewRepository reviewRepository;

  public AdminReviewService(ReviewRepository reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  @Transactional(readOnly = true)
  public List<AdminReviewDto> listReviews() {
    return reviewRepository.findAllByOrderByReviewDateDesc().stream().map(this::toDto).toList();
  }

  @Transactional
  public void deleteReview(String reviewId) {
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException("Yorum bulunamadı: " + reviewId));
    reviewRepository.delete(review);
  }

  private AdminReviewDto toDto(Review review) {
    Business business = review.getBusiness();
    return new AdminReviewDto(
        review.getId(),
        business == null ? null : business.getId(),
        business == null ? null : business.getName(),
        business == null ? null : business.getSlug(),
        review.getUserName(),
        review.getRating(),
        review.getCommentText(),
        review.getReviewDate(),
        review.getAdminReply()
    );
  }
}
