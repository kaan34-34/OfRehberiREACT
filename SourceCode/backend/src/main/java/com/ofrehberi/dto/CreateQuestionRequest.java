package com.ofrehberi.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateQuestionRequest(@NotBlank String userName, @NotBlank String questionText) {
}
