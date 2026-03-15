import { Router, type Request, type Response } from "express";
import { projects } from "../data/fake-db";
import { successResponse } from "../common/http/response";
import type { ApiSuccessResponse } from "../types/api.types";
import type { Project } from "../types/domain.types";

type GetProjectsResponse = ApiSuccessResponse<Project[]>;

const projectRouter = Router();

projectRouter.get(
  "/projects",
  (_req: Request, res: Response<GetProjectsResponse>) => {
    const responseBody = successResponse(
      projects,
      "Projects fetched successfully.",
    );

    res.status(200).json(responseBody);
  },
);

export { projectRouter };