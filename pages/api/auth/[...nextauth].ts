import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import { encode } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

const providers: Provider[] = [
  CredentialsProvider({
    name: 'Ethereum',
    credentials: {
      message: {
        label: 'Message',
        type: 'text',
        placeholder: '0x0',
      },
      signature: {
        label: 'Signature',
        type: 'text',
        placeholder: '0x0',
      },
    },

    async authorize(credentials) {
      try {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));

        const { data: { address } = {}, success } = await siwe.verify({
          signature: credentials?.signature || '',
          domain: new URL(process.env.NEXTAUTH_URL).host,
          nonce: await getCsrfToken({ req }),
        });

        // TODO: ENS NFT-922
        // We can add more properties here to populate the first
        // call to the `jwt()` callback below.
        if (success) return { id: address };
        return null;
      } catch (e) {
        return null;
      }
    },
  }),
];

export const options: AuthOptions = {
  callbacks: {
    async jwt({ user, token }) {
      delete token.accessToken;
      let accessToken: string | undefined;

      try {
        accessToken = await encode({
          secret: process.env.NEXTAUTH_SECRET,
          token,
        });
      } catch (error) {
        console.error(error);
      }

      return { ...token, accessToken };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.sub;

      // HACK: we need to make sure the getServerSideProps serializer
      // does not encounter `undefined` values (wtf!?).
      delete session.user.name;
      delete session.user.email;
      delete session.user.image;
      return session;
    },
  },
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// ts-prune-ignore-next
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth.includes('signin');

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) options.providers.pop();

  return NextAuth(req, res, options);
}
