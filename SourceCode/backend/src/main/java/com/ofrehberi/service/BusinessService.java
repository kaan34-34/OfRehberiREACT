package com.ofrehberi.service;

import com.ofrehberi.dto.BusinessDetailDto;
import com.ofrehberi.dto.BusinessSummaryDto;
import com.ofrehberi.dto.CreateBusinessRequest;
import com.ofrehberi.dto.CreateReviewRequest;
import com.ofrehberi.dto.ReviewDto;
import com.ofrehberi.entity.Business;
import com.ofrehberi.entity.BusinessDetail;
import com.ofrehberi.entity.BusinessGalleryImage;
import com.ofrehberi.entity.Review;
import com.ofrehberi.exception.ResourceNotFoundException;
import com.ofrehberi.repository.BusinessRepository;
import com.ofrehberi.repository.CategoryRepository;
import com.ofrehberi.repository.NeighborhoodRepository;
import com.ofrehberi.repository.PurchaseRepository;
import com.ofrehberi.repository.QuestionRepository;
import com.ofrehberi.repository.ReviewRepository;
import com.ofrehberi.repository.SubCategoryRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BusinessService {
  private final BusinessRepository businessRepository;
  private final ReviewRepository reviewRepository;
  private final CategoryRepository categoryRepository;
  private final SubCategoryRepository subCategoryRepository;
  private final NeighborhoodRepository neighborhoodRepository;
  private final QuestionRepository questionRepository;
  private final PurchaseRepository purchaseRepository;

  public BusinessService(
      BusinessRepository businessRepository,
      ReviewRepository reviewRepository,
      CategoryRepository categoryRepository,
      SubCategoryRepository subCategoryRepository,
      NeighborhoodRepository neighborhoodRepository,
      QuestionRepository questionRepository,
      PurchaseRepository purchaseRepository
  ) {
    this.businessRepository = businessRepository;
    this.reviewRepository = reviewRepository;
    this.categoryRepository = categoryRepository;
    this.subCategoryRepository = subCategoryRepository;
    this.neighborhoodRepository = neighborhoodRepository;
    this.questionRepository = questionRepository;
    this.purchaseRepository = purchaseRepository;
  }

  @Transactional(readOnly = true)
  public List<BusinessSummaryDto> listBusinesses() {
    return businessRepository.findAll().stream().map(this::toSummary).toList();
  }

  @Transactional(readOnly = true)
  public BusinessDetailDto getBySlug(String slug) {
    Business business = businessRepository.findBySlug(slug)
        .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı: " + slug));
    return toDetail(business);
  }

  @Transactional
  public BusinessSummaryDto createBusiness(CreateBusinessRequest request) {
    Business business = new Business();
    business.setId(request.id());
    business.setName(request.name());
    business.setSlug(request.slug());
    business.setCategory(categoryRepository.findById(request.categoryId())
        .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + request.categoryId())));
    business.setSubCategory(subCategoryRepository.findById(request.subCategoryId())
        .orElseThrow(() -> new ResourceNotFoundException("Alt kategori bulunamadı: " + request.subCategoryId())));
    business.setNeighborhood(neighborhoodRepository.findById(request.neighborhoodId())
        .orElseThrow(() -> new ResourceNotFoundException("Mahalle bulunamadı: " + request.neighborhoodId())));
    business.setSlogan(request.slogan());
    business.setAddress(request.address());
    business.setPhone1(request.phone1());
    business.setPhone2(request.phone2());
    business.setGsm(request.gsm());
    business.setOpenNow(request.openNow());
    business.setOpenAllDay(request.openAllDay());
    business.setOpenTime(request.openTime());
    business.setCloseTime(request.closeTime());
    business.setHasDelivery(request.hasDelivery());
    business.setAcceptsCard(request.acceptsCard());
    business.setRating(BigDecimal.ZERO);
    business.setTotalVotes(0);
    business.setFeatured(request.featured());
    applyImages(business, request);
    return toSummary(businessRepository.save(business));
  }

  @Transactional
  public BusinessSummaryDto updateBusiness(String businessId, CreateBusinessRequest request) {
    Business business = businessRepository.findById(businessId)
        .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı: " + businessId));
    business.setName(request.name());
    business.setSlug(request.slug());
    business.setCategory(categoryRepository.findById(request.categoryId())
        .orElseThrow(() -> new ResourceNotFoundException("Kategori bulunamadı: " + request.categoryId())));
    business.setSubCategory(subCategoryRepository.findById(request.subCategoryId())
        .orElseThrow(() -> new ResourceNotFoundException("Alt kategori bulunamadı: " + request.subCategoryId())));
    business.setNeighborhood(neighborhoodRepository.findById(request.neighborhoodId())
        .orElseThrow(() -> new ResourceNotFoundException("Mahalle bulunamadı: " + request.neighborhoodId())));
    business.setSlogan(request.slogan());
    business.setAddress(request.address());
    business.setPhone1(request.phone1());
    business.setPhone2(request.phone2());
    business.setGsm(request.gsm());
    business.setOpenNow(request.openNow());
    business.setOpenAllDay(request.openAllDay());
    business.setOpenTime(request.openTime());
    business.setCloseTime(request.closeTime());
    business.setHasDelivery(request.hasDelivery());
    business.setAcceptsCard(request.acceptsCard());
    business.setFeatured(request.featured());
    applyImages(business, request);
    return toSummary(business);
  }

  @Transactional
  public void deleteBusiness(String businessId) {
    Business business = businessRepository.findById(businessId)
        .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı: " + businessId));
    questionRepository.deleteByBusinessId(businessId);
    purchaseRepository.deleteByBusinessId(businessId);
    businessRepository.delete(business);
  }

  @Transactional
  public ReviewDto addReview(String businessId, CreateReviewRequest request) {
    Business business = businessRepository.findById(businessId)
        .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı: " + businessId));
    Review review = new Review();
    review.setId("R-" + UUID.randomUUID().toString().substring(0, 8));
    review.setBusiness(business);
    review.setUserName(request.userName());
    review.setRating(request.rating());
    review.setCommentText(request.commentText());
    review.setReviewDate(LocalDate.now());
    return toReview(reviewRepository.save(review));
  }

  public BusinessSummaryDto toSummary(Business business) {
    List<Review> reviews = business.getReviews() == null ? List.of() : business.getReviews();
    BigDecimal rating = reviews.isEmpty()
        ? BigDecimal.ZERO
        : BigDecimal.valueOf(reviews.stream().mapToInt(Review::getRating).average().orElse(0))
            .setScale(1, RoundingMode.HALF_UP);
    return new BusinessSummaryDto(
        business.getId(),
        business.getName(),
        business.getSlug(),
        business.getCategory() == null ? null : business.getCategory().getId(),
        business.getCategory() == null ? null : business.getCategory().getName(),
        business.getSubCategory() == null ? null : business.getSubCategory().getId(),
        business.getSubCategory() == null ? null : business.getSubCategory().getName(),
        business.getNeighborhood() == null ? null : business.getNeighborhood().getId(),
        business.getNeighborhood() == null ? null : business.getNeighborhood().getName(),
        business.getSlogan(),
        business.getAddress(),
        business.getPhone1(),
        business.getPhone2(),
        business.getGsm(),
        business.isOpenNow(),
        business.isOpenAllDay(),
        business.getOpenTime(),
        business.getCloseTime(),
        business.isHasDelivery(),
        business.isAcceptsCard(),
        rating,
        reviews.size(),
        business.isFeatured(),
        business.getImageUrl()
    );
  }

  private void applyImages(Business business, CreateBusinessRequest request) {
    List<String> images = new ArrayList<>();
    if (request.imageUrls() != null) {
      request.imageUrls().stream()
          .filter(url -> url != null && !url.isBlank())
          .map(String::trim)
          .forEach(images::add);
    }
    if (images.isEmpty() && request.imageUrl() != null && !request.imageUrl().isBlank()) {
      images.add(request.imageUrl().trim());
    }

    business.setImageUrl(images.isEmpty() ? null : images.get(0));

    BusinessDetail detail = business.getDetail();
    if (detail == null) {
      detail = new BusinessDetail();
      detail.setBusiness(business);
      business.setDetail(detail);
    }

    List<BusinessGalleryImage> gallery = detail.getGallery();
    for (int i = 0; i < images.size(); i++) {
      BusinessGalleryImage galleryImage = i < gallery.size() ? gallery.get(i) : new BusinessGalleryImage();
      if (i >= gallery.size()) {
        galleryImage.setBusinessDetail(detail);
        gallery.add(galleryImage);
      }
      galleryImage.setImageUrl(images.get(i));
      galleryImage.setSortOrder(i + 1);
    }
    while (gallery.size() > images.size()) {
      gallery.remove(gallery.size() - 1);
    }
  }

  private BusinessDetailDto toDetail(Business business) {
    BusinessDetail detail = business.getDetail();
    List<String> gallery = detail == null
        ? List.of(business.getImageUrl())
        : detail.getGallery().stream()
            .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
            .map(BusinessGalleryImage::getImageUrl)
            .toList();
    return new BusinessDetailDto(
        toSummary(business),
        detail == null ? null : detail.getWeekdayHours(),
        detail == null ? null : detail.getSaturdayHours(),
        detail == null ? null : detail.getSundayHours(),
        detail == null ? null : detail.getOpeningDate(),
        detail == null ? null : detail.getEmail(),
        detail == null ? null : detail.getWebsite(),
        detail == null ? null : detail.getFax(),
        detail == null ? null : detail.getInstagram(),
        detail == null ? null : detail.getFacebook(),
        detail == null ? null : detail.getTwitter(),
        detail == null ? null : detail.getGoogleMapEmbed(),
        gallery,
        reviewRepository.findByBusinessIdOrderByReviewDateDesc(business.getId()).stream().map(this::toReview).toList()
    );
  }

  private ReviewDto toReview(Review review) {
    return new ReviewDto(
        review.getId(),
        review.getUserName(),
        review.getRating(),
        review.getCommentText(),
        review.getReviewDate(),
        review.getAdminReply()
    );
  }
}
