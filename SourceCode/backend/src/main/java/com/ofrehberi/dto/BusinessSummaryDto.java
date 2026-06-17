package com.ofrehberi.dto;

import java.math.BigDecimal;
import java.time.LocalTime;

public record BusinessSummaryDto(
    String id,
    String name,
    String slug,
    String categoryId,
    String categoryName,
    String subCategoryId,
    String subCategoryName,
    String neighborhoodId,
    String neighborhoodName,
    String slogan,
    String address,
    String phone1,
    String phone2,
    String gsm,
    boolean openNow,
    boolean openAllDay,
    LocalTime openTime,
    LocalTime closeTime,
    boolean hasDelivery,
    boolean acceptsCard,
    BigDecimal rating,
    int totalVotes,
    boolean featured,
    String imageUrl
) {
}
