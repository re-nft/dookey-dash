import { loadEnvConfig } from "@next/env";

const { combinedEnv: env } = loadEnvConfig(process.cwd());

export { env };
