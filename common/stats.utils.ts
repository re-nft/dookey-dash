import axios from "axios";

import {compareAddresses} from "@/common/address.utils";
import { Player } from "@/react/api/players";

export type DookeyStatsPlayer = {
  readonly address: string;
  //readonly boost_count: number;
  //readonly rank: number;
  readonly score: number;
};

export type PlayerWithDookeyStats = Player & Pick<DookeyStatsPlayer, 'score'>;

export const playerToPlayerWithDookeyStats = async (
  player: Player
): Promise<PlayerWithDookeyStats> => {
  try {
    const {address} = player;
    const {data} = await axios<readonly DookeyStatsPlayer[]>({
        url: `https://api.dookeystats.com/wallet/${address}`,
    });
    const maybePlayer = data?.find(d => compareAddresses(d.address, address));

    if (!maybePlayer) throw new Error(`Failed to find player "${player.address}".`);

    const score = maybePlayer?.score || 0;

    return {...player, score};
  } catch (e) {
    return {...player, score: 0};
  }
};
