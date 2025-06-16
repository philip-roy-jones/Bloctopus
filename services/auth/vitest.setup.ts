import { vi } from 'vitest';

vi.mock('./src/config/config', () => ({
  PASSWORD_RESET_SECRET: 'mock-reset-secret',
  SESSION_EXPIRATION: 1000 * 60 * 10,
  PASSWORD_RESET_DURATION: 1000 * 60 * 10,
  PRIVATE_KEY: 'FAKE_PRIVATE_KEY',
  WEB_URL: 'http://localhost:3000',
  MAILER_API_KEY: 'SG._FAKE_MAIL_KEY',
  COOKIE_OPTIONS: {},
}));
