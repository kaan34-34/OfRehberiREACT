package com.ofrehberi.dto;

import java.time.LocalDate;

public record ReviewDto(
    String id,
    String userName,
    int rating,
    String commentText,
    LocalDate reviewDate,
    String adminReply
) {
}
