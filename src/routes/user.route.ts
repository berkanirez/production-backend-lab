import { Router, type NextFunction, type Request, type Response } from "express";
import { users } from "../data/fake-db";
import { successResponse } from "../common/http/response";
import { getUserById } from "../services/user.service";
import { AppError } from "../common/errors/app-error";
import type { ApiErrorResponse, ApiSuccessResponse } from "../types/api.types";
import type { User } from "../types/domain.types";

type GetUsersResponse = ApiSuccessResponse<User[]>;
type GetUserByIdResponse = ApiSuccessResponse<User>;
type GetUserErrorResponse = ApiErrorResponse;

const userRouter = Router();

userRouter.get("/users", (_req: Request, res: Response<GetUsersResponse>) => {
  const responseBody = successResponse(users, "Users fetched successfully.");

  res.status(200).json(responseBody);
});

userRouter.get(
  "/users/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<GetUserByIdResponse | GetUserErrorResponse>,
    next: NextFunction,
  ) => {
    try {
      const user = await getUserById(req.params.id);
      const responseBody = successResponse(user, "User fetched successfully.");

      res.status(200).json(responseBody);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          errorCode: error.errorCode,
        });

        return;
      }

      next(error);
    }
  },
);

export { userRouter };