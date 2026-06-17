package com.ofrehberi.dto;

public record AuthUserDto(Long id, String fullName, String email, String firebaseUid, String role) {
}
