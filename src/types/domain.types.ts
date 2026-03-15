export type UserRole = "admin" | "manager" | "member";

export type ProjectStatus = "draft" | "active" | "completed";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface Project extends BaseEntity {
  name: string;
  description: string;
  status: ProjectStatus;
  ownerId: string;
}

export interface Task extends BaseEntity {
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
  projectId: string;
}