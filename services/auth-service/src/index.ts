import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 1111;

// Enable CORS with specific origin
const appUrl = process.env.APP_URL || "http://localhost:5173";

app.use(cors({ 
  origin: appUrl,
  credentials: true
}));

app.use(express.json());

app.post("/api/login", (_req, res) => {
  res.json({ message: "Hello from TypeScript Express!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
