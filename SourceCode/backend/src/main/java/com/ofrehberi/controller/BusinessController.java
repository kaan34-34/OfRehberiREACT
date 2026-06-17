package com.ofrehberi.controller;

import com.ofrehberi.dto.BusinessDetailDto;
import com.ofrehberi.dto.BusinessSummaryDto;
import com.ofrehberi.dto.CreateReviewRequest;
import com.ofrehberi.dto.ReviewDto;
import com.ofrehberi.service.BusinessService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/businesses")
public class BusinessController {
  private final BusinessService businessService;

  public BusinessController(BusinessService businessService) {
    this.businessService = businessService;
  }

  @GetMapping
  public List<BusinessSummaryDto> list() {
    return businessService.listBusinesses();
  }

  @GetMapping("/slug/{slug}")
  public BusinessDetailDto detail(@PathVariable String slug) {
    return businessService.getBySlug(slug);
  }

  @PostMapping("/{businessId}/reviews")
  public ReviewDto addReview(@PathVariable String businessId, @Valid @RequestBody CreateReviewRequest request) {
    return businessService.addReview(businessId, request);
  }
}
