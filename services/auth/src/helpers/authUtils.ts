export const validateRegistration = (email: string, password: string, confirmPassword: string, acceptedTerms: boolean): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];

  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  if (!confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Confirm password is required" });
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Password and confirm password do not match" });
  }

  if (password && password.length < 8) {
    errors.push({ field: "password", message: "Password must be at least 8 characters long" });
  }

  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: "email", message: "Email is not valid" });
  }

  if (!acceptedTerms) {
    errors.push({ field: "acceptedTerms", message: "You must accept the terms and conditions" });
  }

  return errors;
};

export const validatePasswordReset = (password: string, confirmPassword: string, token: string): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];

  if (!token) {
    errors.push({ field: "all", message: "Token is required" });
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  if (!confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Confirm password is required" });
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Password and confirm password do not match" });
  }

  if (password && password.length < 8) {
    errors.push({ field: "password", message: "Password must be at least 8 characters long" });
  }

  return errors;
}

export const validateForgotPassword = (email: string): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];

  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: "email", message: "Email is not valid" });
  }

  return errors;
};

export const validatePasswordResetCode = (code: string): { field: string; message: string }[] => {
  const errors: { field: string; message: string }[] = [];

  if (!code) {
    errors.push({ field: "code", message: "Code is required" });
  }

  return errors;
}
