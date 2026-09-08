"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Heart,
  Crown,
  Clock,
  LogIn,
  UserPlus,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import PetmilyLogo from "@/components/PetmilyLogo";
import { FloralCatAvatar, GoldenRetrieverAvatar, PetAvatarDisplay } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function GuestLandingPage() {
  const router = useRouter();
  const { pets, selectedPetIndex, setSelectedPetIndex, selectedPet, activityButtons } =
    usePetContext();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleActionClick = (actionName: string) => {
    setToastMessage(`กรุณาเข้าสู่ระบบเพื่อใช้งาน "${actionName}" ✨`);
    setTimeout(() => {
      router.push("/login");
    }, 900);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full relative select-none">
        
        {/* Custom Header for Guest/Landing Page (รูปที่ 2 แบบไม่มีลูกศร/กระดิ่ง แต่มีปุ่ม เข้าสู่ระบบ กับ สมัครสมาชิก) */}
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

          {/* Action Buttons: เข้าสู่ระบบ / สมัครสมาชิก */}
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
          </div>
        </header>

        {/* Scrollable Content Container (รูปที่ 2) */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-4">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-teal-50 border border-teal-300 text-teal-900 rounded-2xl text-xs flex items-center gap-2 shadow-md animate-bounce">
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          {/* Welcome Banner: ยินดีต้อนรับ สู่ PETMILY เพื่อนซี้สี่ขา • ดูแลสุขภาพสัตว์เลี้ยงที่คุณรัก */}
          <div className="w-full bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border border-teal-200/80 dark:border-slate-700 rounded-3xl p-4 text-center shadow-sm">
            <div className="text-[16px] font-bold text-teal-800 dark:text-teal-300 font-kanit">
              ยินดีต้อนรับ สู่ PETMILY เพื่อนซี้สี่ขา
            </div>
            <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300 mt-1">
              • ดูแลสุขภาพสัตว์เลี้ยงที่คุณรัก
            </p>
          </div>

          {/* Quick Activity Logger Section */}
          <div className="space-y-2 text-left pt-1">
            <div className="flex items-center justify-between">
              <div className="inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md">
                <h2 className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                  บันทึกกิจกรรมด่วน
                </h2>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                (สัตว์เลี้ยงของฉัน)
              </span>
            </div>

            {/* Quick Activity Circle Buttons */}
            <div className="flex items-center gap-2.5 pt-1 overflow-x-auto no-scrollbar pb-1">
              {activityButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => handleActionClick(`บันทึก ${btn.name}`)}
                  className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-95 flex flex-col items-center justify-center transition-all shrink-0 hover:border-teal-300 dark:hover:border-teal-500 relative"
                  title={`บันทึก ${btn.name}`}
                >
                  {btn.type === "food" ? (
                    <div className="relative">
                      <svg className="w-7 h-7 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 11h16a1 1 0 0 1 1 1v1a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-1a1 1 0 0 1 1-1z" />
                        <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                      </svg>
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -top-1 -right-1 border-2 border-white dark:border-slate-800 shadow-sm" />
                    </div>
                  ) : btn.type === "poop" ? (
                    <svg className="w-7 h-7 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3c0 1 .5 2 1.5 2.5C9 8 8 9 8 10.5c0 1.2.8 2.2 2 2.5-1.5.5-2.5 1.8-2.5 3.3 0 2.2 2 4 4.5 4s4.5-1.8 4.5-4c0-1.5-1-2.8-2.5-3.3 1.2-.3 2-1.3 2-2.5 0-1.5-1-2.5-2.5-3C14.5 7 15 6 15 5a3 3 0 0 0-3-3z" />
                    </svg>
                  ) : btn.type === "walk" ? (
                    <svg className="w-7 h-7 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="6" r="2" />
                      <path d="M9 8v4l3 2" />
                      <path d="M15 11l-3-2" />
                      <path d="M12 14l-2 6" />
                      <path d="M14 16l3 4" />
                      <path d="M18 16c1-1 3-1 4 0" />
                    </svg>
                  ) : btn.type === "bath" ? (
                    <svg className="w-7 h-7 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
                      <path d="M6 12V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      <path d="M4 21l2-2" />
                      <path d="M20 21l-2-2" />
                    </svg>
                  ) : (
                    <span className="text-2xl select-none leading-none">
                      {btn.emoji || "✨"}
                    </span>
                  )}
                </button>
              ))}

              {/* Plus Button to Add New Custom Activity */}
              <button
                type="button"
                onClick={() => handleActionClick("เพิ่มกิจกรรมใหม่")}
                className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 active:scale-95 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.06)] shrink-0"
                title="เพิ่มกิจกรรมใหม่"
              >
                <Plus className="w-7 h-7 stroke-[2.4]" />
              </button>
            </div>
          </div>

          {/* Today's Logged Activities Feed */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white font-kanit">
                  บันทึกกิจกรรมวันนี้ (0)
                </h3>
              </div>
              <Link
                href="/login"
                className="text-[12px] font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                บันทึกเพิ่ม
              </Link>
            </div>

            <div className="py-4 text-center text-slate-400 dark:text-slate-500 text-xs">
              ยังไม่มีบันทึกกิจกรรมวันนี้ แตะปุ่มด้านบนเพื่อเริ่มบันทึก! ✨
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

          {/* PetCare Premium Banner Card */}
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

        </div>

        {/* Note: รูปที่ 3 (BottomNav) ลบออกสำหรับหน้านี้ตามที่ระบุในคำขอ */}

      </div>
    </MobileFrame>
  );
}
