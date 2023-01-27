import mongoose from "mongoose";

import { env } from "../env";

(async () => {
  if (!env.MONGO_URI)
    throw new Error("MONGO_URI is not defined in the environment.");

  if (!mongoose.connection.readyState) await mongoose.connect(env.MONGO_URI);
})();
