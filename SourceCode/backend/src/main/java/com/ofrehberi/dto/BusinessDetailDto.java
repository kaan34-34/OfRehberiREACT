package com.ofrehberi.dto;

import java.time.LocalDate;
import java.util.List;

public record BusinessDetailDto(
    BusinessSummaryDto business,
    String weekdayHours,
    String saturdayHours,
    String sundayHours,
    LocalDate openingDate,
    String email,
    String website,
    String fax,
    String instagram,
    String facebook,
    String twitter,
    String googleMapEmbed,
    List<String> gallery,
    List<ReviewDto> reviews
) {
}
