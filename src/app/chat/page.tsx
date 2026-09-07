"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, SquarePen, Search } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { FloralCatAvatar, VetDoctorAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function ChatListPage() {
  const { chatThreads, clearUnread } = usePetContext();
  const [searchQuery, setSearchQuery] = useState("");

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
          bellCount={15}
        />

        {/* Content View */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* User Profile Bar (คุณนามิ) */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-[#FCFDFC]">
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-amber-200/80 shadow-sm flex items-center justify-center">
                <FloralCatAvatar size={44} />
              </div>
              <span className="text-[17px] font-semibold text-slate-800">
                คุณนามิ
              </span>
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
                    <h3 className="text-[16px] font-semibold text-slate-900 truncate">
                      {thread.doctorName}
                    </h3>
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

        </div>

        {/* Bottom Navigation Bar */}
        <BottomNav />
      </div>
    </MobileFrame>
  );
}
