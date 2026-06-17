package com.ofrehberi.service;

import com.ofrehberi.dto.CreateReviewRequest;
import com.ofrehberi.dto.ReviewDto;
import com.ofrehberi.dto.UserReviewDto;
import com.ofrehberi.entity.AppUser;
import com.ofrehberi.entity.Business;
import com.ofrehberi.entity.Review;
import com.ofrehberi.exception.ForbiddenOperationException;
import com.ofrehberi.exception.ResourceNotFoundException;
import com.ofrehberi.repository.AppUserRepository;
import com.ofrehberi.repository.BusinessRepository;
import com.ofrehberi.repository.ReviewRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserReviewService {
  private final ReviewRepository reviewRepository;
  private final AppUserRepository userRepository;
  private final BusinessRepository businessRepository;

  public UserReviewService(
      ReviewRepository reviewRepository,
      AppUserRepository userRepository,
      BusinessRepository businessRepository
  ) {
    this.reviewRepository = reviewRepository;
    this.userRepository = userRepository;
    this.businessRepository = businessRepository;
  }

  @Transactional
  public ReviewDto addUserReview(Long userId, String businessId, CreateReviewRequest request) {
    AppUser user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + userId));
    Business business = businessRepository.findById(businessId)
        .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı: " + businessId));

    Review review = new Review();
    review.setId("R-" + UUID.randomUUID().toString().substring(0, 8));
    review.setBusiness(business);
    review.setUser(user);
    review.setUserName(user.getFullName());
    review.setRating(request.rating());
    review.setCommentText(request.commentText());
    review.setReviewDate(LocalDate.now());
    return toReview(reviewRepository.save(review));
  }

  @Transactional(readOnly = true)
  public List<UserReviewDto> listUserReviews(Long userId) {
    return reviewRepository.findByUserIdOrderByReviewDateDesc(userId).stream().map(this::toUserReview).toList();
  }

  @Transactional
  public void deleteUserReview(Long userId, String reviewId) {
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException("Yorum bulunamadı: " + reviewId));
    if (review.getUser() == null || !userId.equals(review.getUser().getId())) {
      throw new ForbiddenOperationException("Sadece kendi yorumunuzu silebilirsiniz.");
    }
    reviewRepository.delete(review);
  }

  private ReviewDto toReview(Review review) {
    return new ReviewDto(
        review.getId(),
        review.getUserName(),
        review.getRating(),
        review.getCommentText(),
        review.getReviewDate(),
        review.getAdminReply()
    );
  }

  private UserReviewDto toUserReview(Review review) {
    Business business = review.getBusiness();
    return new UserReviewDto(
        review.getId(),
        business == null ? null : business.getId(),
        business == null ? null : business.getName(),
        business == null ? null : business.getSlug(),
        review.getRating(),
        review.getCommentText(),
        review.getReviewDate(),
        review.getAdminReply()
    );
  }
}
