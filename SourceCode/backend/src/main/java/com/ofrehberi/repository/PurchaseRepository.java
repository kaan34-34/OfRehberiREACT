package com.ofrehberi.repository;

import com.ofrehberi.entity.Purchase;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
  List<Purchase> findByUserIdOrderByPurchasedAtDesc(Long userId);
  void deleteByBusinessId(String businessId);
}
