package com.ofrehberi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
public class Question {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "business_id")
  private Business business;

  private String userName;
  private String questionText;
  private String answerText;
  private LocalDateTime askedAt;
  private LocalDateTime answeredAt;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Business getBusiness() { return business; }
  public void setBusiness(Business business) { this.business = business; }
  public String getUserName() { return userName; }
  public void setUserName(String userName) { this.userName = userName; }
  public String getQuestionText() { return questionText; }
  public void setQuestionText(String questionText) { this.questionText = questionText; }
  public String getAnswerText() { return answerText; }
  public void setAnswerText(String answerText) { this.answerText = answerText; }
  public LocalDateTime getAskedAt() { return askedAt; }
  public void setAskedAt(LocalDateTime askedAt) { this.askedAt = askedAt; }
  public LocalDateTime getAnsweredAt() { return answeredAt; }
  public void setAnsweredAt(LocalDateTime answeredAt) { this.answeredAt = answeredAt; }
}
