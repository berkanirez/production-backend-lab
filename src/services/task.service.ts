import { projects, tasks, users } from "../data/fake-db";
import { BadRequestError, NotFoundError } from "../common/errors";
import type { PaginatedResponse } from "../types/api.types";
import type { CreateTaskDto } from "../types/dto.types";
import type { Task } from "../types/domain.types";
import type { TaskListQuery } from "../types/query.types";

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

export async function getTasks(query: TaskListQuery): Promise<PaginatedResponse<Task>> {
  await wait(150);

  const page = parsePositiveNumber(query.page, 1);
  const limit = parsePositiveNumber(query.limit, 10);

  let filteredTasks = [...tasks];

  if (query.status) {
    filteredTasks = filteredTasks.filter((item) => item.status === query.status);
  }

  if (query.projectId) {
    filteredTasks = filteredTasks.filter((item) => item.projectId === query.projectId);
  }

  if (query.assigneeId) {
    filteredTasks = filteredTasks.filter((item) => item.assigneeId === query.assigneeId);
  }

  if (query.sort === "title_asc") {
    filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (query.sort === "title_desc") {
    filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (query.sort === "createdAt_asc") {
    filteredTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  if (query.sort === "createdAt_desc") {
    filteredTasks.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const totalItems = filteredTasks.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + limit);

  return {
    success: true,
    message: "Tasks fetched successfully.",
    data: paginatedTasks,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
}

export async function createTask(input: CreateTaskDto): Promise<Task> {
  await wait(250);

  if (!input.title || !input.description || !input.assigneeId || !input.projectId) {
    throw new BadRequestError(
      "title, description, assigneeId and projectId are required.",
      "CREATE_TASK_REQUIRED_FIELDS",
    );
  }

  const assignee = users.find((item) => item.id === input.assigneeId);
  if (!assignee) {
    throw new NotFoundError("Assignee user not found.", "TASK_ASSIGNEE_NOT_FOUND");
  }

  const project = projects.find((item) => item.id === input.projectId);
  if (!project) {
    throw new NotFoundError("Project not found.", "TASK_PROJECT_NOT_FOUND");
  }

  const timestamp = nowIso();

  const newTask: Task = {
    id: generateId("t", tasks.length),
    createdAt: timestamp,
    updatedAt: timestamp,
    deletedAt: null,
    title: input.title,
    description: input.description,
    status: input.status ?? "todo",
    assigneeId: input.assigneeId,
    projectId: input.projectId,
  };

  tasks.push(newTask);

  return newTask;
}