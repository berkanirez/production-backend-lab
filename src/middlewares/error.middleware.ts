import type { NextFunction, Request, Response } from "express";
import { AppError } from "../common/errors";
import { env } from "../config/env";
import type { ApiErrorResponse } from "../types/api.types";

function buildAppErrorResponse(error: AppError): ApiErrorResponse {
  const responseBody: ApiErrorResponse = {
    success: false,
    message: error.message,
    errorCode: error.errorCode,
  };

  if (env.NODE_ENV === "development" && error.stack) {
    responseBody.stack = error.stack;
  }

  return responseBody;
}

function buildUnexpectedErrorResponse(error: unknown): ApiErrorResponse {
  const responseBody: ApiErrorResponse = {
    success: false,
    message:
      env.NODE_ENV === "development"
        ? "An unexpected error occurred."
        : "Something went wrong.",
    errorCode: "INTERNAL_SERVER_ERROR",
  };

  if (env.NODE_ENV === "development" && error instanceof Error && error.stack) {
    responseBody.stack = error.stack;
  }

  return responseBody;
}

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    const responseBody = buildAppErrorResponse(error);
    res.status(error.statusCode).json(responseBody);
    return;
  }

  const responseBody = buildUnexpectedErrorResponse(error);
  res.status(500).json(responseBody);
}