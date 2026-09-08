"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Sun, Moon } from "lucide-react";
import PetmilyLogo from "./PetmilyLogo";
import { usePetContext } from "@/lib/petContext";

interface AppHeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  backHref?: string;
  showBell?: boolean;
  showThemeToggle?: boolean;
  bellCount?: number;
  onBellClick?: () => void;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showLogo = true,
  showBack = true,
  backHref = "/home",
  showBell = true,
  showThemeToggle = true,
  bellCount,
  onBellClick,
  rightElement,
  leftElement,
  className = "",
}) => {
  const { themeMode, toggleTheme } = usePetContext();

  return (
    <header className={`w-full bg-[#62C0C6] py-2.5 px-3 flex items-center justify-between shadow-sm select-none z-30 shrink-0 ${className}`}>
      {/* Left Action / Back Button */}
      {leftElement ? (
        leftElement
      ) : showBack ? (
        <Link
          href={backHref}
          className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-95 transition-all"
          aria-label="ย้อนกลับ"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
        </Link>
      ) : (
        <div className="w-2" />
      )}

      {/* Center Brand or Title */}
      <div className="flex items-center justify-center gap-2">
        {showLogo ? (
          <>
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-white/60">
              <PetmilyLogo size={32} />
            </div>
            <span className="text-[20px] font-bold text-slate-900 tracking-wider font-kanit">
              PETMILY
            </span>
          </>
        ) : (
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight font-kanit">
            {title}
          </h1>
        )}
      </div>

      {/* Right Action / Theme Toggle & Bell */}
      {rightElement ? (
        rightElement
      ) : (
        <div className="flex items-center gap-1">
          {showThemeToggle && (
            <button
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-90 hover:scale-105 transition-all"
              title={themeMode === "dark" ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
              aria-label="สลับโหมดมืด/สว่าง"
            >
              {themeMode === "dark" ? (
                <Sun className="w-5 h-5 text-amber-900 stroke-[2.2]" />
              ) : (
                <Moon className="w-5 h-5 text-slate-900 stroke-[2.2]" />
              )}
            </button>
          )}

          {showBell ? (
            <button
              type="button"
              onClick={onBellClick}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-90 hover:scale-105 transition-all relative"
              aria-label="การแจ้งเตือน"
            >
              <Bell className="w-5 h-5 fill-slate-900 text-slate-900 stroke-[1.5]" />
              {bellCount !== undefined && bellCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
              )}
            </button>
          ) : (
            <div className="w-2" />
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
