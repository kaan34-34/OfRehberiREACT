package com.ofrehberi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchases")
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private AppUser user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "business_id")
  private Business business;

  private String packageName;
  private BigDecimal amount;
  private String currency;
  private String paymentProvider;
  private String paymentStatus;
  private LocalDateTime purchasedAt;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public AppUser getUser() { return user; }
  public void setUser(AppUser user) { this.user = user; }
  public Business getBusiness() { return business; }
  public void setBusiness(Business business) { this.business = business; }
  public String getPackageName() { return packageName; }
  public void setPackageName(String packageName) { this.packageName = packageName; }
  public BigDecimal getAmount() { return amount; }
  public void setAmount(BigDecimal amount) { this.amount = amount; }
  public String getCurrency() { return currency; }
  public void setCurrency(String currency) { this.currency = currency; }
  public String getPaymentProvider() { return paymentProvider; }
  public void setPaymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; }
  public String getPaymentStatus() { return paymentStatus; }
  public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
  public LocalDateTime getPurchasedAt() { return purchasedAt; }
  public void setPurchasedAt(LocalDateTime purchasedAt) { this.purchasedAt = purchasedAt; }
}
