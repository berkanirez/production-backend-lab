export type Environment = "development" | "test" | "production";

export type ResponseStatus = "success" | "error";

export interface CreateUserPayload {
  name: string;
  email: string;
  age: number;
  role: "admin" | "user";
  bio?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  age?: number;
  role?: "admin" | "user";
  bio?: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  status: "success";
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  status: "error";
  message: string;
  errorCode: string;
}

export interface AppInfoData {
  name: string;
  version: string;
  environment: Environment;
  description: string;
  features: string[];
}