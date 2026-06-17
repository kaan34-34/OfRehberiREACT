package com.ofrehberi.service;

import com.ofrehberi.dto.AnswerQuestionRequest;
import com.ofrehberi.dto.CreateQuestionRequest;
import com.ofrehberi.dto.QuestionDto;
import com.ofrehberi.entity.Business;
import com.ofrehberi.entity.Question;
import com.ofrehberi.exception.ResourceNotFoundException;
import com.ofrehberi.repository.BusinessRepository;
import com.ofrehberi.repository.QuestionRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionService {
  private final QuestionRepository questionRepository;
  private final BusinessRepository businessRepository;

  public QuestionService(QuestionRepository questionRepository, BusinessRepository businessRepository) {
    this.questionRepository = questionRepository;
    this.businessRepository = businessRepository;
  }

  @Transactional(readOnly = true)
  public List<QuestionDto> listForBusiness(String businessId) {
    return questionRepository.findByBusinessIdOrderByAskedAtDesc(businessId).stream().map(this::toDto).toList();
  }

  @Transactional(readOnly = true)
  public List<QuestionDto> listWaitingAnswers() {
    return questionRepository.findByAnswerTextIsNullOrderByAskedAtAsc().stream().map(this::toDto).toList();
  }

  @Transactional
  public QuestionDto ask(String businessId, CreateQuestionRequest request) {
    Business business = businessRepository.findById(businessId)
        .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı: " + businessId));
    Question question = new Question();
    question.setBusiness(business);
    question.setUserName(request.userName());
    question.setQuestionText(request.questionText());
    question.setAskedAt(LocalDateTime.now());
    return toDto(questionRepository.save(question));
  }

  @Transactional
  public QuestionDto answer(Long questionId, AnswerQuestionRequest request) {
    Question question = questionRepository.findById(questionId)
        .orElseThrow(() -> new ResourceNotFoundException("Soru bulunamadı: " + questionId));
    question.setAnswerText(request.answerText());
    question.setAnsweredAt(LocalDateTime.now());
    return toDto(question);
  }

  private QuestionDto toDto(Question question) {
    Business business = question.getBusiness();
    return new QuestionDto(
        question.getId(),
        business == null ? null : business.getId(),
        business == null ? null : business.getName(),
        question.getUserName(),
        question.getQuestionText(),
        question.getAnswerText(),
        question.getAskedAt(),
        question.getAnsweredAt()
    );
  }
}
