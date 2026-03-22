import express, { type Express } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { healthRouter } from "./routes/health.route";
import { infoRouter } from "./routes/info.route";
import { projectRouter } from "./routes/project.route";
import { taskRouter } from "./routes/task.route";
import { userRouter } from "./routes/user.route";

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.use(healthRouter);
  app.use(infoRouter);
  app.use(userRouter);
  app.use(projectRouter);
  app.use(taskRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}