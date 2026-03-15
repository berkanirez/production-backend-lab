import { Router, type Request, type Response } from "express";
import { users } from "../data/fake-db";
import { successResponse } from "../common/http/response";
import type { ApiSuccessResponse } from "../types/api.types";
import type { User } from "../types/domain.types";

type GetUsersResponse = ApiSuccessResponse<User[]>;

const userRouter = Router();

userRouter.get("/users", (_req: Request, res: Response<GetUsersResponse>) => {
  const responseBody = successResponse(users, "Users fetched successfully.");

  res.status(200).json(responseBody);
});

export { userRouter };