import { getMe } from "@/services/auth/queries";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

function mapProfile(data: any) {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    user_type: data.user_type,
    location: data.location,
    rating: data.rating,
    phone: data.phone,
    avatar: data.avatar,
  };
}

export default async function jwt({
  token,
  user,
}: {
  token: JWT & { tokens?: any; _id?: string; profile?: any };
  user?: User & { tokens?: any };
}) {
  if (user?.tokens) {
    token.tokens = user.tokens;
  }

  if (!token._id && token.tokens?.accessToken) {
    console.log("jwt");
    try {
      const data = await getMe(token.tokens.accessToken);
      if (data?._data) {
        const profile = mapProfile(data._data);
        Object.assign(token, profile);
        token.profile = profile;
      }
    } catch (err) {
      console.error("JWT getMe error:", err);
    }
  }

  return token;
}
