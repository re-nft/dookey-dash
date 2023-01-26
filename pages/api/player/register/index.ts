import { NextApiRequest, NextApiResponse } from "next";
import {z} from 'zod';

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const PlayerRegistryEntrySchema = z.object({
    address: z.string().refine((address) => address.match(ethereumAddressRegex)),
    signature: z.string(),
    message: z.string(),
})

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'POST') res.status(405).json({OK: false, error: 'Method not allowed'});

    const {address, signature, message} = PlayerRegistryEntrySchema.parse(req.body);

    // TODO: validate signature

    // TODO: insert into db

    return res.status(201).json({OK: true});
}