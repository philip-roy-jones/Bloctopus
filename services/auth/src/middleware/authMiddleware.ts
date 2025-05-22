import { AuthRequest, UserPayload } from "../@types/express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AUTH_SECRET } from "../config/config";

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.sessionCookie;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  if (!AUTH_SECRET) {
    res.status(500).json({ message: "Server error. Please try again later." });
    return;
  }

  try {
    const decoded = jwt.verify(token, AUTH_SECRET as string);
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
