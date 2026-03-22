import express, { type Express } from "express";
import { healthRouter } from "./routes/health.route";
import { infoRouter } from "./routes/info.route";
import { projectRouter } from "./routes/project.route";
import { userRouter } from "./routes/user.route";
import { errorMiddleware } from "./middlewares/error.middleware";

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.use(healthRouter);
  app.use(infoRouter);
  app.use(userRouter);
  app.use(projectRouter);

  app.use(errorMiddleware);

  return app;
}