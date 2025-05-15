import { Request } from "express";

export interface UserPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}