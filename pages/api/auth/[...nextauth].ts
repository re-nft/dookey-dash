import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// ts-prune-ignore-next
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers: Provider[] = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },

      async authorize(credentials) {
        if (!process.env.NEXTAUTH_URL)
          throw new Error(
            "Please configure the `NEXTAUTH_URL` environment variable."
          );

        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );

          const { success } = await siwe.verify({
            signature: credentials?.signature || "",
            domain: new URL(process.env.NEXTAUTH_URL).host,
            nonce: await getCsrfToken({ req }),
          });

          // TODO: ENS NFT-922
          // We can add more properties here to populate the first
          // call to the `jwt()` callback below.
          if (success) return { id: siwe.address };
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" &&
    req.query.nextauth &&
    req.query.nextauth.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) providers.pop();

  return NextAuth(req, res, {
    callbacks: {
      async jwt({ token }) {
        if (!process.env.NEXTAUTH_SECRET)
          throw new Error(
            "Please configure the `NEXTAUTH_SECRET` environment variable."
          );

        const { accessToken: _, ...prevToken } = token;
        const accessToken = await encode({
          secret: process.env.NEXTAUTH_SECRET,
          token: prevToken,
        });

        return { ...prevToken, accessToken };
      },
      async session({ session, token }) {
        if (!token.sub)
          throw Error("Session lost. Token `sub` seems to be undefined");

        session.accessToken = token.accessToken;
        session.user.id = token.sub;

        // HACK: we need to make sure the getServerSideProps serializer
        // does not encounter `undefined` values (wtf!?).
        session.user.name = session.user.name ?? null;
        session.user.email = session.user.email ?? null;
        session.user.image = session.user.image ?? null;
        return session;
      },
    },
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
  });
}
