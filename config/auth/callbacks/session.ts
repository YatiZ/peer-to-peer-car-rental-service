

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export default async function session({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) {
  session.idToken = token.idToken;
  session.tokens = token.tokens;
  console.log("session callback", session)

  if (token.id) {
    session.user = {
      name: token.username,
      ...session.user,
      ...token,
    };
  }

  return session;
}
