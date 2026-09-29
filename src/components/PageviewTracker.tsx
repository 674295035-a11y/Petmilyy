"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { usePetContext } from "@/lib/petContext";

// Utility to get or generate session ID
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem("petmily_session_id");
  if (!sessionId) {
    sessionId = "sess_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
    sessionStorage.setItem("petmily_session_id", sessionId);
  }
  return sessionId;
}

export function PageviewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentUser } = usePetContext();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const fullPath = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Avoid duplicate tracking for identical consecutive path render
    if (lastTrackedPath.current === fullPath) return;
    lastTrackedPath.current = fullPath;

    const trackPageview = async () => {
      try {
        const sessionId = getSessionId();
        const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
        const referrer = typeof document !== "undefined" ? document.referrer : "";
        const userEmail = currentUser?.email || "";

        // Track in Supabase page_views table
        const { error } = await supabase.from("page_views").insert([
          {
            page_path: fullPath,
            user_agent: userAgent,
            referrer: referrer,
            session_id: sessionId,
            user_email: userEmail,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) {
          console.warn("Pageview tracking warning (Supabase):", error.message);
        }
      } catch (err) {
        console.warn("Pageview tracking failed:", err);
      }
    };

    trackPageview();
  }, [pathname, searchParams, currentUser?.email]);

  return null;
}

export default function PageviewTracker() {
  return <PageviewTrackerInner />;
}
