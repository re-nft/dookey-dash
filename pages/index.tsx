import { DelegateCash } from "delegatecash";
import { ethers } from "ethers";
import type { NextPage } from "next";
import React from "react";
import { useClient } from "wagmi";

import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";
import { Player, usePlayer } from "@/react/api";
import Jazzicon from "@/react/components/jazzicon";
import { ListItem } from "@/react/components/list-item/list-item";
import { useAllowModal, useWaitingListModal } from "@/react/modals";
import { useRevokeModal } from "@/react/modals/hooks/useRevokeModal";
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

  const [key, setKey] = React.useState(0);

  const { open: openWaitingListModal } = useWaitingListModal();
  const { open: openAllowModal } = useAllowModal();
  const { open: openRevokeModal } = useRevokeModal();

  return (
    <div className="w-full flex flex-col h-full">
      <PlayerRegisterButton
        // HACK: This is expensive! But it's a simple way to refresh the player list once we've registered.
        onDidRegister={React.useCallback(() => setKey((i) => i + 1), [])}
      />
      <button children="open waiting modal" onClick={openWaitingListModal} />
      <button children="open allow modal" onClick={openAllowModal} />
      <button children="open revoke modal" onClick={openRevokeModal} />
      <PlayersScroll
        key={String(key)}
        renderLoading={() => <></>}
        renderPlayer={(player: Player) => (
          <ListItem
            key={`player-${player.address}`}
            title={
              <div className="flex">
                <Jazzicon
                  className="w-10 h-10 rounded-full"
                  address={player.address}
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {player.address}
                  </div>
                </div>
              </div>
            }
            actions={
              <div className="flex">
                {/* TODO: if a pass owner only */}
                <button
                  className="rounded-lg p-3 px-5 bg-transparent border-white/50 hover:bg-white/80 text-sm shadow-sm shadow-indigo-500/30 hover:shadow-indigo-500/40"
                  onClick={() => onClickToDelegate(player)}
                >
                  Delegate
                </button>
              </div>
            }
          >
            <div className="flex">
              <span>{player.message}</span>
            </div>
          </ListItem>
        )}
      />
    </div>
  );
};

export default Home;
