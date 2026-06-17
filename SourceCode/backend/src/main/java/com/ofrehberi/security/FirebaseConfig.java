package com.ofrehberi.security;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {
  public FirebaseConfig(@Value("${firebase.service-account-path}") String serviceAccountPath) throws IOException {
    if (!FirebaseApp.getApps().isEmpty()) {
      return;
    }

    try (FileInputStream serviceAccount = new FileInputStream(serviceAccountPath)) {
      FirebaseOptions options = FirebaseOptions.builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();
      FirebaseApp.initializeApp(options);
    }
  }
}
