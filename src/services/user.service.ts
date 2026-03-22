import { users } from "../data/fake-db";
import { AppError } from "../common/errors/app-error";
import type { User } from "../types/domain.types";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getUserById(id: string): Promise<User> {
  await wait(300);

  const user = users.find((item) => item.id === id);

  if (!user) {
    throw new AppError("User not found.", 404, "USER_NOT_FOUND");
  }

  return user;
}