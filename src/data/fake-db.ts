import type { Project, Task, User } from "../types/domain.types";

export const users: User[] = [
  {
    id: "u1",
    createdAt: "2026-03-15T10:00:00.000Z",
    updatedAt: "2026-03-15T10:00:00.000Z",
    deletedAt: null,
    name: "Berkan Irez",
    email: "berkan@example.com",
    role: "admin",
    isActive: true,
  },
  {
    id: "u2",
    createdAt: "2026-03-15T10:05:00.000Z",
    updatedAt: "2026-03-15T10:05:00.000Z",
    deletedAt: null,
    name: "Ayse Demir",
    email: "ayse@example.com",
    role: "manager",
    isActive: true,
  },
  {
    id: "u3",
    createdAt: "2026-03-15T10:10:00.000Z",
    updatedAt: "2026-03-15T10:10:00.000Z",
    deletedAt: null,
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    role: "member",
    isActive: false,
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    createdAt: "2026-03-15T11:00:00.000Z",
    updatedAt: "2026-03-15T11:00:00.000Z",
    deletedAt: null,
    name: "Production Backend Lab",
    description: "Learning backend architecture with TypeScript.",
    status: "active",
    ownerId: "u1",
  },
  {
    id: "p2",
    createdAt: "2026-03-15T11:10:00.000Z",
    updatedAt: "2026-03-15T11:10:00.000Z",
    deletedAt: null,
    name: "CRM Reporting Module",
    description: "Draft reporting module for internal dashboard work.",
    status: "draft",
    ownerId: "u2",
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    createdAt: "2026-03-15T12:00:00.000Z",
    updatedAt: "2026-03-15T12:00:00.000Z",
    deletedAt: null,
    title: "Set up project structure",
    description: "Initialize folders and TypeScript configuration.",
    status: "done",
    assigneeId: "u1",
    projectId: "p1",
  },
  {
    id: "t2",
    createdAt: "2026-03-15T12:10:00.000Z",
    updatedAt: "2026-03-15T12:10:00.000Z",
    deletedAt: null,
    title: "Add user endpoint",
    description: "Implement GET /users with fake data.",
    status: "in_progress",
    assigneeId: "u2",
    projectId: "p1",
  },
  {
    id: "t3",
    createdAt: "2026-03-15T12:20:00.000Z",
    updatedAt: "2026-03-15T12:20:00.000Z",
    deletedAt: null,
    title: "Review domain models",
    description: "Check shared entity fields and naming consistency.",
    status: "todo",
    assigneeId: "u3",
    projectId: "p2",
  },
];