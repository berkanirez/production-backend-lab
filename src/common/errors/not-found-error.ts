import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  constructor(
    message = "Resource not found.",
    errorCode = "NOT_FOUND",
  ) {
    super(message, 404, errorCode);

    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}