import { Router, type Request, type Response } from "express";
import { env } from "../config/env";
import type { ApiSuccessResponse, AppInfoData } from "../types";

const infoRouter = Router();

infoRouter.get(
  "/info",
  (
    _req: Request,
    res: Response<ApiSuccessResponse<AppInfoData>>,
  ) => {
    const responseBody: ApiSuccessResponse<AppInfoData> = {
      success: true,
      status: "success",
      message: "Application info fetched successfully.",
      data: {
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
      },
    };

    res.status(200).json(responseBody);
  },
);

export { infoRouter };