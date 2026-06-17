package com.ofrehberi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "reviews")
public class Review {
  @Id
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "business_id")
  private Business business;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private AppUser user;

  private String userName;
  private String avatarUrl;
  private int rating;
  private String commentText;
  private LocalDate reviewDate;
  private String adminReply;

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public Business getBusiness() { return business; }
  public void setBusiness(Business business) { this.business = business; }
  public AppUser getUser() { return user; }
  public void setUser(AppUser user) { this.user = user; }
  public String getUserName() { return userName; }
  public void setUserName(String userName) { this.userName = userName; }
  public String getAvatarUrl() { return avatarUrl; }
  public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
  public int getRating() { return rating; }
  public void setRating(int rating) { this.rating = rating; }
  public String getCommentText() { return commentText; }
  public void setCommentText(String commentText) { this.commentText = commentText; }
  public LocalDate getReviewDate() { return reviewDate; }
  public void setReviewDate(LocalDate reviewDate) { this.reviewDate = reviewDate; }
  public String getAdminReply() { return adminReply; }
  public void setAdminReply(String adminReply) { this.adminReply = adminReply; }
}
