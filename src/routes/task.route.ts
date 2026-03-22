import { Router, type NextFunction, type Request, type Response } from "express";
import { successResponse } from "../common/http/response";
import { createTask, getTasks } from "../services/task.service";
import type { ApiSuccessResponse } from "../types/api.types";
import type { CreateTaskDto } from "../types/dto.types";
import type { Task } from "../types/domain.types";

type GetTasksResponse = ApiSuccessResponse<Task[]>;
type CreateTaskResponse = ApiSuccessResponse<Task>;

const taskRouter = Router();

taskRouter.get(
  "/tasks",
  async (_req: Request, res: Response<GetTasksResponse>, next: NextFunction) => {
    try {
      const taskList = await getTasks();
      const responseBody = successResponse(taskList, "Tasks fetched successfully.");
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
);

taskRouter.post(
  "/tasks",
  async (
    req: Request<unknown, unknown, CreateTaskDto>,
    res: Response<CreateTaskResponse>,
    next: NextFunction,
  ) => {
    try {
      const newTask = await createTask(req.body);
      const responseBody = successResponse(newTask, "Task created successfully.");
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
);

export { taskRouter };