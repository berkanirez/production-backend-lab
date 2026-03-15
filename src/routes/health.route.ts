import { Router } from "express";
import { env } from "../config/env";

const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: env.APP_NAME,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

export { healthRouter };