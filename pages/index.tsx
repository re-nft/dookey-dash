import { useConnectModal } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import React, { Fragment } from "react";
import { useAccount } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import { PlayerWithDookeyStats } from "@/common/stats.utils";
import {
  Player,
  useDelegatedAddresses,
  useIsRegistered,
  useRegister,
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

  const { open: openWaitingListModal } = useWaitingListModal();
  const { isConnected, address } = useAccount();
  const [key, setKey] = React.useState(0);
  const { register } = useRegister();

  const { addresses: delegatedAddresses } =
    useDelegatedAddresses();

  const {
    isRegistered,
    loading: loadingIsRegistered,
    refetch: refetchIsRegistered,
  } = useIsRegistered({ address });

  const onDidRegister = React.useCallback(() => {
    // HACK: This is expensive! But it's a simple way to refresh the player list once we've registered.
    setKey((k) => k + 1);
    openWaitingListModal({});
    void refetchIsRegistered().catch(console.error);
  }, [openWaitingListModal, refetchIsRegistered]);

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

  return (
    <Fragment>
      <Cover>
        {/* Only render the registration button if the user has not registered. */}
        {!isRegistered && !loadingIsRegistered && (
          <Button
            children="I want to play"
            onClick={async () => {
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
            }}
          />
        )}
        {/* Only prompt to "let others play" if the user is signed in. */}
        {!isConnected && (
          <Button
            children="Connect Wallet"
            onClick={async () => {
              try {
                await openConnectModal?.();
              } catch (e) {
                console.error(e);
              }
            }}
          />
        )}
      </Cover>
      {isConnected && (
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
                  hasBeenDelegatedToByCurrentUser={hasBeenDelegatedToByCurrentUser}
                />
              );
            }}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
