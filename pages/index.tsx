import type { NextPage } from "next";
import React from "react";

import { usePlayer, usePlayers, useRegister } from "@/react/api";

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
  const { data: players } = usePlayers();

  const { data: { result: player } = {} } = usePlayer({
    address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b".toLowerCase(),
  });

  const { register } = useRegister();

  console.log(players, player);

  return (
    <div className="w-full flex flex-col h-full">
      <div>
        <h1 className="text-4xl my-4 lg:my-6 text-center font-bold">
          Available Server Passes
        </h1>
        <h2 onClick={React.useCallback(() => register({}), [])}>
          Tap here to register.
        </h2>
      </div>
    </div>
  );
};

export default Home;
