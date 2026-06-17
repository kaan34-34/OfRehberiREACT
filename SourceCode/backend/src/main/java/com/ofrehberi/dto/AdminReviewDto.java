package com.ofrehberi.dto;

import java.time.LocalDate;

public record AdminReviewDto(
    String id,
    String businessId,
    String businessName,
    String businessSlug,
    String userName,
    int rating,
    String commentText,
    LocalDate reviewDate,
    String adminReply
) {
}
