import { AppError } from "./app-error";

export class BadRequestError extends AppError {
  constructor(
    message = "Bad request.",
    errorCode = "BAD_REQUEST",
  ) {
    super(message, 400, errorCode);

    this.name = "BadRequestError";
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}