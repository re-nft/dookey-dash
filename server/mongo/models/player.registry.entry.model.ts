import mongoose, { Schema } from "mongoose";

import { RegistryEntryVersion } from "@/common/types";

interface IPlayerRegistryEntry {
  address: string;
  signature: string;
  message: string;
  createdAt: Date;
  __v: RegistryEntryVersion;
}

const PlayerRegistryEntrySchema = new Schema<IPlayerRegistryEntry>(
  {
    address: { type: String, required: true, unique: true },
    signature: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, required: true },
    __v: { type: Number, required: true },
  },
  {
    collection: "playerRegistry",
    autoIndex: true,
    timestamps: { createdAt: "createdAt" },
  }
);

export const PlayerRegistryEntry: mongoose.Model<IPlayerRegistryEntry> =
  mongoose.models.PlayerRegistryEntry ||
  mongoose.model<IPlayerRegistryEntry>(
    "PlayerRegistryEntry",
    PlayerRegistryEntrySchema
  );

