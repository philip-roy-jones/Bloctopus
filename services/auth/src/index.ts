import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from './generated/prisma'

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

  try {
    const user = await prisma.user.create({
      data: { email, password, displayName: "User" },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

app.post("/api/login", (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
