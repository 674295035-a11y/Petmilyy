"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, SquarePen, Search, Crown, Sparkles, Lock, ShieldCheck } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { FloralCatAvatar, VetDoctorAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function ChatListPage() {
  const { currentUser, isPremium, chatThreads, clearUnread, notifications } = usePetContext();
  const [searchQuery, setSearchQuery] = useState("");

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  const filteredThreads = chatThreads.filter(
    (thread) =>
      thread.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.clinicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-white min-h-full select-none">
        
        {/* Top Header */}
        <AppHeader
          backHref="/home"
          showLogo={true}
          showBell={true}
          bellCount={unreadNotifs}
        />

        {/* Content View */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* User Profile Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-[#FCFDFC]">
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-amber-200/80 shadow-sm flex items-center justify-center">
                <FloralCatAvatar size={44} />
              </div>
              <div>
                <span className="text-[17px] font-semibold text-slate-800 block">
                  {currentUser.fullName || "คุณผู้ใช้งาน"}
                </span>
                <span className={`text-[11px] font-medium ${isPremium ? "text-amber-600 font-bold" : "text-slate-400"}`}>
                  {isPremium ? "⭐ PetCare Premium" : "สมาชิกทั่วไป"}
                </span>
              </div>
            </div>

            {/* Top Action Icons (Chat & Compose) */}
            <div className="flex items-center gap-3 text-slate-800">
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all"
                title="ข้อความทั้งหมด"
              >
                <MessageSquare className="w-6 h-6 stroke-[1.8]" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all"
                title="เขียนข้อความใหม่"
              >
                <SquarePen className="w-6 h-6 stroke-[1.8]" />
              </button>
            </div>
          </div>

          {/* If NOT Premium (and not a vet): Show Locked Feature Screen */}
          {!isPremium && currentUser.role !== "vet" ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Crown className="w-10 h-10 text-slate-900 fill-slate-900" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5 max-w-xs">
                <h2 className="text-[19px] font-bold text-slate-900 font-kanit">
                  บริการปรึกษาสัตวแพทย์ออนไลน์
                </h2>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  เฉพาะสมาชิก <span className="font-bold text-slate-800">PetCare Premium</span> เท่านั้น
                  <br />
                  แชทสอบถามอาการกับแพทย์ผู้เชี่ยวชาญได้ตลอด 24 ชม.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="w-full max-w-xs bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-2 text-left text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>ปรึกษาแพทย์ประจำตัวได้ไม่จำกัด</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>แนะนำแพทย์และคลินิกใกล้บ้าน</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>ส่วนลดค่ายาและการรักษา 20%</span>
                </div>
              </div>

              {/* Upgrade CTA Button */}
              <div className="w-full max-w-xs pt-2">
                <Link
                  href="/premium"
                  className="block w-full py-3 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-semibold text-[15px] rounded-full shadow-[0_6px_16px_rgba(0,168,119,0.35)] transition-all font-kanit"
                >
                  สมัครสมาชิกพรีเมียม (฿499/เดือน)
                </Link>
              </div>
            </div>
          ) : (
            /* If Premium: Show Doctor Chat Threads */
            <>
              {/* Search Bar */}
              <div className="px-5 py-3.5 bg-white">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาแชทหรือคุณหมอ"
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F4F6F8] rounded-full text-[14px] text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-transparent focus:bg-white transition-all shadow-inner"
                  />
                  <Search className="w-5 h-5 text-slate-700 absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.2]" />
                </div>
              </div>

              {/* Chat List Items */}
              <div className="divide-y divide-slate-200/80 flex-1">
                {filteredThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/chat/${thread.id}`}
                    onClick={() => clearUnread(thread.id)}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                  >
                    {/* Left: Avatar & Info */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="relative shrink-0">
                        <VetDoctorAvatar type={thread.avatarType} size={54} />
                        {thread.online && (
                          <span className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white absolute bottom-0 right-0 shadow-sm" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[16px] font-semibold text-slate-900 truncate">
                            {thread.doctorName}
                          </h3>
                          <span className="text-[10px] bg-teal-50 text-teal-700 font-medium px-1.5 py-0.5 rounded-md shrink-0">
                            แพทย์แนะนำ
                          </span>
                        </div>
                        <p className="text-[13px] text-slate-600 truncate mt-0.5 group-hover:text-slate-800 transition-colors">
                          {thread.lastMessage}
                        </p>
                      </div>
                    </div>

                    {/* Right: Unread Badge */}
                    {thread.unreadCount > 0 && (
                      <div className="ml-3 shrink-0">
                        <span className="w-6 h-6 rounded-full bg-[#539E18] text-white text-[13px] font-bold flex items-center justify-center shadow-sm">
                          {thread.unreadCount}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}

                {filteredThreads.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    ไม่พบผลลัพธ์การค้นหา
                  </div>
                )}
              </div>
            </>
          )}

        </div>

        {/* Bottom Navigation Bar */}
        <BottomNav />
      </div>
    </MobileFrame>
  );
}
