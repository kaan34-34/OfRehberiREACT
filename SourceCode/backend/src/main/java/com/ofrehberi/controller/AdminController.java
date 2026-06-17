package com.ofrehberi.controller;

import com.ofrehberi.dto.AnswerQuestionRequest;
import com.ofrehberi.dto.AdminReviewDto;
import com.ofrehberi.dto.BusinessSummaryDto;
import com.ofrehberi.dto.CreateBusinessRequest;
import com.ofrehberi.dto.QuestionDto;
import com.ofrehberi.security.RoleGuard;
import com.ofrehberi.service.AdminReviewService;
import com.ofrehberi.service.BusinessService;
import com.ofrehberi.service.QuestionService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
  private final BusinessService businessService;
  private final QuestionService questionService;
  private final AdminReviewService adminReviewService;
  private final RoleGuard roleGuard;

  public AdminController(BusinessService businessService, QuestionService questionService, AdminReviewService adminReviewService, RoleGuard roleGuard) {
    this.businessService = businessService;
    this.questionService = questionService;
    this.adminReviewService = adminReviewService;
    this.roleGuard = roleGuard;
  }

  @PostMapping("/businesses")
  public BusinessSummaryDto createBusiness(
      @RequestHeader(value = "Authorization", required = false) String authorization,
      @Valid @RequestBody CreateBusinessRequest request
  ) {
    roleGuard.requireAdmin(authorization);
    return businessService.createBusiness(request);
  }

  @PutMapping("/businesses/{businessId}")
  public BusinessSummaryDto updateBusiness(
      @RequestHeader(value = "Authorization", required = false) String authorization,
      @PathVariable String businessId,
      @Valid @RequestBody CreateBusinessRequest request
  ) {
    roleGuard.requireAdmin(authorization);
    return businessService.updateBusiness(businessId, request);
  }

  @DeleteMapping("/businesses/{businessId}")
  public void deleteBusiness(
      @RequestHeader(value = "Authorization", required = false) String authorization,
      @PathVariable String businessId
  ) {
    roleGuard.requireAdmin(authorization);
    businessService.deleteBusiness(businessId);
  }

  @GetMapping("/reviews")
  public List<AdminReviewDto> reviews(@RequestHeader(value = "Authorization", required = false) String authorization) {
    roleGuard.requireAdmin(authorization);
    return adminReviewService.listReviews();
  }

  @DeleteMapping("/reviews/{reviewId}")
  public void deleteReview(
      @RequestHeader(value = "Authorization", required = false) String authorization,
      @PathVariable String reviewId
  ) {
    roleGuard.requireAdmin(authorization);
    adminReviewService.deleteReview(reviewId);
  }

  @GetMapping("/questions/waiting")
  public List<QuestionDto> waitingQuestions(@RequestHeader(value = "Authorization", required = false) String authorization) {
    roleGuard.requireAdmin(authorization);
    return questionService.listWaitingAnswers();
  }

  @PatchMapping("/questions/{questionId}/answer")
  public QuestionDto answer(
      @RequestHeader(value = "Authorization", required = false) String authorization,
      @PathVariable Long questionId,
      @Valid @RequestBody AnswerQuestionRequest request
  ) {
    roleGuard.requireAdmin(authorization);
    return questionService.answer(questionId, request);
  }
}
