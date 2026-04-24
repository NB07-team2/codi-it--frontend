"use client";

import { useUserStore } from "@/stores/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, user, isHydrated } = useUserStore();

  useEffect(() => {
    if (isHydrated && (!accessToken || user?.type !== "SELLER")) {
      router.replace("/products");
    }
  }, [accessToken, user, pathname, router, isHydrated]);

  if (!isHydrated) return <></>;

  return <>{children}</>;
}
