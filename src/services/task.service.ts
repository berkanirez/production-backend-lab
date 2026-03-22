import { projects, tasks, users } from "../data/fake-db";
import { BadRequestError, NotFoundError } from "../common/errors";
import type { CreateTaskDto } from "../types/dto.types";
import type { Task } from "../types/domain.types";

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

export async function getTasks(): Promise<Task[]> {
  await wait(150);
  return tasks;
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