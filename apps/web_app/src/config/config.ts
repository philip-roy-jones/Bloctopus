import dotenv from "dotenv";
dotenv.config();

export const API_GATEWAY_URL = process.env.VITE_API_GATEWAY_URL || "http://localhost";