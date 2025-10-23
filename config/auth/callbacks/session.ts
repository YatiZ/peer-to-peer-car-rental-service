
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export default async function session({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) {
  session.user. = token.idToken;
  session.tokens = token.tokens;

  if (token._id) {
    session.user = {
      name: token.full_name,
      ...session.user,
      ...token,
    };
  }

  return session;
}
