import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "test" | "production";

interface Env {
  PORT: number;
  NODE_ENV: NodeEnv;
  APP_NAME: string;
}

function getPort(value: string | undefined): number {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return 3000;
  }

  return parsed;
}

function getNodeEnv(value: string | undefined): NodeEnv {
  if (
    value === "development" ||
    value === "test" ||
    value === "production"
  ) {
    return value;
  }

  return "development";
}

export const env: Env = {
  PORT: getPort(process.env.PORT),
  NODE_ENV: getNodeEnv(process.env.NODE_ENV),
  APP_NAME: process.env.APP_NAME || "production-backend-lab",
};