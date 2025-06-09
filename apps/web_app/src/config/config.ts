import dotenv from "dotenv";
dotenv.config();

export const NGINX_URL = process.env.VITE_API_GATEWAY_URL || "http://localhost";