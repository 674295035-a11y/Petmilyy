"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Phone, Video, Paperclip, Image as ImageIcon, Bell, X, CheckCheck } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import { VetDoctorAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = params?.id as string;
  const { chatThreads, sendChatMessage, clearUnread, fetchChatMessages, notifications, clearNotifications } =
    usePetContext();
  const [inputText, setInputText] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const thread = chatThreads.find((t) => t.id === threadId) || chatThreads[0];
  const unreadNotifs = notifications ? notifications.filter((n) => n.unread).length : 0;

  useEffect(() => {
    if (threadId) {
      clearUnread(threadId);
      fetchChatMessages(threadId);
    }
  }, [threadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setInputText("");
    await sendChatMessage(thread.id, textToSend);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/chat");
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] dark:bg-[#0B0F17] min-h-full select-none transition-colors duration-300 relative">
        
        {/* Chat Room Top Bar */}
        <header className="w-full bg-[#62C0C6] py-2.5 px-3 flex items-center justify-between shadow-sm z-30 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-95 transition-all cursor-pointer"
              title="ย้อนกลับ"
              aria-label="ย้อนกลับ"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
            </button>
            <div className="relative shrink-0">
              <VetDoctorAvatar type={thread.avatarType} size={40} />
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white absolute bottom-0 right-0" />
            </div>
            <div className="text-left leading-tight">
              <h1 className="text-[16px] font-bold text-slate-900">{thread.doctorName}</h1>
              <p className="text-[11px] text-slate-700">{thread.clinicName} • ออนไลน์</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-900">
            <button
              type="button"
              onClick={() => setShowNotificationModal(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 active:scale-90 transition-all relative cursor-pointer"
              title="การแจ้งเตือน"
              aria-label="การแจ้งเตือน"
            >
              <Bell className="w-4 h-4 fill-slate-900 text-slate-900" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10"
              title="โทรเสียง"
            >
              <Phone className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10"
              title="วิดีโอคอล"
            >
              <Video className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </header>

        {/* Global Notification Modal inside Chat */}
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

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 text-left">
          <div className="text-center my-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 px-3 py-1 rounded-full">
              วันนี้ • การให้คำปรึกษาทางสัตวแพทย์
            </span>
          </div>

          {thread.messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="shrink-0 mb-1">
                    <VetDoctorAvatar type={thread.avatarType} size={32} />
                  </div>
                )}

                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    isUser
                      ? "bg-[#00A877] text-white rounded-br-xs"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-100 dark:border-slate-700"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isUser ? "text-emerald-100" : "text-slate-400 dark:text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            className="w-9 h-9 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="พิมพ์ข้อความปรึกษาแพทย์..."
            className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[14px] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-transparent dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-[#00A877] hover:bg-[#009166] active:scale-95 text-white flex items-center justify-center shadow-md disabled:opacity-40 transition-all shrink-0"
          >
            <Send className="w-5 h-5 stroke-[2]" />
          </button>
        </form>

      </div>
    </MobileFrame>
  );
}
