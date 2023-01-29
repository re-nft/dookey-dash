import type { NextPage } from "next";
import React from "react";
import {useAccount} from "wagmi";

import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";
import {Player, useIsRegistered, usePlayer} from "@/react/api";
import { WaitingRoomListItem } from "@/react/components/list-item/list-item";
import { useAllowModal, useWaitingListModal } from "@/react/modals";
import { useRevokeModal } from "@/react/modals/hooks/useRevokeModal";
import { PlayerRegisterButton, PlayersScroll } from "@/react/players";
import {useDelegateCash} from "use-delegatecash";
import {PlayerWithDookeyStats} from "@/common/stats.utils";

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

  const delegateCash = useDelegateCash();

  const { open: openAllowModal } = useAllowModal();

  const onClickToDelegate = React.useCallback(
    async ({address}: Player) => {
      try {
        await Promise.race([
          openAllowModal({address}),
          delegateCash.delegateForContract(
            address,
            CONTRACT_ADDRESS_SEWER_PASS,
            true
          ),
        ]);
      } catch (e) {
        console.error(e);
      }
    },
    [delegateCash, openAllowModal]
  );

  const [key, setKey] = React.useState(0);

  const { open: openWaitingListModal } = useWaitingListModal();
  const { open: openRevokeModal } = useRevokeModal();

  const {address} = useAccount();

  const {
    isRegistered,
    loading: loadingIsRegistered,
    refetch: refetchIsRegistered,
  } = useIsRegistered({
    address,
  });

  const onDidRegister = React.useCallback(() => {
    // HACK: This is expensive! But it's a simple way to refresh the player list once we've registered.
    setKey(k => k + 1);
    refetchIsRegistered().then(openWaitingListModal);
  }, [openWaitingListModal, refetchIsRegistered]);

  return (
    <div className="w-full flex flex-col h-full">
      {!isRegistered && !loadingIsRegistered && (
        <PlayerRegisterButton onDidRegister={onDidRegister} />
      )}
      <button
        children="open revoke modal"
        onClick={() => openRevokeModal({ nameOfRevokedToken: "someTokenName" })}
      />
      <PlayersScroll
        key={String(key)}
        renderLoading={() => <></>}
        renderPlayer={(player: PlayerWithDookeyStats) => (
          <WaitingRoomListItem
            {...player}
            connected={true}
            onClick={() => onClickToDelegate(player)}
          />
        )}
      />
    </div>
  );
};

export default Home;
