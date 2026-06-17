package com.ofrehberi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.List;

public record CreateBusinessRequest(
    @NotBlank String id,
    @NotBlank String name,
    @NotBlank String slug,
    @NotBlank String categoryId,
    @NotBlank String subCategoryId,
    @NotBlank String neighborhoodId,
    String slogan,
    String address,
    String phone1,
    String phone2,
    String gsm,
    boolean openNow,
    boolean openAllDay,
    @NotNull LocalTime openTime,
    @NotNull LocalTime closeTime,
    boolean hasDelivery,
    boolean acceptsCard,
    boolean featured,
    String imageUrl,
    List<String> imageUrls
) {
}
