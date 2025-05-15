import { AuthRequest, UserPayload } from "../@types/express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.sessionCookie;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (typeof decoded === "object" && "userId" in decoded) {
      req.user = decoded as UserPayload;
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Invalid token payload" });
    }
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
