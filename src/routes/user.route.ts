import { Router, type NextFunction, type Request, type Response } from "express";
import { users } from "../data/fake-db";
import { successResponse } from "../common/http/response";
import { getUserById } from "../services/user.service";
import type { ApiSuccessResponse } from "../types/api.types";
import type { User } from "../types/domain.types";

type GetUsersResponse = ApiSuccessResponse<User[]>;
type GetUserByIdResponse = ApiSuccessResponse<User>;

const userRouter = Router();

userRouter.get("/users", (_req: Request, res: Response<GetUsersResponse>) => {
  const responseBody = successResponse(users, "Users fetched successfully.");
  res.status(200).json(responseBody);
});

userRouter.get(
  "/users/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<GetUserByIdResponse>,
    next: NextFunction,
  ) => {
    try {
      const user = await getUserById(req.params.id);
      const responseBody = successResponse(user, "User fetched successfully.");
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
);

export { userRouter };