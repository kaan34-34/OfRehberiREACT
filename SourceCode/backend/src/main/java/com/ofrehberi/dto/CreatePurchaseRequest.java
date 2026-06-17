package com.ofrehberi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record CreatePurchaseRequest(
    @NotNull Long userId,
    @NotBlank String businessId,
    @NotBlank String packageName,
    @NotNull BigDecimal amount
) {
}
