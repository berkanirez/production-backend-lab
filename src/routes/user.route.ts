import { Router, type Request, type Response } from "express";
import { users } from "../data/fake-db";
import type { User } from "../types/domain.types";

interface GetUsersResponse {
  success: true;
  message: string;
  data: User[];
  count: number;
}

const userRouter = Router();

userRouter.get(
  "/users",
  (_req: Request, res: Response<GetUsersResponse>) => {
    const responseBody: GetUsersResponse = {
      success: true,
      message: "Users fetched successfully.",
      data: users,
      count: users.length,
    };

    res.status(200).json(responseBody);
  },
);

export { userRouter };