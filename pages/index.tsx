import { default as Link } from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import styles from '../styles/Home.module.scss';
import { options as authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  console.log(session);

  return {
    props: { session },
  };
};

const Home: NextPage = () => {
  console.log(useSession());
  return (
    <div className='w-full flex flex-col h-full'>
      <div>
        <h1 className='text-4xl my-4 lg:my-6 text-center'>
          Available Server Passes
        </h1>
      </div>
      <div className='flex-1 border-solid rounded-md border-[2px]'>

      </div>
    </div>
  );
};


export default Home;
