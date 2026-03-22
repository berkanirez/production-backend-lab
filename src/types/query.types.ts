import type { TaskStatus, UserRole } from "./domain.types";

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface UserListQuery extends PaginationQuery {
  role?: UserRole;
  isActive?: "true" | "false";
  sort?: "name_asc" | "name_desc" | "createdAt_asc" | "createdAt_desc";
}

export interface TaskListQuery extends PaginationQuery {
  status?: TaskStatus;
  projectId?: string;
  assigneeId?: string;
  sort?: "title_asc" | "title_desc" | "createdAt_asc" | "createdAt_desc";
}