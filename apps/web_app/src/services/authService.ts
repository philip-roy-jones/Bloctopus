import { MultiValidationError } from "@/errors/validations";

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
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, confirmPassword, acceptedTerms }),
    });

    if (response.status === 400) {
      const errorData = await response.json();
      throw new MultiValidationError(errorData);
    } else if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
  } catch (error) {
    console.error("Registration request failed:", error);
    throw error;
  }
}

export async function resendVerificationCode(email: string): Promise<void> {
  try {
    const response = await fetch(`/api/auth/verification/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (response.status === 400) {
      const errorData = await response.json();
      throw new MultiValidationError(errorData);
    } else if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Resend verification code failed");
    }
  } catch (error) {
    console.error("Resend verification code request failed:", error);
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
    const response = await fetch(`/api/auth/verification`, {
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
    const response = await fetch(`/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (response.status === 400) {
      const errorData = await response.json();
      throw new MultiValidationError(errorData);
    } else if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Password reset email failed");
    }
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw error;
  }
}

export const confirmPasswordReset = async (code: string): Promise<void> => {
  try {
    const response = await fetch(`/api/auth/reset-password/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code }),
    });

    if (response.status === 400) {
      const errorData = await response.json();
      throw new MultiValidationError(errorData);
    } else if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify code");
    }
  } catch (error) {
    console.error("Password reset confirmation request failed:", error);
    throw error;
  }
}

export const resetPassword = async (newPassword: string, confirmPassword: string): Promise<void> => {
  try {
    const response = await fetch(`/api/auth/reset-password`, {
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

