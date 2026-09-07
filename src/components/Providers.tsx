"use client";

import React from "react";
import { PetProvider } from "@/lib/petContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PetProvider>{children}</PetProvider>;
}

export default Providers;
