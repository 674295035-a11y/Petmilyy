"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Crown,
  LogIn,
  UserPlus,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import PetmilyLogo from "@/components/PetmilyLogo";
import SplashScreen from "@/components/SplashScreen";
import { usePetContext } from "@/lib/petContext";

export default function GuestLandingPage() {
  const { isPremium, currentUser } = usePetContext();
  const [showSplash, setShowSplash] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isAccountPremium =
    isPremium ||
    (currentUser as any)?.isPremium === true ||
    (typeof window !== "undefined" && localStorage.getItem("petmily_is_premium") === "true");

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
        <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-orange-50/70 via-amber-50/30 to-slate-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 min-h-full relative select-none transition-colors duration-300">
        
        {/* Custom Header for Guest/Landing Page - Frosted Glass with Soft Orange Border */}
        <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md py-2.5 px-3.5 flex items-center justify-between border-b border-orange-100/80 dark:border-slate-800 shadow-xs select-none shrink-0 transition-colors duration-200">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-orange-200/60 shrink-0">
              <PetmilyLogo size={32} />
            </div>
            <span className="text-[19px] font-extrabold bg-gradient-to-r from-orange-500 via-amber-500 to-amber-400 bg-clip-text text-transparent tracking-wider font-kanit drop-shadow-xs">
              PETMILY
            </span>
          </div>

          {/* Action Buttons: เข้าสู่ระบบ / สมัครสมาชิก */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 active:scale-95 text-orange-600 border border-orange-300 text-[12px] font-semibold tracking-tight shadow-xs transition-all font-kanit flex items-center gap-1 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-orange-500" />
              <span>เข้าสู่ระบบ</span>
            </Link>
            <Link
              href="/register/user"
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white text-[12px] font-semibold tracking-tight shadow-md shadow-orange-500/25 transition-all font-kanit flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>สมัครสมาชิก</span>
            </Link>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-4">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-orange-50 border border-orange-300 text-orange-900 rounded-2xl text-xs flex items-center gap-2 shadow-md animate-bounce">
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          {/* Hero Welcome Banner */}
          <div className="w-full bg-white/90 dark:bg-slate-800/90 border border-orange-100/80 dark:border-slate-700 rounded-3xl p-4 text-center shadow-sm backdrop-blur-xs space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 text-xs font-semibold border border-orange-200/60 mb-1 shadow-xs">
              <span>🐾</span>
              <span>แอปพลิเคชันอันดับ 1 เพื่อคนรักสัตว์</span>
            </div>
            <div className="text-[17px] font-extrabold text-slate-800 dark:text-white font-kanit">
              ยินดีต้อนรับสู่ <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">PETMILY</span> เพื่อนซี้สี่ขา
            </div>
            <p className="text-[13px] font-medium text-slate-500 dark:text-slate-300">
              • ดูแลสุขภาพสัตว์เลี้ยงที่คุณรักอย่างครบวงจร
            </p>
          </div>

          {/* 3 Main Service Feature Cards */}
          <div className="w-full bg-white/60 dark:bg-slate-800/60 border border-orange-100/80 dark:border-slate-700/60 rounded-[32px] p-3.5 shadow-sm space-y-3 backdrop-blur-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Card 1: พบแพทย์ผู้เชี่ยวชาญ (Sky Blue pastel card) */}
              <div className="bg-sky-50/90 dark:bg-sky-950/30 rounded-2xl p-4 text-center shadow-sm shadow-sky-100/50 border border-sky-200/80 dark:border-sky-800/60 flex flex-col items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md shadow-sky-500/30">
                  <svg className="w-7 h-7 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                    <circle cx="20" cy="10" r="2" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-sky-950 dark:text-sky-200 font-kanit">
                  พบแพทย์ผู้เชี่ยวชาญ
                </h3>
                <p className="text-[11px] text-sky-800/80 dark:text-sky-300 leading-relaxed mt-1.5 font-normal">
                  ปรึกษาสัตวแพทย์ผ่านวิดีโอคอลได้ตลอด 24 ชม. รับคำแนะนำด่วนได้ทันทีโดยไม่ต้องเดินทาง
                </p>
              </div>

              {/* Card 2: โรงพยาบาลชั้นนำ (Mint Green pastel card) */}
              <div className="bg-emerald-50/90 dark:bg-emerald-950/30 rounded-2xl p-4 text-center shadow-sm shadow-emerald-100/50 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md shadow-emerald-500/30">
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
                <h3 className="text-[15px] font-bold text-emerald-950 dark:text-emerald-200 font-kanit">
                  โรงพยาบาลชั้นนำ
                </h3>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300 leading-relaxed mt-1.5 font-normal">
                  ค้นหาและนัดหมายเครือข่ายคลินิก-โรงพยาบาลสัตว์ใกล้บ้าน พร้อมระบบเช็กคิวด่วนได้ง่ายๆ
                </p>
              </div>

              {/* Card 3: บันทึกประวัติสุขภาพ (Pastel Orange card) */}
              <div className="bg-orange-50/90 dark:bg-orange-950/30 rounded-2xl p-4 text-center shadow-sm shadow-orange-100/50 border border-orange-200/80 dark:border-orange-800/60 flex flex-col items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md shadow-orange-500/30">
                  <svg className="w-7 h-7 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-orange-950 dark:text-orange-200 font-kanit">
                  บันทึกประวัติสุขภาพ
                </h3>
                <p className="text-[11px] text-orange-800/80 dark:text-orange-300 leading-relaxed mt-1.5 font-normal">
                  จัดเก็บประวัติการรักษา ตารางฉีดวัคซีน และแจ้งเตือนนัดหมายสำคัญของน้องๆ ครบจบในแอปเดียว
                </p>
              </div>

            </div>
          </div>

          {/* Health Info Card ("ข้อมูลสุขภาพ") */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-orange-100/80 dark:border-slate-700 shadow-sm text-left">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="text-[16px] font-bold text-slate-900 dark:text-white font-kanit">
                  ข้อมูลสุขภาพ
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/80 flex items-center gap-1">
                ✓ บันทึกโดยสัตวแพทย์
              </span>
            </div>

            {/* Health Info Rows */}
            <div className="space-y-2 text-[14px] pt-2">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  วัคซีนรวม (เข็มล่าสุด)
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-[12px] font-semibold border border-orange-200/60 inline-block">
                  ยังไม่มีข้อมูล (รอแพทย์บันทึก)
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  น้ำหนักล่าสุด
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-[12px] font-semibold border border-orange-200/60 inline-block">
                  ยังไม่มีข้อมูล
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <span>ℹ️</span>
              <span>* ข้อมูลสุขภาพจะบันทึกโดยสัตวแพทย์เมื่อนำสัตว์เลี้ยงเข้ารับการตรวจ</span>
            </div>
          </div>

          {/* PetCare Premium Banner Card (สไตล์พรีเมียมสีไล่เฉดม่วง ชมพู และส้ม) */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-3xl p-5 border border-white/20 shadow-lg shadow-pink-500/20 text-left space-y-3.5 relative overflow-hidden">
            
            {/* Special Offer Badge & Crown */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <span className="text-[17px] font-extrabold text-white tracking-tight font-kanit drop-shadow-xs">
                  PetCare Premium
                </span>
              </div>
              
              <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold border border-white/30 inline-flex items-center gap-1 shadow-xs">
                ✨ ข้อเสนอพิเศษ
              </span>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
                ฿499
              </span>
              <span className="text-sm font-semibold text-white/90">
                / เดือน
              </span>
            </div>

            {/* Subtext Benefits */}
            <p className="text-[13px] text-white/95 leading-relaxed relative z-10 font-normal">
              ปรึกษาแพทย์ส่วนตัว 24 ชม. และส่วนลดค่ายาพิเศษ 20% สำหรับสมาชิก
            </p>

            {/* CTA Button: กดแล้วไปหน้าเลือกแผนรายเดือน/รายปี */}
            <div className="pt-1 relative z-10">
              <Link
                href="/premium/pricing"
                className="block w-full text-center bg-white hover:bg-slate-50 active:scale-95 text-purple-700 font-extrabold text-[15px] py-2.5 px-6 rounded-full shadow-lg shadow-black/10 hover:scale-[1.03] transition-all duration-200 font-kanit cursor-pointer"
              >
                สมัครเลย
              </Link>
            </div>
          </div>

        </div>

      </div>
    </MobileFrame>
    </>
  );
}
