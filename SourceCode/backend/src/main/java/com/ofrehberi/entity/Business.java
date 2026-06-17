package com.ofrehberi.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "businesses")
public class Business {
  @Id
  private String id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String slug;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id")
  private Category category;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sub_category_id")
  private SubCategory subCategory;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "neighborhood_id")
  private Neighborhood neighborhood;

  private String slogan;
  private String address;
  private String phone1;
  private String phone2;
  private String gsm;
  private boolean openNow;
  private boolean openAllDay;
  private LocalTime openTime;
  private LocalTime closeTime;
  private boolean hasDelivery;
  private boolean acceptsCard;
  private BigDecimal rating;
  private int totalVotes;
  private boolean featured;
  private String imageUrl;

  @OneToOne(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true)
  private BusinessDetail detail;

  @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Review> reviews = new ArrayList<>();

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }
  public Category getCategory() { return category; }
  public void setCategory(Category category) { this.category = category; }
  public SubCategory getSubCategory() { return subCategory; }
  public void setSubCategory(SubCategory subCategory) { this.subCategory = subCategory; }
  public Neighborhood getNeighborhood() { return neighborhood; }
  public void setNeighborhood(Neighborhood neighborhood) { this.neighborhood = neighborhood; }
  public String getSlogan() { return slogan; }
  public void setSlogan(String slogan) { this.slogan = slogan; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public String getPhone1() { return phone1; }
  public void setPhone1(String phone1) { this.phone1 = phone1; }
  public String getPhone2() { return phone2; }
  public void setPhone2(String phone2) { this.phone2 = phone2; }
  public String getGsm() { return gsm; }
  public void setGsm(String gsm) { this.gsm = gsm; }
  public boolean isOpenNow() { return openNow; }
  public void setOpenNow(boolean openNow) { this.openNow = openNow; }
  public boolean isOpenAllDay() { return openAllDay; }
  public void setOpenAllDay(boolean openAllDay) { this.openAllDay = openAllDay; }
  public LocalTime getOpenTime() { return openTime; }
  public void setOpenTime(LocalTime openTime) { this.openTime = openTime; }
  public LocalTime getCloseTime() { return closeTime; }
  public void setCloseTime(LocalTime closeTime) { this.closeTime = closeTime; }
  public boolean isHasDelivery() { return hasDelivery; }
  public void setHasDelivery(boolean hasDelivery) { this.hasDelivery = hasDelivery; }
  public boolean isAcceptsCard() { return acceptsCard; }
  public void setAcceptsCard(boolean acceptsCard) { this.acceptsCard = acceptsCard; }
  public BigDecimal getRating() { return rating; }
  public void setRating(BigDecimal rating) { this.rating = rating; }
  public int getTotalVotes() { return totalVotes; }
  public void setTotalVotes(int totalVotes) { this.totalVotes = totalVotes; }
  public boolean isFeatured() { return featured; }
  public void setFeatured(boolean featured) { this.featured = featured; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public BusinessDetail getDetail() { return detail; }
  public void setDetail(BusinessDetail detail) { this.detail = detail; }
  public List<Review> getReviews() { return reviews; }
  public void setReviews(List<Review> reviews) { this.reviews = reviews; }
}
