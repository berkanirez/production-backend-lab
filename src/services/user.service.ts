import { users } from "../data/fake-db";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from "../common/errors";
import type { CreateUserDto } from "../types/dto.types";
import type { User, UserRole } from "../types/domain.types";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function generateId(prefix: string, currentCount: number): string {
  return `${prefix}${currentCount + 1}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

export async function getUserById(id: string): Promise<User> {
  await wait(300);

  const user = users.find((item) => item.id === id);

  if (!user) {
    throw new NotFoundError("User not found.", "USER_NOT_FOUND");
  }

  return user;
}

export async function getUsers(): Promise<User[]> {
  await wait(150);
  return users;
}

export async function createUser(input: CreateUserDto): Promise<User> {
  await wait(250);

  if (!input.name || !input.email || !input.role) {
    throw new BadRequestError(
      "name, email and role are required.",
      "CREATE_USER_REQUIRED_FIELDS",
    );
  }

  const existingUser = users.find((item) => item.email === input.email);

  if (existingUser) {
    throw new ConflictError(
      "A user with this email already exists.",
      "USER_EMAIL_ALREADY_EXISTS",
    );
  }

  const timestamp = nowIso();

  const newUser: User = {
    id: generateId("u", users.length),
    createdAt: timestamp,
    updatedAt: timestamp,
    deletedAt: null,
    name: input.name,
    email: input.email,
    role: input.role,
    isActive: input.isActive ?? true,
  };

  users.push(newUser);

  return newUser;
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
    throw new NotFoundError(
      "User with this email was not found.",
      "USER_EMAIL_NOT_FOUND",
    );
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