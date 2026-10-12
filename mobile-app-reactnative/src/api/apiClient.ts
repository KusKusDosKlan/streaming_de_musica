import axios from 'axios';

/** Base de desenvolvimento para emulador Android. Ajustar para iOS/dispositivo e produção. */
export const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {Accept: 'application/json'},
});

// TODO: adicionar interceptor JWT/refresh com armazenamento seguro após decidir a estratégia de tokens.
