export type RegistryEntryVersion = 0;

export interface IRegistryEntry {
  address: string;
  signature: string;
  message: string;
  createdAt: Date;
  __v: RegistryEntryVersion;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextPage: number | false;
}

export type ErrorResponse = { error: string };
