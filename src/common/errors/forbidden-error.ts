import { AppError } from "./app-error";

export class ForbiddenError extends AppError {
  constructor(
    message = "Forbidden.",
    errorCode = "FORBIDDEN",
  ) {
    super(message, 403, errorCode);

    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}