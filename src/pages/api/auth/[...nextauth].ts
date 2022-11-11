import NextAuth, { type NextAuthOptions } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

// export const authOptions: NextAuthOptions = {
//   // Include user.id on session
//   callbacks: {
//     session({ session, user }) {
//       if (session.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
//   // Configure one or more authentication providers
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     DiscordProvider({
//       clientId: env.DISCORD_CLIENT_ID,
//       clientSecret: env.DISCORD_CLIENT_SECRET,
//       authorization: { params: { scope: "identify" } },
//     }),
//     // ...add more providers here
//   ],
//   secret: env.NEXTAUTH_SECRET,
// };

export const authOptions: NextAuthOptions = {
  providers: [
    // DiscordProvider({
    //   clientId: String(env.DISCORD_CLIENT_ID),
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    //   // authorization: { params: { scope: "identify" } },
    // }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
