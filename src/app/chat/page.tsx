"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  SquarePen,
  Search,
  Crown,
  Sparkles,
  Lock,
  ShieldCheck,
  X,
  Send,
  CheckCircle2,
  Filter,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { FloralCatAvatar, VetDoctorAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function ChatListPage() {
  const router = useRouter();
  const { currentUser, isPremium, chatThreads, clearUnread, sendChatMessage, notifications } =
    usePetContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "unread">("all");
  const [showMessageFilterModal, setShowMessageFilterModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState("vet-1");
  const [composeText, setComposeText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  const filteredThreads = chatThreads
    .filter((thread) => {
      if (filterMode === "unread") return thread.unreadCount > 0;
      return true;
    })
    .filter(
      (thread) =>
        thread.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.clinicName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeText.trim()) return;

    if (!isPremium && currentUser.role !== "vet") {
      setShowComposeModal(false);
      router.push("/premium");
      return;
    }

    sendChatMessage(selectedDoctorId, composeText.trim());
    clearUnread(selectedDoctorId);
    setShowComposeModal(false);
    setComposeText("");
    router.push(`/chat/${selectedDoctorId}`);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-white dark:bg-[#0B0F17] min-h-full select-none relative transition-colors duration-300">
        
        {/* Top Header */}
        <AppHeader
          backHref="/home"
          showLogo={true}
          showBell={true}
          bellCount={unreadNotifs}
        />

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="absolute top-16 left-4 right-4 z-50 p-3 bg-slate-900/90 dark:bg-slate-800 text-white rounded-2xl text-xs flex items-center gap-2 shadow-xl animate-fade-in border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Content View */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* User Profile Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-[#FCFDFC] dark:bg-slate-900">
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-amber-400/30 shadow-sm flex items-center justify-center">
                <FloralCatAvatar size={44} />
              </div>
              <div>
                <span className="text-[17px] font-semibold text-slate-800 dark:text-white block">
                  {currentUser.fullName || "คุณผู้ใช้งาน"}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isPremium ? "text-amber-600 dark:text-amber-400 font-bold" : "text-slate-400 dark:text-slate-400"
                  }`}
                >
                  {isPremium ? "⭐ PetCare Premium" : "สมาชิกทั่วไป"}
                </span>
              </div>
            </div>

            {/* Top Action Icons (Message Filter & Compose) */}
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <button
                type="button"
                onClick={() => setShowMessageFilterModal(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all cursor-pointer"
                title="ตัวกรองข้อความ"
              >
                <MessageSquare className="w-5 h-5 stroke-[1.8] text-slate-700 dark:text-slate-300" />
              </button>
              <button
                type="button"
                onClick={() => setShowComposeModal(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-teal-50 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 active:scale-90 transition-all cursor-pointer shadow-xs border border-teal-200 dark:border-slate-700"
                title="เขียนข้อความใหม่ / ปรึกษาแพทย์"
              >
                <SquarePen className="w-5 h-5 stroke-[2]" />
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
                <h2 className="text-[19px] font-bold text-slate-900 dark:text-white font-kanit">
                  บริการปรึกษาสัตวแพทย์ออนไลน์
                </h2>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  เฉพาะสมาชิก <span className="font-bold text-slate-800 dark:text-slate-200">PetCare Premium</span> เท่านั้น
                  <br />
                  แชทสอบถามอาการกับแพทย์ผู้เชี่ยวชาญได้ตลอด 24 ชม.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="w-full max-w-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 rounded-2xl p-3.5 space-y-2 text-left text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>ปรึกษาแพทย์ประจำตัวได้ไม่จำกัด</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>แนะนำแพทย์และคลินิกใกล้บ้าน</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>ส่วนลดค่ายาและการรักษา 20%</span>
                </div>
              </div>

              {/* Upgrade CTA Button */}
              <div className="w-full max-w-xs pt-2">
                <Link
                  href="/premium"
                  className="block w-full py-3 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-semibold text-[15px] rounded-full shadow-[0_6px_16px_rgba(0,168,119,0.35)] transition-all font-kanit text-center"
                >
                  สมัครสมาชิกพรีเมียม (฿499/เดือน)
                </Link>
              </div>
            </div>
          ) : (
            /* If Premium: Show Doctor Chat Threads */
            <>
              {/* Search Bar & Active Filter Pill */}
              <div className="px-5 py-3 bg-white dark:bg-slate-900 space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาแชทหรือคุณหมอ"
                    className="w-full pl-11 pr-4 py-2 bg-[#F4F6F8] dark:bg-slate-800 rounded-full text-[14px] text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-transparent dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner"
                  />
                  <Search className="w-5 h-5 text-slate-700 dark:text-slate-300 absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.2]" />
                </div>

                {filterMode === "unread" && (
                  <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 font-medium">
                    <span>แสดงเฉพาะข้อความที่ยังไม่ได้อ่าน</span>
                    <button
                      type="button"
                      onClick={() => setFilterMode("all")}
                      className="underline font-bold text-emerald-900 dark:text-emerald-100"
                    >
                      ดูทั้งหมด
                    </button>
                  </div>
                )}
              </div>

              {/* Chat List Items */}
              <div className="divide-y divide-slate-200/80 dark:divide-slate-800 flex-1">
                {filteredThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/chat/${thread.id}`}
                    onClick={() => clearUnread(thread.id)}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 active:bg-slate-100 dark:active:bg-slate-800 transition-colors group"
                  >
                    {/* Left: Avatar & Info */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="relative shrink-0">
                        <VetDoctorAvatar type={thread.avatarType} size={54} />
                        {thread.online && (
                          <span className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 absolute bottom-0 right-0 shadow-sm" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white truncate">
                            {thread.doctorName}
                          </h3>
                          <span className="text-[10px] bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-medium px-1.5 py-0.5 rounded-md shrink-0">
                            แพทย์แนะนำ
                          </span>
                        </div>
                        <p className="text-[13px] text-slate-600 dark:text-slate-400 truncate mt-0.5 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
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

        {/* Message Filter Modal */}
        {showMessageFilterModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-kanit">
                    ตัวกรองกล่องข้อความ
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMessageFilterModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFilterMode("all");
                    setShowMessageFilterModal(false);
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    filterMode === "all"
                      ? "bg-teal-50 dark:bg-teal-950/70 border-teal-500 font-bold text-teal-900 dark:text-teal-300"
                      : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <span>แชททั้งหมด</span>
                  <span className="font-mono font-bold">{chatThreads.length}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFilterMode("unread");
                    setShowMessageFilterModal(false);
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    filterMode === "unread"
                      ? "bg-teal-50 dark:bg-teal-950/70 border-teal-500 font-bold text-teal-900 dark:text-teal-300"
                      : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <span>ข้อความที่ยังไม่ได้อ่าน</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {chatThreads.filter((t) => t.unreadCount > 0).length}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowMessageFilterModal(false)}
                className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium"
              >
                ปิด
              </button>
            </div>
          </div>
        )}

        {/* Compose / New Consultation Modal */}
        {showComposeModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200 dark:border-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <SquarePen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-kanit">
                    เริ่มการปรึกษาใหม่
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleComposeSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    เลือกสัตวแพทย์ที่ต้องการปรึกษา:
                  </label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {chatThreads.map((thread) => (
                      <div
                        key={thread.id}
                        onClick={() => setSelectedDoctorId(thread.id)}
                        className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                          selectedDoctorId === thread.id
                            ? "bg-teal-50 dark:bg-teal-950/70 border-teal-500 ring-1 ring-teal-500 font-bold"
                            : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600"
                        }`}
                      >
                        <VetDoctorAvatar type={thread.avatarType} size={32} />
                        <div className="min-w-0 flex-1">
                          <div className="text-slate-800 dark:text-slate-100 truncate">{thread.doctorName}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{thread.clinicName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    พิมพ์ข้อความหรือคำถาม:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={composeText}
                    onChange={(e) => setComposeText(e.target.value)}
                    placeholder="เช่น น้องแมวมีอาการซึม ไม่ยอมทานอาหาร..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div className="pt-2 space-y-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00A877] hover:bg-[#009166] text-white font-medium rounded-full text-xs shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ส่งข้อความ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowComposeModal(false)}
                    className="w-full py-1.5 text-slate-500 dark:text-slate-400 text-xs text-center"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
