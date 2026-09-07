"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Phone, Video, Paperclip, Image as ImageIcon, Calendar } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import { PatientAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function VetPatientChatDetailPage() {
  const params = useParams();
  const patId = params?.id as string;
  const { vetPatients } = usePetContext();
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "patient",
      text: "สวัสดีค่ะคุณหมอโดนัท น้องแมวมีอาการเบื่ออาหารและซึมลงเล็กน้อยตั้งแต่เมื่อวานค่ะ",
      time: "10:15",
    },
    {
      id: "2",
      sender: "doctor",
      text: "สวัสดีค่ะคุณแม่น้อง น้องยังมีอาเจียนหรือถ่ายเหลวร่วมด้วยไหมคะ?",
      time: "10:18",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const patient = vetPatients.find((p) => p.id === patId) || vetPatients[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeNow = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "doctor",
        text: inputText.trim(),
        time: timeNow,
      },
    ]);
    setInputText("");
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none">
        
        {/* Header Bar */}
        <header className="w-full bg-[#62C0C6] py-2.5 px-3 flex items-center justify-between shadow-sm z-30 shrink-0">
          <div className="flex items-center gap-2">
            <Link
              href="/vet/chat"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
            </Link>
            <div className="shrink-0">
              <PatientAvatar type={patient.avatarType} size={40} />
            </div>
            <div className="text-left leading-tight">
              <div className="flex items-center gap-1 font-bold text-slate-900 text-[15px]">
                <span>{patient.ownerName}</span>
                {patient.isVIP && <span className="text-amber-500 text-xs">👑</span>}
              </div>
              <p className="text-[11px] text-slate-700">สัตว์เลี้ยง: {patient.petName} • ออนไลน์</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-900">
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10"
              title="สร้างนัดหมาย"
            >
              <Calendar className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10"
              title="โทรเสียง"
            >
              <Phone className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-left">
          <div className="text-center my-1">
            <span className="text-[11px] text-slate-500 bg-slate-200/80 px-3 py-1 rounded-full">
              วันนี้ • การปรึกษาเคสผู้ป่วย
            </span>
          </div>

          {messages.map((msg) => {
            const isDoctor = msg.sender === "doctor";
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isDoctor ? "justify-end" : "justify-start"}`}
              >
                {!isDoctor && (
                  <div className="shrink-0 mb-1">
                    <PatientAvatar type={patient.avatarType} size={30} />
                  </div>
                )}

                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    isDoctor
                      ? "bg-[#62C0C6] text-slate-900 font-medium rounded-br-xs"
                      : "bg-white text-slate-800 rounded-bl-xs border border-slate-100"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isDoctor ? "text-teal-900/70" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            className="w-9 h-9 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center shrink-0"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="พิมพ์คำแนะนำจากสัตวแพทย์..."
            className="flex-1 px-4 py-2.5 bg-slate-100 rounded-full text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-transparent focus:bg-white transition-all"
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
