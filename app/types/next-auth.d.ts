import NextAuth, {DefaultSession, DefaultUser} from "next-auth";


declare module "next-auth"{
  interface Session {
    idToken?: string;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    user: | DefaultSession["user"] & User|null;
  }
}
interface User extends DefaultUser{
    id: string;
    username: string;
    email: string;
    user_type: string;
    location?: string;
    rating?: number;
    phone?: string;
    avatar?: string;
}


declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    phone?: string;
    id?: string;
    username?: string;
    location?: string;
    avatar?: string;
    rating?: string;
  }
}
