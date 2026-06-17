package com.ofrehberi.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PurchaseDto(
    Long id,
    Long userId,
    String businessId,
    String businessName,
    String packageName,
    BigDecimal amount,
    String currency,
    String paymentProvider,
    String paymentStatus,
    LocalDateTime purchasedAt
) {
}
