import { database } from '@/src/db/database';
import  Google  from 'next-auth/providers/google';
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, sessions, users, verificationTokens } from './src/db/schema';


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(database,{
    usersTable:users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
})

