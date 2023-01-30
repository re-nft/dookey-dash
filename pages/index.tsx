import { useConnectModal } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useDelegateCash } from "use-delegatecash";
import { useAccount } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import { PlayerWithDookeyStats } from "@/common/stats.utils";
import {
  Player,
  useDelegatedAddresses,
  useRegister,
  useSewerPasses,
} from "@/react/api";
import { Button } from "@/react/components/button";
import { Cover } from "@/react/components/Cover";
import { WaitingRoomListItem } from "@/react/components/list-item/list-item";
import { useWaitingListModal } from "@/react/modals";
import { useRevokeModal } from "@/react/modals/hooks/useRevokeModal";
import { PlayersScroll } from "@/react/players";

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

  const { open: openRevokeModal } = useRevokeModal();
  const { open: openWaitingListModal } = useWaitingListModal();

  const { addresses: delegatedAddresses, refetch: refetchDelegatedAddresses } =
    useDelegatedAddresses();

  const router = useRouter();

  const onClickRevoke = React.useCallback(
    async (player: Player) => {
      try {
        openRevokeModal({ nameOfRevokedToken: "Sewer Pass" });
        await delegateCash.revokeDelegate(player.address);
        await refetchDelegatedAddresses();
      } catch (e) {
        console.error(e);
      }
    },
    [delegateCash, openRevokeModal, refetchDelegatedAddresses]
  );

  const [key, setKey] = React.useState(0);
  const { register } = useRegister();

  const onDidRegister = React.useCallback(() => {
    // HACK: This is expensive! But it's a simple way to refresh the player list once we've registered.
    setKey((k) => k + 1);
    openWaitingListModal({});
  }, [openWaitingListModal]);

  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const shouldRegisterOnLogin = React.useRef<boolean>(false);

  React.useEffect(
    () =>
      void (async () => {
        if (!isConnected || !shouldRegisterOnLogin.current) return;
        shouldRegisterOnLogin.current = false;

        await register({}).then(onDidRegister).catch(onDidRegister);
      })(),
    [isConnected, register, onDidRegister]
  );

  const sewerPasses = useSewerPasses({
    address: address,
  });
  const hasSewersPasses = sewerPasses.data && sewerPasses.data.length > 0;

  const onRegister = React.useCallback(async () => {
    try {
      if (!isConnected) {
        shouldRegisterOnLogin.current = true;
        return openConnectModal?.();
      }
      await register({});
      await onDidRegister();
    } catch (e) {
      console.error(e);
    }
  }, [isConnected, register, onDidRegister, openConnectModal]);

  const onLetOthersPlay = React.useCallback(async () => {
    try {
      await openConnectModal?.();
    } catch (e) {
      console.error(e);
    }
  }, [openConnectModal]);

  return (
    <Fragment>
      <Cover>
        <Button onClick={onRegister}>I Want to play</Button>
        {hasSewersPasses > 0 && (
          <Button onClick={onLetOthersPlay}>Let others Play</Button>
        )}
      </Cover>
      <div className="w-full flex flex-col h-full">
        <PlayersScroll
          key={String(key)}
          renderLoading={() => <></>}
          renderPlayer={(player: PlayerWithDookeyStats) => {
            const hasBeenDelegatedToByCurrentUser = Boolean(
              delegatedAddresses.find((addr) =>
                compareAddresses(addr, player.address)
              )
            );
            return (
              <WaitingRoomListItem
                {...player}
                // Defines whether the current wallet has delegated to this player.
                hasBeenDelegatedToByCurrentUser={
                  hasBeenDelegatedToByCurrentUser
                }
                onClickDelegate={() => router?.push(`/${player.address}`)}
                onClickRevoke={() => onClickRevoke(player)}
              />
            );
          }}
        />
      </div>
    </Fragment>
  );
};

export default Home;
