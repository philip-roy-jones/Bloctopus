import dotenv from "dotenv";
dotenv.config();

export const NGINX_URL = process.env.VITE_NGINX_URL || "http://localhost";