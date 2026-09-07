"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Lock,
  Settings,
  AlertCircle,
  User,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  X,
  Bell,
  CheckCircle2,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";
import PetmilyLogo from "@/components/PetmilyLogo";
import { FloralCatAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function ProfilePage() {
  const { pets } = usePetContext();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const menuItems = [
    {
      id: "history",
      title: "ประวัติการจองคิว/การรักษา",
      icon: Clock,
      href: "/history",
    },
    {
      id: "premium",
      title: "ปลดล็อคพรีเมี่ยม",
      icon: Lock,
      href: "/premium",
    },
    {
      id: "settings",
      title: "การตั้งค่า",
      icon: Settings,
      onClick: () => setActiveModal("settings"),
    },
    {
      id: "notifications",
      title: "การแจ้งเตือน",
      icon: AlertCircle,
      onClick: () => setActiveModal("notifications"),
    },
    {
      id: "privacy",
      title: "ความเป็นส่วนตัวและรหัสผ่าน",
      icon: User,
      onClick: () => setActiveModal("privacy"),
    },
    {
      id: "help",
      title: "ศูนย์ช่วยเหลือ",
      icon: MessageCircle,
      onClick: () => setActiveModal("help"),
    },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
        
        {/* Top Header Bar */}
        <header className="w-full bg-[#62C0C6] py-2.5 px-4 flex items-center justify-between shadow-sm z-30 shrink-0">
          <Link
            href="/home"
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-95 transition-all"
            aria-label="ย้อนกลับ"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
          </Link>
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-white/60">
            <PetmilyLogo size={32} />
          </div>
          <div className="w-9 h-9" />
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-3.5">
          
          {/* Top Pill Banner: โปรไฟล์ของฉัน */}
          <div className="flex justify-center">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-8 py-1.5 rounded-full text-[15px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] font-kanit">
              โปรไฟล์ของฉัน
            </div>
          </div>

          {/* User Profile Card with Avatar Floating */}
          <div className="pt-8">
            <div className="bg-white rounded-3xl pt-11 pb-4 px-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative text-center">
              {/* Floating Avatar */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md border-2 border-white flex items-center justify-center">
                  <FloralCatAvatar size={76} />
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-[19px] font-bold text-slate-900 font-kanit">
                คุณนามิ
              </h2>
              <p className="text-[13px] text-slate-500 mt-0.5">
                maewemail@gmail.com
              </p>
              <div className="text-[13px] font-medium text-emerald-600 mt-1">
                สมาชิกทั่วไป
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/80 my-3" />

              {/* 2 Stats Columns */}
              <div className="grid grid-cols-2 divide-x divide-slate-100 text-center">
                <div>
                  <div className="text-[20px] font-bold text-slate-900 font-kanit">
                    {pets.length}
                  </div>
                  <div className="text-[12px] text-slate-500">
                    สัตว์เลี้ยง
                  </div>
                </div>
                <Link href="/expenses" className="block hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="text-[20px] font-bold text-slate-900 font-kanit">
                    ฿12.5k
                  </div>
                  <div className="text-[12px] text-slate-500">
                    ค่าใช้จ่ายในเดือนนี้
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* 6 Menu Items */}
          <div className="space-y-2.5 pt-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="w-full bg-white rounded-2xl py-3 px-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between hover:bg-slate-50 active:scale-[0.99] transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-800 stroke-[2]" />
                    <span className="text-[14px] font-medium text-slate-800 font-kanit">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 stroke-[1.8]" />
                </div>
              );

              if (item.href) {
                return (
                  <Link key={item.id} href={item.href} className="block">
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className="w-full block text-left"
                >
                  {content}
                </button>
              );
            })}
          </div>

          {/* Logout Button (Solid Red) */}
          <div className="pt-2">
            <Link
              href="/"
              className="block w-full py-3 bg-[#E50914] hover:bg-[#CC0812] active:scale-[0.98] text-white font-semibold text-[16px] rounded-full text-center shadow-[0_6px_16px_rgba(229,9,20,0.35)] transition-all font-kanit"
            >
              ออกจากระบบ
            </Link>
          </div>

        </div>

        {/* Bottom Nav */}
        <BottomNav />

        {/* Generic Modal for Settings / Privacy / Help */}
        {activeModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3 shadow-2xl animate-fade-in border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-kanit">
                  {activeModal === "settings" && "การตั้งค่า"}
                  {activeModal === "notifications" && "การแจ้งเตือน"}
                  {activeModal === "privacy" && "ความเป็นส่วนตัวและรหัสผ่าน"}
                  {activeModal === "help" && "ศูนย์ช่วยเหลือ"}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-2 py-1">
                {activeModal === "settings" && (
                  <>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span>ภาษาของระบบ (Language)</span>
                      <span className="font-bold text-teal-700">ภาษาไทย</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span>โหมดการแสดงผล</span>
                      <span className="font-bold text-slate-700">สว่าง (Light)</span>
                    </div>
                  </>
                )}
                {activeModal === "notifications" && (
                  <>
                    <div className="p-2 bg-orange-50 rounded-xl border border-orange-200">
                      <span className="font-bold text-orange-700">⏰ นัดหมายฉีดวัคซีน</span>
                      <p className="text-slate-600 mt-0.5">พรุ่งนี้ 10:00 น. ที่คลินิกสงขลา</p>
                    </div>
                  </>
                )}
                {activeModal === "privacy" && (
                  <p>ระบบรักษาความปลอดภัยและการเข้ารหัสข้อมูลสุขภาพตามมาตรฐานสากล PDPA และ HIPAA</p>
                )}
                {activeModal === "help" && (
                  <p>หากมีข้อสงสัยหรือต้องการความช่วยเหลือ สามารถโทรสายด่วน Call Center: 02-123-4567 ได้ตลอด 24 ชม.</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full py-2 bg-[#62C0C6] hover:bg-[#53adb3] text-slate-900 font-medium rounded-full text-xs shadow-xs"
              >
                ตกลง
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
