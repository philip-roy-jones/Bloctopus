// services/authService.ts
import { AUTH_SERVICE_URL } from "@/config";

export async function registerUser({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<void> {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
  } catch (error) {
    console.error("Registration request failed:", error);
    throw error;
  }
}

export async function confirmRegistration({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}): Promise<void> {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/register/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, verificationCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Confirmation failed");
    }
  } catch (error) {
    console.error("Confirmation request failed:", error);
    throw error;
  }
}

