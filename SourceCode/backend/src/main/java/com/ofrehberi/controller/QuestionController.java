package com.ofrehberi.controller;

import com.ofrehberi.dto.CreateQuestionRequest;
import com.ofrehberi.dto.QuestionDto;
import com.ofrehberi.service.QuestionService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/businesses/{businessId}/questions")
public class QuestionController {
  private final QuestionService questionService;

  public QuestionController(QuestionService questionService) {
    this.questionService = questionService;
  }

  @GetMapping
  public List<QuestionDto> list(@PathVariable String businessId) {
    return questionService.listForBusiness(businessId);
  }

  @PostMapping
  public QuestionDto ask(@PathVariable String businessId, @Valid @RequestBody CreateQuestionRequest request) {
    return questionService.ask(businessId, request);
  }
}
