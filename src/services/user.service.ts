import { users } from "../data/fake-db";
import { ForbiddenError, NotFoundError, BadRequestError } from "../common/errors";
import type { User, UserRole } from "../types/domain.types";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getUserById(id: string): Promise<User> {
  await wait(300);

  const user = users.find((item) => item.id === id);

  if (!user) {
    throw new NotFoundError("User not found.", "USER_NOT_FOUND");
  }

  return user;
}

export async function getAdminOnlyMessage(role: UserRole): Promise<string> {
  await wait(200);

  if (role !== "admin") {
    throw new ForbiddenError(
      "You do not have permission to access this resource.",
      "ADMIN_ONLY_RESOURCE",
    );
  }

  return "Welcome to the admin-only resource.";
}

export async function findUserByEmail(email: string): Promise<User> {
  await wait(200);

  if (!email || !email.includes("@")) {
    throw new BadRequestError(
      "A valid email address is required.",
      "INVALID_EMAIL",
    );
  }

  const user = users.find((item) => item.email === email);

  if (!user) {
    throw new NotFoundError("User with this email was not found.", "USER_EMAIL_NOT_FOUND");
  }

  return user;
}