import type { NextPage } from "next";
import React from "react";

import {Player, usePlayer, usePlayers, useRegister} from "@/react/api";
import {PlayersScroll} from "@/react/player";
import {DelegateCash} from "delegatecash";
import {useClient} from "wagmi";
import {ethers} from "ethers";

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
  const { data: players } = usePlayers();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: { result: player } = {} } = usePlayer({
    address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b".toLowerCase(),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register } = useRegister();

  const {provider} = useClient<
    ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
  >();

  const onClickToDelegate = React.useCallback((player: Player) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dc = new DelegateCash(provider);
    console.log('hi', player.address);
  }, [provider]);

  return (
    <div className="w-full flex flex-col h-full">
      <PlayersScroll
        renderLoading={() => (<></>)}
        renderPlayer={(player: Player) => (
          <div style={{height: 1000, border: '1px solid red'}}>
            <span>Player {player.address}</span>
            <span>Message: {player.message}</span>
            {/* TODO: if a pass owner only */}
            <button
              onClick={() => onClickToDelegate(player)}>
                Click to delegate
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default Home;
