export class MultiValidationError extends Error {
  errors: { field: string; message: string }[];

  constructor(errors: { field: string; message: string }[]) {
    super("Validation failed");
    this.name = "MultiValidationError";
    this.errors = errors;
  }
}
