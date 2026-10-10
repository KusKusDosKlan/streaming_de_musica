package com.IEGP3.streamingApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Base segura temporária: mantém os endpoints fechados enquanto JWT, sessões
 * e regras USER/ADMIN não forem implementadas e testadas. Não é a configuração final.
 */
@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/health").permitAll()
            .anyRequest().denyAll());
        return http.build();
    }
}
