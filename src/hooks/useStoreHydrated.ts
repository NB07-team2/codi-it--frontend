import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";

export const useStoreHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useUserStore.persist.onFinishHydration(() => setHydrated(true));
    if (useUserStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  return hydrated;
};
