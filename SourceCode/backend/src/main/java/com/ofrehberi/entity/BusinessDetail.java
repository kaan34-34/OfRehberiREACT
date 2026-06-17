package com.ofrehberi.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "business_details")
public class BusinessDetail {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "business_id", unique = true)
  private Business business;

  private String weekdayHours;
  private String saturdayHours;
  private String sundayHours;
  private LocalDate openingDate;
  private String email;
  private String website;
  private String fax;
  private String instagram;
  private String facebook;
  private String twitter;
  private String googleMapEmbed;

  @OneToMany(mappedBy = "businessDetail", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<BusinessGalleryImage> gallery = new ArrayList<>();

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Business getBusiness() { return business; }
  public void setBusiness(Business business) { this.business = business; }
  public String getWeekdayHours() { return weekdayHours; }
  public void setWeekdayHours(String weekdayHours) { this.weekdayHours = weekdayHours; }
  public String getSaturdayHours() { return saturdayHours; }
  public void setSaturdayHours(String saturdayHours) { this.saturdayHours = saturdayHours; }
  public String getSundayHours() { return sundayHours; }
  public void setSundayHours(String sundayHours) { this.sundayHours = sundayHours; }
  public LocalDate getOpeningDate() { return openingDate; }
  public void setOpeningDate(LocalDate openingDate) { this.openingDate = openingDate; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getWebsite() { return website; }
  public void setWebsite(String website) { this.website = website; }
  public String getFax() { return fax; }
  public void setFax(String fax) { this.fax = fax; }
  public String getInstagram() { return instagram; }
  public void setInstagram(String instagram) { this.instagram = instagram; }
  public String getFacebook() { return facebook; }
  public void setFacebook(String facebook) { this.facebook = facebook; }
  public String getTwitter() { return twitter; }
  public void setTwitter(String twitter) { this.twitter = twitter; }
  public String getGoogleMapEmbed() { return googleMapEmbed; }
  public void setGoogleMapEmbed(String googleMapEmbed) { this.googleMapEmbed = googleMapEmbed; }
  public List<BusinessGalleryImage> getGallery() { return gallery; }
  public void setGallery(List<BusinessGalleryImage> gallery) { this.gallery = gallery; }
}
