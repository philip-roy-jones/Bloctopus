import dotenv from 'dotenv';
dotenv.config();

export const RABBITMQ_DEFAULT_USER = process.env.RABBITMQ_DEFAULT_USER || 'guest';
export const RABBITMQ_DEFAULT_PASSWORD = process.env.RABBITMQ_DEFAULT_PASSWORD || 'guest';
export const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
export const RABBITMQ_PORT = process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT, 10) : 5672;

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;

export const MAILER_API_KEY = process.env.MAILER_API_KEY;
export const WEB_URL = process.env.WEB_URL;
export const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://nginx';