import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
  database: process.env.DATABASE_URL,
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
  },
})