import { UserRepository } from "@/modules/users/infrastructure";
import UserNextSSR from "@/modules/users/presentations/nextSSR/UserNextSSR";

export async function GET() {
  const res = await UserNextSSR().getUsers();
  console.log("UserNextSSR :>> ", res);
  return Response.json(res);
}
