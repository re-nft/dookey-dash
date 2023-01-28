import { DelegateCash } from "delegatecash";
import { ethers } from "ethers";
import type { NextPage } from "next";
import React from "react";
import { useClient } from "wagmi";

import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";
import { Player, usePlayer } from "@/react/api";
import { WaitingRoomListItem } from "@/react/components/list-item/list-item";
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
      <button
        children="open allow modal"
        onClick={() => openAllowModal({ address: "someUserAddress" })}
      />
      <button
        children="open revoke modal"
        onClick={() => openRevokeModal({ nameOfRevokedToken: "someTokenName" })}
      />
      <PlayersScroll
        key={String(key)}
        renderLoading={() => <></>}
        renderPlayer={(player: Player) => (
          <WaitingRoomListItem
            connected={true}
            address={player.address}
            onClick={() => onClickToDelegate(player)}
          />
        )}
      />
    </div>
  );
};

export default Home;
