
export type RegistryEntryVersion = 0;

export interface IRegistryEntry {
    address: string;
    signature: string;
    message: string;
    __v: RegistryEntryVersion;
}


export interface PaginatedResponse<T>{
    data: T[];
    page: number;
}