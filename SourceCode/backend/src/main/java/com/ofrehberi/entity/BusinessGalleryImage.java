package com.ofrehberi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "business_gallery_images")
public class BusinessGalleryImage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "business_detail_id")
  private BusinessDetail businessDetail;

  private String imageUrl;
  private int sortOrder;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public BusinessDetail getBusinessDetail() { return businessDetail; }
  public void setBusinessDetail(BusinessDetail businessDetail) { this.businessDetail = businessDetail; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public int getSortOrder() { return sortOrder; }
  public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
