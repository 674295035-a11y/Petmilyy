"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, Sun, Moon, X, CheckCheck } from "lucide-react";
import PetmilyLogo from "./PetmilyLogo";
import { usePetContext } from "@/lib/petContext";

interface AppHeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  backHref?: string;
  onBack?: () => void;
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
  onBack,
  showBell = true,
  showThemeToggle = true,
  bellCount,
  onBellClick,
  rightElement,
  leftElement,
  className = "",
}) => {
  const router = useRouter();
  const { themeMode, toggleTheme, notifications, clearNotifications } = usePetContext();
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const effectiveBellCount =
    bellCount !== undefined
      ? bellCount
      : notifications
      ? notifications.filter((n) => n.unread).length
      : 0;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(backHref);
    }
  };

  const handleBellClick = () => {
    if (onBellClick) {
      onBellClick();
    } else {
      setShowNotificationModal(true);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md py-2.5 px-3.5 flex items-center justify-between border-b border-orange-100/80 dark:border-slate-800 shadow-xs select-none shrink-0 transition-colors duration-200 ${className}`}>
        {/* Left Action / Back Button */}
        {leftElement ? (
          leftElement
        ) : showBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            aria-label="ย้อนกลับ"
            title="ย้อนกลับ"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
          </button>
        ) : (
          <div className="w-2" />
        )}

        {/* Center Brand or Title */}
        <div className="flex items-center justify-center gap-2">
          {showLogo ? (
            <>
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-orange-200/60">
                <PetmilyLogo size={32} />
              </div>
              <span className="text-[20px] font-extrabold bg-gradient-to-r from-orange-500 via-amber-500 to-amber-400 bg-clip-text text-transparent tracking-wider font-kanit drop-shadow-xs">
                PETMILY
              </span>
            </>
          ) : (
            <h1 className="text-[20px] font-bold text-slate-900 dark:text-white tracking-tight font-kanit">
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
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 active:scale-90 hover:scale-105 transition-all"
                title={themeMode === "dark" ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
                aria-label="สลับโหมดมืด/สว่าง"
              >
                {themeMode === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-400 stroke-[2.2]" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700 stroke-[2.2]" />
                )}
              </button>
            )}

            {showBell ? (
              <button
                type="button"
                onClick={handleBellClick}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 active:scale-90 hover:scale-105 transition-all relative cursor-pointer"
                aria-label="การแจ้งเตือน"
                title="การแจ้งเตือน"
              >
                <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200 stroke-[2]" />
                {effectiveBellCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>
            ) : (
              <div className="w-2" />
            )}
          </div>
        )}
      </header>

      {/* Global Notification Modal rendered right from AppHeader */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-5 text-left space-y-3.5 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-[#00A877]">
                  <Bell className="w-4 h-4 fill-current" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-kanit">
                  การแจ้งเตือน
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNotificationModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {!notifications || notifications.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500">
                  ไม่มีการแจ้งเตือนใหม่ในขณะนี้
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                      notif.unread
                        ? "bg-teal-50/90 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800"
                        : "bg-slate-50/70 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {notif.title}
                      </span>
                      {notif.unread && (
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
                      {notif.time}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  clearNotifications();
                }}
                className="flex-1 py-2 px-3 bg-teal-50 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-slate-700 text-[#00A877] dark:text-teal-400 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all font-kanit"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>อ่านทั้งหมดแล้ว</span>
              </button>
              <button
                type="button"
                onClick={() => setShowNotificationModal(false)}
                className="py-2 px-5 bg-[#00A877] hover:bg-[#009166] text-white rounded-full text-xs font-medium transition-all font-kanit shadow-sm"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
