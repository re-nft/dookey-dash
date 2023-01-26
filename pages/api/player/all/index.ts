import { NextApiRequest, NextApiResponse } from "next";

export type RegistryEntryVersion = 0;

interface IRegistryEntry {
    address: string;
    signature: string;
    message: string;
    __v: RegistryEntryVersion;
}

// TODO: replace with real signatures!

const registry: IRegistryEntry[] = [
    {
        address: '0x0f00',
        signature: 'my signature',
        message: 'my message f00',
        __v: 0,
    },
    {
        address: '0x0f01',
        signature: 'my signature',
        message: 'my message f01',
        __v: 0,
    },
    {
        address: '0x0f02',
        signature: 'my signature',
        message: 'my message f02',
        __v: 0,
    }
]

interface PaginatedResponse<T>{
    data: T[];
    page: number;
}

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<PaginatedResponse<Omit<IRegistryEntry, 'signature'>>>
) {
    const response = registry.map(({signature, ...rest}) => rest);

    return res.status(200).json({data: response, page: 0});
}