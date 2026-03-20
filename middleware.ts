import {withAuth} from "next-auth/middleware";
// export default function withAuth(request) {
//   // Middleware logic
// }

export { default } from "next-auth/middleware"
export const config = {
  matcher: ["/profile"],
}