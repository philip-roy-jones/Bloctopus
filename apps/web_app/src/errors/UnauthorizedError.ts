export class UnauthorizedError extends Error {
  constructor(message: string = "You are not authorized to perform this action") {
    super(message);
    this.name = "UnauthorizedError";
  }
}