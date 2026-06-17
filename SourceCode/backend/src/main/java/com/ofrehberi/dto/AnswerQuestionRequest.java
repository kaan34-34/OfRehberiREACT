package com.ofrehberi.dto;

import jakarta.validation.constraints.NotBlank;

public record AnswerQuestionRequest(@NotBlank String answerText) {
}
