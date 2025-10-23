import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import jwt from "./callbacks/jwt";
import session from "./callbacks/session";

export default {
   providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials) => {
        try {
          const { accessToken, refreshToken } = credentials as {
            accessToken: string;
            refreshToken: string;
          };


          return {
   
            tokens: {
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          };
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      },
    }),

   ],
   callbacks:{
    async signIn({user}){
        return true;
    },

    // async session({ session, token }) {
    //   session.user = token.user as any;
    //   return session
    // },
    session,
    jwt,
   },
   session:{
    strategy: "jwt"
   },
   secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;