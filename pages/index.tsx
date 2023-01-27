import { DelegateCash } from "delegatecash";
import { ethers } from "ethers";
import type { NextPage } from "next";
import React from "react";
import { useClient } from "wagmi";

import { Player, usePlayer } from "@/react/api";
import { CONTRACT_ADDRESS_SEWER_PASS } from "@/react/consts";
import { PlayerRegisterButton, PlayersScroll } from "@/react/players";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await unstable_getServerSession(
//     ctx.req,
//     ctx.res,
//     authOptions
//   );

//   console.log(session);

//   return {
//     props: { session },
//   };
// };
//

const Home: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: { result: player } = {} } = usePlayer({
    address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b".toLowerCase(),
  });

  const { provider } = useClient<
    ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
  >();

  const onClickToDelegate = React.useCallback(
    async (player: Player) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dc = new DelegateCash(provider);

        await dc.delegateForContract(
          player.address,
          CONTRACT_ADDRESS_SEWER_PASS,
          true
        );
      } catch (e) {
        console.error(e);
      }
    },
    [provider]
  );

  return (
    <div className="w-full flex flex-col h-full">
      <PlayerRegisterButton />
      <PlayersScroll
        renderLoading={() => <></>}
        renderPlayer={(player: Player) => (
          <div style={{ height: 100, border: "1px solid red" }}>
            <span>Player {player.address}</span>
            <span>Message: {player.message}</span>
            {/* TODO: if a pass owner only */}
            <button onClick={() => onClickToDelegate(player)}>
              Click to delegate
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default Home;
