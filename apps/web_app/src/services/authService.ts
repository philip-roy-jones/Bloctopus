// services/authService.ts
import { AUTH_SERVICE_URL } from "@/config";

export async function registerUser({
  email,
  password,
  confirmPassword,
  acceptedTerms
}: {
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}): Promise<void> {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, confirmPassword, acceptedTerms }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
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

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send password reset email");
    }
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw error;
  }
}

export const confirmPasswordReset = async (code: string): Promise<void> => {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/forgot/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to confirm password reset");
    }
  } catch (error) {
    console.error("Password reset confirmation request failed:", error);
    throw error;
  }
}

export const resetPassword = async (newPassword: string, confirmPassword: string): Promise<void> => {
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/forgot/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ newPassword, confirmNewPassword: confirmPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to reset password");
    }
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw error;
  }
}

