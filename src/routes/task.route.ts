import { Router, type NextFunction, type Request, type Response } from "express";
import { successResponse } from "../common/http/response";
import { createTask, getTasks } from "../services/task.service";
import type { ApiSuccessResponse, PaginatedResponse } from "../types/api.types";
import type { CreateTaskDto } from "../types/dto.types";
import type { Task } from "../types/domain.types";
import type { TaskListQuery } from "../types/query.types";

type GetTasksResponse = PaginatedResponse<Task>;
type CreateTaskResponse = ApiSuccessResponse<Task>;

const taskRouter = Router();

taskRouter.get(
  "/tasks",
  async (
    req: Request<unknown, unknown, unknown, TaskListQuery>,
    res: Response<GetTasksResponse>,
    next: NextFunction,
  ) => {
    try {
      const result = await getTasks(req.query);
      res.status(200).json(result);
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