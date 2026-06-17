package com.ofrehberi.dto;

import java.time.LocalDateTime;

public record QuestionDto(
    Long id,
    String businessId,
    String businessName,
    String userName,
    String questionText,
    String answerText,
    LocalDateTime askedAt,
    LocalDateTime answeredAt
) {
}
