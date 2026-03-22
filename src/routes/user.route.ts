import { Router, type NextFunction, type Request, type Response } from "express";
import { successResponse } from "../common/http/response";
import { createUser, getUserById, getUsers } from "../services/user.service";
import type { ApiSuccessResponse } from "../types/api.types";
import type { CreateUserDto } from "../types/dto.types";
import type { User } from "../types/domain.types";

type GetUsersResponse = ApiSuccessResponse<User[]>;
type GetUserByIdResponse = ApiSuccessResponse<User>;
type CreateUserResponse = ApiSuccessResponse<User>;

const userRouter = Router();

userRouter.get(
  "/users",
  async (_req: Request, res: Response<GetUsersResponse>, next: NextFunction) => {
    try {
      const userList = await getUsers();
      const responseBody = successResponse(userList, "Users fetched successfully.");
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
);

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

userRouter.post(
  "/users",
  async (
    req: Request<unknown, unknown, CreateUserDto>,
    res: Response<CreateUserResponse>,
    next: NextFunction,
  ) => {
    try {
      const newUser = await createUser(req.body);
      const responseBody = successResponse(newUser, "User created successfully.");
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
);

export { userRouter };