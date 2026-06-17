package com.ofrehberi.dto;

import java.time.LocalDate;

public record UserReviewDto(
    String id,
    String businessId,
    String businessName,
    String businessSlug,
    int rating,
    String commentText,
    LocalDate reviewDate,
    String adminReply
) {
}
