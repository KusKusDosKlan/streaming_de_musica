<?php

declare(strict_types=1);

return [
    'base_url' => rtrim((string) (getenv('STREAMING_API_BASE_URL') ?: 'http://127.0.0.1:8080/api/v1/'), '/') . '/',
    // Token de serviço vem do ambiente; nunca colocar o valor literal neste arquivo.
    'service_token' => (string) (getenv('STREAMING_ADMIN_API_TOKEN') ?: ''),
    'timeout_seconds' => 15,
];
