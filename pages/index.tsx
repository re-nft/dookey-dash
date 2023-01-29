import type { NextPage } from "next";
import React from "react";
import {useDelegateCash} from "use-delegatecash";
import {useAccount} from "wagmi";

import {PlayerWithDookeyStats} from "@/common/stats.utils";
import { CONTRACT_ADDRESS_SEWER_PASS } from "@/config";
import {Player, useDelegatedAddresses, useIsRegistered, usePlayer} from "@/react/api";
import { WaitingRoomListItem } from "@/react/components/list-item/list-item";
import { useAllowModal, useWaitingListModal } from "@/react/modals";
import { useRevokeModal } from "@/react/modals/hooks/useRevokeModal";
import { PlayerRegisterButton, PlayersScroll } from "@/react/players";
import {compareAddresses} from "@/common/address.utils";
import de from "@walletconnect/qrcode-modal/dist/cjs/browser/languages/de";

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
  const {
    addresses: delegatedAddresses,
    refetch: refetchDelegatedAddresses,
  } = useDelegatedAddresses();

  const { open: openRevokeModal } = useRevokeModal();

  const onClickDelegate = React.useCallback(
    async ({address}: Player) => {
      try {
        openAllowModal({address});
        await delegateCash.delegateForContract(
          address,
          CONTRACT_ADDRESS_SEWER_PASS,
          true
        );
        await refetchDelegatedAddresses();
      } catch (e) {
        console.error(e);
      }
    },
    [delegateCash, openAllowModal, refetchDelegatedAddresses]
  );

  const onClickRevoke = React.useCallback(async (player: Player) => {
    try {
      openRevokeModal({nameOfRevokedToken: 'Sewer Pass'});
      await delegateCash.revokeDelegate(player.address);
      await refetchDelegatedAddresses();
    } catch (e) {
      console.error(e);
    }
  }, [delegateCash, openRevokeModal, refetchDelegatedAddresses]);

  const [key, setKey] = React.useState(0);

  const { open: openWaitingListModal } = useWaitingListModal();

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
          const hasBeenDelegatedToByCurrentUser = !!delegatedAddresses
            .find(addr => compareAddresses(addr, player.address));
          return (
            <WaitingRoomListItem
              {...player}
              // Defines whether the current wallet has delegated to this player.
              hasBeenDelegatedToByCurrentUser={hasBeenDelegatedToByCurrentUser}
              onClickDelegate={() => onClickDelegate(player)}
              onClickRevoke={() => onClickRevoke(player)}
            />
          );
        }}
      />
    </div>
  );
};

export default Home;
