package com.ofrehberi.controller;

import com.ofrehberi.dto.CreateReviewRequest;
import com.ofrehberi.dto.ReviewDto;
import com.ofrehberi.dto.UserReviewDto;
import com.ofrehberi.service.UserReviewService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/{userId}")
public class UserController {
  private final UserReviewService userReviewService;

  public UserController(UserReviewService userReviewService) {
    this.userReviewService = userReviewService;
  }

  @GetMapping("/reviews")
  public List<UserReviewDto> reviews(@PathVariable Long userId) {
    return userReviewService.listUserReviews(userId);
  }

  @PostMapping("/businesses/{businessId}/reviews")
  public ReviewDto addReview(
      @PathVariable Long userId,
      @PathVariable String businessId,
      @Valid @RequestBody CreateReviewRequest request
  ) {
    return userReviewService.addUserReview(userId, businessId, request);
  }

  @DeleteMapping("/reviews/{reviewId}")
  public void deleteReview(@PathVariable Long userId, @PathVariable String reviewId) {
    userReviewService.deleteUserReview(userId, reviewId);
  }
}
