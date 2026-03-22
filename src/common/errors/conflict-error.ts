import { AppError } from "./app-error";

export class ConflictError extends AppError {
  constructor(
    message = "Conflict.",
    errorCode = "CONFLICT",
  ) {
    super(message, 409, errorCode);

    this.name = "ConflictError";
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}