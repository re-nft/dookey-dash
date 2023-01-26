import { useQuery } from "@tanstack/react-query";
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
    ["data"],
    React.useCallback(
      () =>
        fetch(`/api/player/all?page=${page}&limit=${limit}`, {
          method: "get",
        }).then((response) => response.json()),
      [page, limit]
    )
  );
}

const Home: NextPage = () => {
  const { data } = usePlayers();

  console.log(data);

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
