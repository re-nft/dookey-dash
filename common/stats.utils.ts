import axios from "axios";

import { compareAddresses } from "@/common/address.utils";
import { Player } from "@/react/api/players";
import {astroCatThunk} from "@/common/alchemy.utils";

export type DookeyStatsPlayer = {
  readonly address: string;
  //readonly boost_count: number;
  //readonly rank: number;
  readonly score: number;
};

export type PlayerWithDookeyStats = Player & Pick<DookeyStatsPlayer, "score"> & {
  readonly hasAstrocat: boolean;
};

export const playerToPlayerWithDookeyStats = async (
  player: Player
): Promise<PlayerWithDookeyStats> => {
  try {
    // dookeystats api is case sensitive
    const address = player.address.toLocaleLowerCase();

    const hasAstrocat = !!(await astroCatThunk()).find(addr => compareAddresses(addr, address));

    const { data } = await axios<readonly DookeyStatsPlayer[]>({
      url: `https://api.dookeystats.com/wallet/${address}`,
    });

    const maybePlayer = data?.find((d) => compareAddresses(d.address, address));

    if (!maybePlayer) throw new Error(`Failed to find player "${address}".`);

    const score = maybePlayer?.score || 0;

    return { ...player, score, hasAstrocat };
  } catch (e) {
    return { ...player, score: 0, hasAstrocat: false};
  }
};
