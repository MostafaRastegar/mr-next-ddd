import Link from "next/link";
import UserView from "@/app/users/views/User.view";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>loading... on initial request</p>
        }
      >
        <Link href="/">
          (recommended method): React Query With Streamed Hydration --- Bad for
          SEO
        </Link>
        <UserView />
      </Suspense>
    </main>
  );
}
