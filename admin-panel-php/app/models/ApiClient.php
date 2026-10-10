<?php

declare(strict_types=1);

namespace StreamingAdmin\models;

use GuzzleHttp\Client;
use RuntimeException;

/** Cliente HTTP centralizado. Não acessar o MySQL a partir do painel PHP. */
final class ApiClient
{
    private Client $client;

    public function __construct()
    {
        $config = require __DIR__ . '/../../config/api.php';
        $token = (string) ($config['service_token'] ?? '');
        if ($token === '') {
            throw new RuntimeException('Configure STREAMING_ADMIN_API_TOKEN no ambiente local.');
        }

        $this->client = new Client([
            'base_uri' => $config['base_url'],
            'timeout' => (float) ($config['timeout_seconds'] ?? 15),
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token,
            ],
        ]);
    }

    public function get(string $path, array $query = []): array
    {
        $response = $this->client->get(ltrim($path, '/'), ['query' => $query]);
        $decoded = json_decode((string) $response->getBody(), true);
        return is_array($decoded) ? $decoded : [];
    }

    /** TODO: adicionar métodos de POST/PUT/upload com validação e tratamento de erros. */
}
