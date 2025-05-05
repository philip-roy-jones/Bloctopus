import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from './generated/prisma'
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = 1111;
const prisma = new PrismaClient();

// Enable CORS with specific origin
const appUrl = process.env.APP_URL || "http://localhost:5173";

app.use(cors({ 
  origin: appUrl,
  credentials: true
}));

app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
      data: { email, hashedPassword, displayName: "User" },
      });

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
      await prisma.verificationToken.create({
      data: { 
        email: newUser.email, 
        token: verificationCode, 
        type: "email_verification", 
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Expires in 24 hours
      },
      });

      return newUser;
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

app.post("/api/register/confirm", async (req, res) => {
  const { email, verificationCode } = req.body;
  
});

app.post("/api/login", (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
