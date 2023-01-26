import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import type { NextPage } from "next";
import * as React from "react";

import styles from "@/styles/Home.module.scss";

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

function usePlayers({
  page = 0,
  limit = 10,
}: {
  readonly page?: number;
  readonly limit?: number;
} = {}) {
  return useQuery(
    ["usePlayers", page, limit],
    React.useCallback(
      () =>
        fetch(`/api/player/all?page=${page}&limit=${limit}`, {
          method: "get",
        }).then((response) => response.json()),
      [page, limit]
    )
  );
}

function usePlayer({
  address: maybeAddress,
}: {
  readonly address: string | null | undefined;
}) {
  return useQuery(
    ["usePlayer", maybeAddress],
    React.useCallback(
      () =>
        fetch(
          `/api/player/find/${
            ethers.utils.isAddress(maybeAddress || "")
              ? ethers.utils.getAddress(maybeAddress!)
              : ""
          }`,
          {
            method: "get",
          }
        ).then((response) => response.json()),
      [maybeAddress]
    ),
    {
      enabled: typeof maybeAddress === "string" && !!maybeAddress.length,
    }
  );
}

const Home: NextPage = () => {
  const { data: players } = usePlayers();

  const {
    data: { result: player },
  } = usePlayer({
    address: "0x22eA0EAad94F535d24062E8b79DB0587f70B9B1b".toLowerCase(),
  });

  console.log(players, player);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">RainbowKit</a> + <a href="">wagmi</a> +{" "}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
