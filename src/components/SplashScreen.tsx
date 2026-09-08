"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface SplashScreenProps {
  onFinish?: () => void;
  durationMs?: number;
}

export default function SplashScreen({
  onFinish,
  durationMs = 2800,
}: SplashScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, durationMs / 25);

    // Fade out and finish timer
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(durationMs - 600, 1000));

    const finishTimer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, durationMs);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 250);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#F4FAFB] dark:bg-[#0B0F17] py-12 px-6 select-none cursor-pointer transition-all duration-700 ${
        isFadingOut
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Top spacing / subtle status indicator */}
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-medium text-teal-700/80 dark:text-teal-400/80 bg-teal-50 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-slate-700 px-3 py-1 rounded-full border border-teal-200/60 dark:border-slate-700 transition-all font-kanit active:scale-95 shadow-xs"
        >
          ข้าม &rsaquo;
        </button>
      </div>

      {/* Center Hero: Lottie Animation & Circular Petmily Logo */}
      <div className="flex flex-col items-center justify-center space-y-5 my-auto">
        
        {/* Lottie Animation Embed from User Link */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          <iframe
            src="https://lottie.host/embed/16b69e12-0efb-4061-b33d-12dc2b93fd84/Ax2k12jKRd.lottie"
            className="w-full h-full border-0 pointer-events-none rounded-3xl"
            title="PETMILY Lottie Animation"
          />
        </div>

        {/* Circular Logo from Uploaded Splash Screenshot */}
        <div className="relative group">
          {/* Animated Glow Rings */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#62C0C6] to-[#00A877] rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse" />
          
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-white dark:bg-slate-800 border-[3px] border-[#5CB8C1] shadow-[0_10px_30px_rgba(92,184,193,0.3)] flex items-center justify-center p-3 overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
              src="/logo.png"
              alt="PETMILY เพื่อนซี้สี่ขา"
              width={180}
              height={180}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Text & Slogan */}
        <div className="text-center space-y-1 pt-2">
          <h1 className="text-[26px] font-bold text-slate-900 dark:text-white tracking-wider font-kanit flex items-center justify-center gap-1.5">
            <span>PETMILY</span>
            <Sparkles className="w-5 h-5 text-teal-500 animate-bounce" />
          </h1>
          <p className="text-[14px] text-teal-700 dark:text-teal-300 font-medium font-kanit">
            เพื่อนซี้สี่ขา • ดูแลสุขภาพสัตว์เลี้ยงที่คุณรัก
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center space-y-2.5">
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#62C0C6] to-[#00A877] rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-[12px] text-slate-400 dark:text-slate-500">
          <span>กำลังโหลดแอปพลิเคชัน...</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
