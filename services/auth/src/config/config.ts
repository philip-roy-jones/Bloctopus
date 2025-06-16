import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Frontend
export const WEB_URL = process.env.WEB_URL;

// Time durations (in milliseconds)
export const PASSWORD_RESET_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
export const SESSION_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Environment Variables
export const PASSWORD_RESET_SECRET = process.env.PASSWORD_RESET_SECRET;

// Cookie Settings
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

// API Keys
export const MAILER_API_KEY = process.env.MAILER_API_KEY;

// Authentication key
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const privateKeyPath = path.resolve(__dirname, './secrets/private.pem');
export const PRIVATE_KEY = fs.readFileSync(privateKeyPath, 'utf8');
