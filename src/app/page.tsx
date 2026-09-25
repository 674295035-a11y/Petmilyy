"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Crown,
  LogIn,
  UserPlus,
  Bell,
  X,
  CheckCheck,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import PetmilyLogo from "@/components/PetmilyLogo";
import SplashScreen from "@/components/SplashScreen";
import { usePetContext } from "@/lib/petContext";

export default function GuestLandingPage() {
  const router = useRouter();
  const { isPremium, currentUser, notifications, clearNotifications } = usePetContext();
  const [showSplash, setShowSplash] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const isAccountPremium =
    isPremium ||
    (currentUser as any)?.isPremium === true ||
    (typeof window !== "undefined" && localStorage.getItem("petmily_is_premium") === "true");

  const unreadNotifs = notifications ? notifications.filter((n) => n.unread).length : 0;

  return (
    <>
      {/* Splash Screen Intro before Main Screen */}
      {showSplash && (
        <SplashScreen
          onFinish={() => setShowSplash(false)}
          durationMs={2800}
        />
      )}

      <MobileFrame>
        <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] dark:bg-[#0B0F17] min-h-full relative select-none transition-colors duration-300">
        
        {/* Custom Header for Guest/Landing Page */}
        <header className="w-full bg-[#62C0C6] py-2 px-3.5 flex items-center justify-between shadow-sm select-none z-30 shrink-0">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-white/60 shrink-0">
              <PetmilyLogo size={32} />
            </div>
            <span className="text-[19px] font-bold text-slate-900 tracking-wider font-kanit">
              PETMILY
            </span>
          </div>

          {/* Action Buttons: เข้าสู่ระบบ / สมัครสมาชิก / การแจ้งเตือน */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              href="/login"
              className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-slate-800 text-[12px] font-semibold tracking-tight shadow-sm border border-white/70 transition-all font-kanit flex items-center gap-1"
            >
              <LogIn className="w-3.5 h-3.5 text-teal-600" />
              <span>เข้าสู่ระบบ</span>
            </Link>
            <Link
              href="/register/user"
              className="px-2.5 py-1 rounded-full bg-[#00A877] hover:bg-[#009166] active:scale-95 text-white text-[12px] font-semibold tracking-tight shadow-sm border border-[#009166] transition-all font-kanit flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>สมัครสมาชิก</span>
            </Link>
            <button
              type="button"
              onClick={() => setShowNotificationModal(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-90 transition-all relative cursor-pointer ml-0.5"
              aria-label="การแจ้งเตือน"
              title="การแจ้งเตือน"
            >
              <Bell className="w-4 h-4 fill-slate-900 text-slate-900" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-4">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-teal-50 border border-teal-300 text-teal-900 rounded-2xl text-xs flex items-center gap-2 shadow-md animate-bounce">
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          {/* Welcome Banner */}
          <div className="w-full bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border border-teal-200/80 dark:border-slate-700 rounded-3xl p-4 text-center shadow-sm">
            <div className="text-[16px] font-bold text-teal-800 dark:text-teal-300 font-kanit">
              ยินดีต้อนรับ สู่ PETMILY เพื่อนซี้สี่ขา
            </div>
            <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300 mt-1">
              • ดูแลสุขภาพสัตว์เลี้ยงที่คุณรัก
            </p>
          </div>

          {/* 3 Feature Highlight Cards */}
          <div className="w-full bg-[#A8E6EA]/40 dark:bg-slate-800/80 border-2 border-[#76CBD1] dark:border-teal-700/60 rounded-[32px] p-3.5 shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: พบแพทย์ผู้เชี่ยวชาญ */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center shadow-sm border border-teal-100/80 dark:border-slate-700 flex flex-col items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-slate-700/80 flex items-center justify-center mx-auto mb-2.5 text-slate-900 dark:text-teal-300">
                  <svg className="w-7 h-7 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                    <circle cx="20" cy="10" r="2" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-kanit">
                  พบแพทย์ผู้เชี่ยวชาญ
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 font-light">
                  ปรึกษาสัตวแพทย์ผ่านวิดีโอคอลได้ตลอด 24 ชม. รับคำแนะนำด่วนได้ทันทีโดยไม่ต้องเดินทาง
                </p>
              </div>

              {/* Card 2: โรงพยาบาลชั้นนำ */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center shadow-sm border border-teal-100/80 dark:border-slate-700 flex flex-col items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-slate-700/80 flex items-center justify-center mx-auto mb-2.5 text-slate-900 dark:text-teal-300">
                  <svg className="w-7 h-7 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" />
                    <path d="M12 4v4" />
                    <path d="M10 12h4" />
                    <path d="M10 16h4" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-kanit">
                  โรงพยาบาลชั้นนำ
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 font-light">
                  ค้นหาและนัดหมายเครือข่ายคลินิก-โรงพยาบาลสัตว์ใกล้บ้าน พร้อมระบบเช็กคิวด่วนได้ง่ายๆ
                </p>
              </div>

              {/* Card 3: บันทึกประวัติสุขภาพ */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center shadow-sm border border-teal-100/80 dark:border-slate-700 flex flex-col items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-slate-700/80 flex items-center justify-center mx-auto mb-2.5 text-slate-900 dark:text-teal-300">
                  <svg className="w-7 h-7 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-kanit">
                  บันทึกประวัติสุขภาพ
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 font-light">
                  จัดเก็บประวัติการรักษา ตารางฉีดวัคซีน และแจ้งเตือนนัดหมายสำคัญของน้องๆ ครบจบในแอปเดียว
                </p>
              </div>
            </div>
          </div>

          {/* Health Info Card ("ข้อมูลสุขภาพ") */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-slate-900 text-slate-900 dark:fill-white dark:text-white" />
                <span className="text-[16px] font-bold text-slate-900 dark:text-white font-kanit">
                  ข้อมูลสุขภาพ
                </span>
              </div>
              <span className="text-[11px] font-medium px-2.5 py-1 bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                บันทึกโดยสัตวแพทย์
              </span>
            </div>

            {/* Health Info Rows */}
            <div className="space-y-2 text-[14px]">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300 font-normal">
                  วัคซีนรวม (เข็มล่าสุด)
                </span>
                <span className="font-semibold text-slate-400 dark:text-slate-500 text-[13px]">
                  ยังไม่มีข้อมูล (รอแพทย์บันทึก)
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-700 dark:text-slate-300 font-normal">
                  น้ำหนักล่าสุด
                </span>
                <span className="font-semibold text-slate-400 dark:text-slate-500 text-[13px]">
                  ยังไม่มีข้อมูล
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-400 dark:text-slate-500 text-center">
              * ข้อมูลสุขภาพจะบันทึกโดยสัตวแพทย์เมื่อนำสัตว์เลี้ยงเข้ารับการตรวจ
            </div>
          </div>

          {/* PetCare Premium Banner Card (แสดงเฉพาะเมื่อยังไม่สมัครพรีเมียม) */}
          {!isAccountPremium && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left space-y-3">
              {/* Header with Crown & Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 fill-slate-900 text-slate-900 dark:fill-white dark:text-white" />
                  <span className="text-[16px] font-bold text-slate-900 dark:text-white tracking-tight font-kanit">
                    PetCare Premium
                  </span>
                </div>
                <span className="text-[12px] font-semibold px-2.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full">
                  ฿499/เดือน
                </span>
              </div>

              {/* Subtext Benefits */}
              <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                ปรึกษาแพทย์ส่วนตัว 24 ชม. และส่วนลดค่ายาพิเศษ
              </p>

              {/* CTA Button */}
              <div>
                <Link
                  href="/login"
                  className="block w-full text-center bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[15px] py-2.5 px-6 rounded-full shadow-[0_6px_16px_rgba(0,168,119,0.3)] transition-all duration-200 font-kanit"
                >
                  สมัครเลย
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* Global Notification Modal */}
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

      </div>
    </MobileFrame>
    </>
  );
}
