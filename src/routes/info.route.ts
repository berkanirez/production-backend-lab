import { Router, type Request, type Response } from "express";
import { env } from "../config/env";
import { successResponse } from "../common/http/response";
import type { ApiSuccessResponse } from "../types/api.types";

interface AppInfoData {
  name: string;
  version: string;
  environment: "development" | "test" | "production";
  description: string;
  features: string[];
}

type GetInfoResponse = ApiSuccessResponse<AppInfoData>;

const infoRouter = Router();

infoRouter.get("/info", (_req: Request, res: Response<GetInfoResponse>) => {
  const data: AppInfoData = {
    name: env.APP_NAME,
    version: "1.0.0",
    environment: env.NODE_ENV,
    description:
      "Backend learning project for building a production-minded TypeScript API skeleton.",
    features: [
      "TypeScript",
      "Express",
      "Environment configuration",
      "Typed API responses",
    ],
  };

  const responseBody = successResponse(
    data,
    "Application info fetched successfully.",
  );

  res.status(200).json(responseBody);
});

export { infoRouter };