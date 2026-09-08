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
  Sun,
  Moon,
  KeyRound,
  Eye,
  EyeOff,
  Crown,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";
import PetmilyLogo from "@/components/PetmilyLogo";
import { FloralCatAvatar, PetAvatarDisplay } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function ProfilePage() {
  const { currentUser, pets, expenses, isPremium, notifications, themeMode, setThemeMode } = usePetContext();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Change password states
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passSavedMessage, setPassSavedMessage] = useState<string | null>(null);

  const totalExpense = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  const formattedExpense = totalExpense > 0 ? `฿${totalExpense.toLocaleString()}` : "฿0.00";

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass) {
      alert("กรุณาระบุรหัสผ่านใหม่");
      return;
    }
    if (newPass !== confirmPass) {
      alert("รหัสผ่านใหม่และการยืนยันไม่ตรงกัน");
      return;
    }
    setPassSavedMessage("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว!");
    setTimeout(() => {
      setPassSavedMessage(null);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
      setActiveModal(null);
    }, 1500);
  };

  const menuItems = [
    {
      id: "history",
      title: "ประวัติการจองคิว/การรักษา",
      icon: Clock,
      href: "/history",
    },
    {
      id: "premium",
      title: isPremium ? "จัดการแพ็กเกจพรีเมี่ยม ⭐" : "ปลดล็อคพรีเมี่ยม",
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
      <div className={`flex-1 flex flex-col justify-between min-h-full select-none relative ${themeMode === "dark" ? "bg-slate-900 text-white" : "bg-[#F8FAFB] text-slate-900"}`}>
        
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
            <div className={`${themeMode === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-100 text-slate-900"} rounded-3xl pt-11 pb-4 px-4 border shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative text-center`}>
              {/* Floating Avatar */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md border-2 border-white flex items-center justify-center">
                  {pets.length > 0 ? (
                    <PetAvatarDisplay
                      avatar={pets[0].avatar}
                      photoUrl={pets[0].photoUrl}
                      name={pets[0].name}
                      size={76}
                    />
                  ) : (
                    <FloralCatAvatar size={76} />
                  )}
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-[19px] font-bold font-kanit">
                {currentUser.fullName || "ผู้ใช้งานทั่วไป"}
              </h2>
              <p className={`text-[13px] ${themeMode === "dark" ? "text-slate-400" : "text-slate-500"} mt-0.5`}>
                {currentUser.email || "user@petmily.app"}
              </p>
              
              {/* Membership Status Badge */}
              <div className="flex items-center justify-center gap-1 mt-1.5">
                {currentUser.role === "vet" ? (
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[12px] font-bold bg-teal-100 text-teal-800">
                    👨‍⚕️ สัตวแพทย์
                  </span>
                ) : isPremium ? (
                  <span className="inline-flex items-center gap-1 px-3.5 py-0.5 rounded-full text-[12px] font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-sm animate-pulse">
                    <Crown className="w-3.5 h-3.5 fill-current" /> สมาชิก Premium ⭐
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[12px] font-semibold text-emerald-600 bg-emerald-50">
                    สมาชิกทั่วไป
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className={`border-t ${themeMode === "dark" ? "border-slate-700" : "border-slate-200/80"} my-3`} />

              {/* 2 Stats Columns */}
              <div className={`grid grid-cols-2 divide-x ${themeMode === "dark" ? "divide-slate-700" : "divide-slate-100"} text-center`}>
                <div>
                  <div className="text-[20px] font-bold font-kanit">
                    {pets.length}
                  </div>
                  <div className={`text-[12px] ${themeMode === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    สัตว์เลี้ยง
                  </div>
                </div>
                <Link href="/expenses" className={`block ${themeMode === "dark" ? "hover:bg-slate-700/50" : "hover:bg-slate-50"} rounded-xl transition-colors`}>
                  <div className="text-[20px] font-bold font-kanit">
                    {formattedExpense}
                  </div>
                  <div className={`text-[12px] ${themeMode === "dark" ? "text-slate-400" : "text-slate-500"}`}>
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
                <div className={`w-full ${themeMode === "dark" ? "bg-slate-800 border-slate-700 hover:bg-slate-750" : "bg-white border-slate-100 hover:bg-slate-50"} rounded-2xl py-3 px-4 border shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between active:scale-[0.99] transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${themeMode === "dark" ? "text-teal-400" : "text-slate-800"} stroke-[2]`} />
                    <span className={`text-[14px] font-medium font-kanit ${themeMode === "dark" ? "text-white" : "text-slate-800"}`}>
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${themeMode === "dark" ? "text-slate-500" : "text-slate-400"} stroke-[1.8]`} />
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

        {/* Modal for Settings / Notifications / Privacy / Help */}
        {activeModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`${themeMode === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"} w-full max-w-sm rounded-3xl p-5 text-left space-y-4 shadow-2xl animate-fade-in border max-h-[85vh] overflow-y-auto`}>
              <div className={`flex items-center justify-between pb-2 border-b ${themeMode === "dark" ? "border-slate-700" : "border-slate-100"}`}>
                <h3 className="text-base font-bold font-kanit">
                  {activeModal === "settings" && "การตั้งค่า"}
                  {activeModal === "notifications" && "การแจ้งเตือน"}
                  {activeModal === "privacy" && "ความเป็นส่วนตัวและรหัสผ่าน"}
                  {activeModal === "help" && "ศูนย์ช่วยเหลือ"}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${themeMode === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs space-y-3 py-1">
                {/* SETTINGS MODAL: Language + Interactive Dark/Light mode */}
                {activeModal === "settings" && (
                  <div className="space-y-3">
                    <div className={`flex items-center justify-between py-2 border-b ${themeMode === "dark" ? "border-slate-700" : "border-slate-100"}`}>
                      <span>ภาษาของระบบ (Language)</span>
                      <span className="font-bold text-[#62C0C6]">ภาษาไทย</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <label className="text-[13px] font-medium block">โหมดการแสดงผล (Theme)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setThemeMode("light")}
                          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                            themeMode === "light"
                              ? "bg-teal-50 border-[#62C0C6] text-teal-800 shadow-sm ring-2 ring-[#62C0C6]/20"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <Sun className="w-4 h-4 text-amber-500" />
                          สว่าง (Light)
                        </button>
                        <button
                          type="button"
                          onClick={() => setThemeMode("dark")}
                          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                            themeMode === "dark"
                              ? "bg-slate-700 border-[#62C0C6] text-teal-300 shadow-sm ring-2 ring-[#62C0C6]/30"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <Moon className="w-4 h-4 text-indigo-400" />
                          มืด (Dark)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS MODAL: Dynamic check */}
                {activeModal === "notifications" && (
                  <div className="space-y-2.5">
                    {notifications && notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className="p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-slate-800">
                          <div className="flex items-center gap-2 font-bold text-amber-900 text-[13px]">
                            <Bell className="w-4 h-4 text-amber-600" />
                            {n.title || "การแจ้งเตือนจากคลินิก"}
                          </div>
                          <p className="text-[12px] text-slate-700 mt-1">{n.message}</p>
                          {n.time && <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>}
                        </div>
                      ))
                    ) : (
                      <div className="py-8 px-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                          <Bell className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="text-[13px] font-bold text-slate-700">ไม่มีการแจ้งเตือนใหม่</div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          การแจ้งเตือนจะแสดงขึ้นเมื่อสัตวแพทย์บันทึกข้อมูลสุขภาพ หรือมีการนัดหมายฉีดวัคซีน
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* PRIVACY & PASSWORD MODAL */}
                {activeModal === "privacy" && (
                  <div className="space-y-3">
                    {passSavedMessage ? (
                      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-[13px]">{passSavedMessage}</span>
                      </div>
                    ) : (
                      <form onSubmit={handleSavePassword} className="space-y-2.5">
                        <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800 dark:text-slate-100 pb-1">
                          <KeyRound className="w-4 h-4 text-[#62C0C6]" />
                          <span>เปลี่ยนรหัสผ่าน (Change Password)</span>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">รหัสผ่านปัจจุบัน</label>
                          <input
                            type={showPass ? "text" : "password"}
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            placeholder="ระบุรหัสผ่านเดิม"
                            className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-[#62C0C6]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">รหัสผ่านใหม่</label>
                          <div className="relative mt-1">
                            <input
                              type={showPass ? "text" : "password"}
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                              placeholder="ระบุรหัสผ่านใหม่"
                              className="w-full px-3 py-2 pr-8 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-[#62C0C6]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPass(!showPass)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                              {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">ยืนยันรหัสผ่านใหม่</label>
                          <input
                            type={showPass ? "text" : "password"}
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
                            className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-[#62C0C6]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-[#62C0C6] hover:bg-[#53adb3] text-slate-900 font-bold rounded-xl text-xs shadow-sm transition-all"
                        >
                          บันทึกรหัสผ่านใหม่
                        </button>
                      </form>
                    )}

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        🛡️ ระบบรักษาความปลอดภัยและการเข้ารหัสข้อมูลสุขภาพตามมาตรฐานสากล PDPA และ HIPAA
                      </p>
                    </div>
                  </div>
                )}

                {/* HELP MODAL */}
                {activeModal === "help" && (
                  <div className="space-y-2.5">
                    <p className="text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
                      หากมีข้อสงสัยหรือต้องการความช่วยเหลือ สามารถติดต่อทีมงาน Petmily ได้ผ่านช่องทางดังนี้:
                    </p>
                    <div className="p-3.5 bg-[#EDF8F8] dark:bg-slate-700/60 rounded-2xl space-y-2 text-[12px] border border-teal-100/80 dark:border-slate-600">
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span className="text-slate-700 dark:text-slate-200">Call Center:</span>
                        <a
                          href="tel:0656324781"
                          className="font-bold text-[#0D6E6E] dark:text-teal-300 underline hover:opacity-80 transition-opacity"
                        >
                          0656324781
                        </a>
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">(24 ชม.)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span>💬</span>
                        <span className="text-slate-700 dark:text-slate-200">Facebook:</span>
                        <a
                          href="https://www.facebook.com/search/top?q=Petmily"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#0D6E6E] dark:text-teal-300 underline hover:opacity-80 transition-opacity"
                        >
                          เพจ Petmily
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>📧</span>
                        <span className="text-slate-700 dark:text-slate-200">Email:</span>
                        <a
                          href="mailto:petmily@gmail.com"
                          className="font-bold text-[#0D6E6E] dark:text-teal-300 underline hover:opacity-80 transition-opacity"
                        >
                          petmily@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {activeModal !== "privacy" && (
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-[#62C0C6] hover:bg-[#53adb3] text-slate-900 font-bold rounded-full text-xs shadow-xs transition-all"
                >
                  ตกลง
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
