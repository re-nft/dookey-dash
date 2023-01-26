import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";

(async () => {
  const { combinedEnv: env } = loadEnvConfig(process.cwd());

  if (!env.MONGO_URI)
    throw new Error("MONGO_URI is not defined in the environment.");

  if (!mongoose.connection.readyState) await mongoose.connect(env.MONGO_URI);
})();
