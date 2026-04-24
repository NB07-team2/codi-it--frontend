"use client";

import { useUserStore } from "@/stores/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const { user, isHydrated } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && (!user || user.type !== "BUYER")) {
      router.replace("/products");
    }
  }, [user, router, isHydrated, pathname]);

  if (!isHydrated || !user || user.type !== "BUYER") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  return <>{children}</>;
}
