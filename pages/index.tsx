import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useDelegateCash } from "use-delegatecash";
import { useAccount } from "wagmi";

import { compareAddresses } from "@/common/address.utils";
import { PlayerWithDookeyStats } from "@/common/stats.utils";
import { Player, useDelegatedAddresses, useIsRegistered } from "@/react/api";
import { Cover } from "@/react/components/Cover";
import { WaitingRoomListItem } from "@/react/components/list-item/list-item";
import { useWaitingListModal } from "@/react/modals";
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
  const { address } = useAccount();

  const {
    isRegistered,
    loading: loadingIsRegistered,
    refetch: refetchIsRegistered,
  } = useIsRegistered({
    address,
  });

  const onDidRegister = React.useCallback(() => {
    // HACK: This is expensive! But it's a simple way to refresh the player list once we've registered.
    setKey((k) => k + 1);
    refetchIsRegistered().then(openWaitingListModal);
  }, [openWaitingListModal, refetchIsRegistered]);

  return (
    <Fragment>
      <Cover
        title="Waiting room"
        intro="Users requesting to play Dookey Dash"
        image="/renft-cover.webp"
        fallBackImage="/renft-cover.webp"
      >
        <button className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2">
          I Want to play
        </button>
        <button className="p-5 w-full m-3 bg-[#A855F7] shadow-md rounded text-white uppercase md:w-auto md:px-4 md:py-2 ">
          Let others Play
        </button>
      </Cover>
      <div className="w-full flex flex-col h-full">
        {!isRegistered && !loadingIsRegistered && (
          <PlayerRegisterButton onDidRegister={onDidRegister} />
        )}
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
                onClickDelegate={() => router?.replace(`/${player.address}`)}
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
