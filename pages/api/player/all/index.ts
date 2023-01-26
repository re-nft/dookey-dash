import { NextApiRequest, NextApiResponse } from "next";
import { IRegistryEntry, PaginatedResponse } from "../../../../common/types";

const registry: IRegistryEntry[] = [
    {
        address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b",
        message: "{}",
        signature: "0x5587a0b167dd1c672ff4fc8b78ac0a18ad4e6195ba65751e45b4542ae0b59a5613171755700f87b97eecd163b5231052714627b5aa36b2a4f689de4ab07f7a3d1b",
        __v: 0
    },
    {
        address: "0x938CF6514cC309dd081A73330F30B42C9d7c5587",
        message: "{}",
        signature: "0x84e9085e793362cccccb1a09f5076ee425f83ad72831ed388a84d671b364b73e59730ac3fb04a3d35fb662e69fc30aa2baf0a604083df3218b6a65a2c474e5361b",
        __v: 0
    },
    {
        address: "0xDa20F5f6e85A33C2E53C2A2c6B3527AC85d2d326",
        message: "{}",
        signature: "0x3b70d71f05887b05dc6b5cc340df38d4a58cbd3fce93ca55b55b0e7219f971013c3ecaf6365b9167daa07015a78aaa6ea5e8374bfca82db4c453da4702a918501c",
        __v: 0
    },
    {
        address: "0x4bD5019f9d77002862F9560eCA2A55E54aDE8b16",
        message: "{}",
        signature: "0xf896fa85c9ae19d41bc50002d22d784def480cebf747b63bbab01ee895ddbf3270629093c76e5d9cdcab6911d67587ccbe5be0a2d7adc6f08ab4dfd80e5a617b1c",
        __v: 0
    },
    {
        address: "0xe9D966d6106423b0ba5D742AbD784eB046d36C8d",
        message: "{}",
        signature: "0xbddefec9ddc874705110b4ed6edd3b3122d61d849a0b7131d504a24cd8a3f83d5b71176f3db2c19c0ec889f5604467419d21ac1c09b7e67e8054b346032b46011b",
        __v: 0
    }
]

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<PaginatedResponse<Omit<IRegistryEntry, 'signature'>>>
) {
    const response = registry.map(({signature, ...rest}) => rest);

    return res.status(200).json({data: response, page: 0});
}