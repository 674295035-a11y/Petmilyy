"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function SplashPage() {
  const router = useRouter();

  const handleFinish = () => {
    router.push("/");
  };

  return <SplashScreen onFinish={handleFinish} durationMs={2800} />;
}
