import type { NextPage } from "next";
import React from "react";
import {useDelegateCash} from "use-delegatecash";
import {useAccount} from "wagmi";

import {compareAddresses} from "@/common/address.utils";
import {PlayerWithDookeyStats} from "@/common/stats.utils";
import {Player, useDelegatedAddresses, useIsRegistered} from "@/react/api";
import { WaitingRoomListItem } from "@/react/components/list-item/list-item";
import { useDelegateToModal, useWaitingListModal} from "@/react/modals";
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
  const delegateCash = useDelegateCash();

  const { open: openDelegateToModal } = useDelegateToModal();
  const { open: openRevokeModal } = useRevokeModal();
  const { open: openWaitingListModal } = useWaitingListModal();

  const {
    addresses: delegatedAddresses,
    refetch: refetchDelegatedAddresses,
  } = useDelegatedAddresses();

  //const onClickDelegate = React.useCallback(
  //  async ({address}: Player) => {
  //    try {
  //      openAllowModal({address});
  //      await delegateCash.delegateForContract(
  //        address,
  //        CONTRACT_ADDRESS_SEWER_PASS,
  //        true
  //      );
  //      await refetchDelegatedAddresses();
  //    } catch (e) {
  //      console.error(e);
  //    }
  //  },
  //  [delegateCash, openAllowModal, refetchDelegatedAddresses]
  //);

  const onClickRevoke = React.useCallback(async (player: Player) => {
    try {
      openRevokeModal({nameOfRevokedToken: "Sewer Pass"});
      await delegateCash.revokeDelegate(player.address);
      await refetchDelegatedAddresses();
    } catch (e) {
      console.error(e);
    }
  }, [delegateCash, openRevokeModal, refetchDelegatedAddresses]);

  const [key, setKey] = React.useState(0);
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
      <PlayersScroll
        key={String(key)}
        renderLoading={() => <></>}
        renderPlayer={(player: PlayerWithDookeyStats) => {
          const hasBeenDelegatedToByCurrentUser = Boolean(delegatedAddresses
            .find(addr => compareAddresses(addr, player.address)));
          return (
            <WaitingRoomListItem
              {...player}
              // Defines whether the current wallet has delegated to this player.
              hasBeenDelegatedToByCurrentUser={hasBeenDelegatedToByCurrentUser}
              //onClickDelegate={() => onClickDelegate(player)}
              onClickDelegate={() => openDelegateToModal(player)}
              onClickRevoke={() => onClickRevoke(player)}
            />
          );
        }}
      />
    </div>
  );
};

export default Home;
