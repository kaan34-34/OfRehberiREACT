package com.ofrehberi.controller;

import com.ofrehberi.dto.CreatePurchaseRequest;
import com.ofrehberi.dto.PurchaseDto;
import com.ofrehberi.service.PurchaseService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {
  private final PurchaseService purchaseService;

  public PurchaseController(PurchaseService purchaseService) {
    this.purchaseService = purchaseService;
  }

  @PostMapping("/mock-checkout")
  public PurchaseDto mockCheckout(@Valid @RequestBody CreatePurchaseRequest request) {
    return purchaseService.createMockPurchase(request);
  }

  @GetMapping("/users/{userId}")
  public List<PurchaseDto> history(@PathVariable Long userId) {
    return purchaseService.listHistory(userId);
  }
}
