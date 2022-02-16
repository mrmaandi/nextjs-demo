import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        let user = null
      
        // "Database look up"
        if (credentials.username === 'demo' && credentials.password === 'user') {
          user = { id: 1, name: "Demo User", email: "demouser@example.com" }
        }

        if (!user) { return null }

        return user
      }
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id
      }
      return token;
    },
    async session({ session, user, token }) {
      session.userId = user.id;
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
})
