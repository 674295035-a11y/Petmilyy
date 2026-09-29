"use client";

import React, { Suspense } from "react";
import { PetProvider } from "@/lib/petContext";
import PageviewTracker from "@/components/PageviewTracker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PetProvider>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PetProvider>
  );
}

export default Providers;
