"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, MessageSquare, SquarePen, Search } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";
import { VetDoctorAvatar, PatientAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function VetChatListPage() {
  const { vetPatients } = usePetContext();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = vetPatients.filter((pat) =>
    pat.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-white min-h-full select-none relative">
        
        {/* Top Header Bar: Dr. Donut */}
        <header className="w-full bg-[#62C0C6] py-2.5 px-4 flex items-center justify-between shadow-sm z-30 shrink-0">
          <Link
            href="/vet/home"
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-95 transition-all"
            aria-label="ย้อนกลับ"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white shadow-xs border border-white/60 flex items-center justify-center">
              <VetDoctorAvatar type="donut" size={36} />
            </div>
            <span className="text-[17px] font-bold text-slate-900 font-kanit">
              แพทย์หญิงโดนัท
            </span>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-95 transition-all relative"
          >
            <Bell className="w-6 h-6 fill-slate-900 text-slate-900 stroke-[1.5]" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Dr. Donut Profile Row */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-[#FCFDFC]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-amber-200 shadow-sm flex items-center justify-center">
                <VetDoctorAvatar type="donut" size={44} />
              </div>
              <span className="text-[17px] font-semibold text-slate-800 font-kanit">
                แพทย์หญิงโดนัท
              </span>
            </div>

            {/* Actions (Chat & Compose) */}
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

          {/* Search Bar */}
          <div className="px-5 py-3.5 bg-white">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาแชทหรือผู้ติดต่อ"
                className="w-full pl-11 pr-4 py-2.5 bg-[#F4F6F8] rounded-full text-[14px] text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-transparent focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-700 absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.2]" />
            </div>
          </div>

          {/* Patient Chat List */}
          <div className="divide-y divide-slate-200/80 flex-1">
            {filteredPatients.map((pat) => (
              <Link
                key={pat.id}
                href={`/vet/chat/${pat.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 active:bg-slate-100 transition-colors group"
              >
                {/* Left: Avatar & Info */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0">
                    <PatientAvatar type={pat.avatarType} size={54} />
                  </div>

                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-[16px] font-semibold text-slate-900 truncate font-kanit">
                        {pat.ownerName}
                      </h3>
                      {pat.isVIP && (
                        <span className="text-amber-500 text-sm">👑</span>
                      )}
                    </div>
                    <p className="text-[13px] text-slate-600 truncate mt-0.5 group-hover:text-slate-800 transition-colors">
                      {pat.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Right: Unread Badge */}
                {pat.unreadCount > 0 && (
                  <div className="ml-3 shrink-0">
                    <span className="w-6 h-6 rounded-full bg-[#539E18] text-white text-[13px] font-bold flex items-center justify-center shadow-sm">
                      {pat.unreadCount}
                    </span>
                  </div>
                )}
              </Link>
            ))}

            {filteredPatients.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                ไม่พบผลการค้นหา
              </div>
            )}
          </div>

        </div>

        {/* Bottom Nav (3 Tabs) */}
        <BottomNav role="vet" />
      </div>
    </MobileFrame>
  );
}
