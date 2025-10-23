import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import jwt from "./callbacks/jwt";
import { getMe } from "@/services/auth/queries";
export default {
   providers: [
CredentialsProvider({
  name: "Credentials",
  credentials: {
    accessToken: { label: "Access Token", type: "text" },
    refreshToken: { label: "Refresh Token", type: "text" },
  },
  authorize: async (credentials) => {
    console.log("credentials received in authorize:", credentials);
    if (!credentials?.accessToken) {
      console.error("Missing access token");
      return null;
    }

    // const { accessToken, refreshToken } = credentials;
    const me = await getMe(credentials.accessToken);
    console.log("me data in auth", me)
     if (!me) {
    console.error("getMe failed");
    return null;
  }

    return {
      id: me.id,
      name: me.username,
      email: me.email,
      phone: me.phone,
     tokens: {
      accessToken: credentials.accessToken,
      refreshToken: credentials.refreshToken,
    },
    };
  },
}),

   ],
   callbacks:{
    async signIn({user}){
        return true;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      return session
    },
    // async jwt({ token, user}) {
    //     if(user) token.user = user;
    //   return token
    // }
    jwt,
   },
   session:{
    strategy: "jwt"
   },
   secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;