import { projects, users } from "../data/fake-db";
import { BadRequestError, NotFoundError } from "../common/errors";
import type { CreateProjectDto } from "../types/dto.types";
import type { Project } from "../types/domain.types";

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

export async function getProjects(): Promise<Project[]> {
  await wait(150);
  return projects;
}

export async function createProject(input: CreateProjectDto): Promise<Project> {
  await wait(250);

  if (!input.name || !input.description || !input.ownerId) {
    throw new BadRequestError(
      "name, description and ownerId are required.",
      "CREATE_PROJECT_REQUIRED_FIELDS",
    );
  }

  const owner = users.find((item) => item.id === input.ownerId);

  if (!owner) {
    throw new NotFoundError("Owner user not found.", "PROJECT_OWNER_NOT_FOUND");
  }

  const timestamp = new Date().toISOString();

  const newProject: Project = {
    id: generateId("p", projects.length),
    createdAt: timestamp,
    updatedAt: timestamp,
    deletedAt: null,
    name: input.name,
    description: input.description,
    status: input.status ?? "draft",
    ownerId: input.ownerId,
  };

  projects.push(newProject);

  return newProject;
}