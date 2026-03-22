import { Router, type NextFunction, type Request, type Response } from "express";
import { successResponse } from "../common/http/response";
import { createProject, getProjects } from "../services/project.service";
import type { ApiSuccessResponse } from "../types/api.types";
import type { CreateProjectDto } from "../types/dto.types";
import type { Project } from "../types/domain.types";

type GetProjectsResponse = ApiSuccessResponse<Project[]>;
type CreateProjectResponse = ApiSuccessResponse<Project>;

const projectRouter = Router();

projectRouter.get(
  "/projects",
  async (_req: Request, res: Response<GetProjectsResponse>, next: NextFunction) => {
    try {
      const projectList = await getProjects();
      const responseBody = successResponse(projectList, "Projects fetched successfully.");
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
);

projectRouter.post(
  "/projects",
  async (
    req: Request<unknown, unknown, CreateProjectDto>,
    res: Response<CreateProjectResponse>,
    next: NextFunction,
  ) => {
    try {
      const newProject = await createProject(req.body);
      const responseBody = successResponse(newProject, "Project created successfully.");
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
);

export { projectRouter };