import { User } from "next-auth";

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    /** Authorization: Bearer ${accessToken} */
    accessToken?: string;
    /** ! We use `id` for wallet address */
    user: User;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** Authorization: Bearer ${accessToken} */
    accessToken?: string;
  }
}
