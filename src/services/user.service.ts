import { users } from "../data/fake-db";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../common/errors";
import type { PaginatedResponse } from "../types/api.types";
import type { CreateUserDto } from "../types/dto.types";
import type { User, UserRole } from "../types/domain.types";
import type { UserListQuery } from "../types/query.types";

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

function parsePositiveNumber(value: string | undefined, defaultValue: number): number {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return defaultValue;
  }

  return parsed;
}

export async function getUserById(id: string): Promise<User> {
  await wait(300);

  const user = users.find((item) => item.id === id);

  if (!user) {
    throw new NotFoundError("User not found.", "USER_NOT_FOUND");
  }

  return user;
}

export async function getUsers(query: UserListQuery): Promise<PaginatedResponse<User>> {
  await wait(150);

  const page = parsePositiveNumber(query.page, 1);
  const limit = parsePositiveNumber(query.limit, 10);

  let filteredUsers = [...users];

  if (query.role) {
    filteredUsers = filteredUsers.filter((item) => item.role === query.role);
  }

  if (query.isActive === "true") {
    filteredUsers = filteredUsers.filter((item) => item.isActive === true);
  }

  if (query.isActive === "false") {
    filteredUsers = filteredUsers.filter((item) => item.isActive === false);
  }

  if (query.sort === "name_asc") {
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (query.sort === "name_desc") {
    filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (query.sort === "createdAt_asc") {
    filteredUsers.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  if (query.sort === "createdAt_desc") {
    filteredUsers.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

  return {
    success: true,
    message: "Users fetched successfully.",
    data: paginatedUsers,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
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