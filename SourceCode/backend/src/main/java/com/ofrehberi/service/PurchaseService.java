package com.ofrehberi.service;

import com.ofrehberi.dto.CreatePurchaseRequest;
import com.ofrehberi.dto.PurchaseDto;
import com.ofrehberi.entity.AppUser;
import com.ofrehberi.entity.Business;
import com.ofrehberi.entity.Purchase;
import com.ofrehberi.exception.ResourceNotFoundException;
import com.ofrehberi.repository.AppUserRepository;
import com.ofrehberi.repository.BusinessRepository;
import com.ofrehberi.repository.PurchaseRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PurchaseService {
  private final PurchaseRepository purchaseRepository;
  private final AppUserRepository userRepository;
  private final BusinessRepository businessRepository;

  public PurchaseService(PurchaseRepository purchaseRepository, AppUserRepository userRepository, BusinessRepository businessRepository) {
    this.purchaseRepository = purchaseRepository;
    this.userRepository = userRepository;
    this.businessRepository = businessRepository;
  }

  @Transactional
  public PurchaseDto createMockPurchase(CreatePurchaseRequest request) {
    AppUser user = userRepository.findById(request.userId())
        .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + request.userId()));
    Business business = businessRepository.findById(request.businessId())
        .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı: " + request.businessId()));

    Purchase purchase = new Purchase();
    purchase.setUser(user);
    purchase.setBusiness(business);
    purchase.setPackageName(request.packageName());
    purchase.setAmount(request.amount());
    purchase.setCurrency("TRY");
    purchase.setPaymentProvider("MOCK");
    purchase.setPaymentStatus("MOCK_APPROVED");
    purchase.setPurchasedAt(LocalDateTime.now());
    return toDto(purchaseRepository.save(purchase));
  }

  @Transactional(readOnly = true)
  public List<PurchaseDto> listHistory(Long userId) {
    return purchaseRepository.findByUserIdOrderByPurchasedAtDesc(userId).stream().map(this::toDto).toList();
  }

  private PurchaseDto toDto(Purchase purchase) {
    return new PurchaseDto(
        purchase.getId(),
        purchase.getUser() == null ? null : purchase.getUser().getId(),
        purchase.getBusiness() == null ? null : purchase.getBusiness().getId(),
        purchase.getBusiness() == null ? null : purchase.getBusiness().getName(),
        purchase.getPackageName(),
        purchase.getAmount(),
        purchase.getCurrency(),
        purchase.getPaymentProvider(),
        purchase.getPaymentStatus(),
        purchase.getPurchasedAt()
    );
  }
}
