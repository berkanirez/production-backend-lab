import type { ProjectStatus, TaskStatus, UserRole } from "./domain.types";

export interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  status?: ProjectStatus;
  ownerId: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status?: TaskStatus;
  assigneeId: string;
  projectId: string;
}