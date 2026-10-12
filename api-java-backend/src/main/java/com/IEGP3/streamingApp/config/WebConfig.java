package com.IEGP3.streamingApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** TODO: configurar CORS com as origens reais e apenas os métodos necessários. */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    // Não liberar CORS com wildcard para uma API autenticada.
}
