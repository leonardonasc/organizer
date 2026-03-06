import { useEffect, useState } from "react";
import type { User } from "@/types/api";

export function useMe() {
  const [me, setMe] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/me");
      setMe(res.ok ? (await res.json()).user : null);
      setLoading(false);
    })();
  }, []);

  return { me, loading };
}
