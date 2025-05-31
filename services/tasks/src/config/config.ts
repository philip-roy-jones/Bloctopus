import dotenv from 'dotenv';
dotenv.config();

export const RABBITMQ_DEFAULT_USER = process.env.RABBITMQ_DEFAULT_USER || 'guest';
export const RABBITMQ_DEFAULT_PASSWORD = process.env.RABBITMQ_DEFAULT_PASSWORD || 'guest';
export const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
export const RABBITMQ_PORT = process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT, 10) : 5672;