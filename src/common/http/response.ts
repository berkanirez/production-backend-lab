import type { ApiErrorResponse, ApiSuccessResponse } from "../../types/api.types";

export function successResponse<T>(
  data: T,
  message: string,
): ApiSuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  message: string,
  errorCode: string,
): ApiErrorResponse {
  return {
    success: false,
    message,
    errorCode,
  };
}