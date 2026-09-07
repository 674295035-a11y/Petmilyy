"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  AlertCircle,
  Heart,
  Crown,
  CheckCircle2,
  X,
  Sparkles,
  Clock,
  Trash2,
  Calendar,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { FloralCatAvatar, GoldenRetrieverAvatar } from "@/components/PetAvatars";
import { usePetContext, ActivityButton } from "@/lib/petContext";

const activityPresets = [
  { name: "ป้อนยา", emoji: "💊", type: "medicine" },
  { name: "เล่นของเล่น", emoji: "🎾", type: "play" },
  { name: "ตัดเล็บ/แปรงขน", emoji: "✂️", type: "groom" },
  { name: "วัดไข้/ตรวจสุขภาพ", emoji: "🩺", type: "health" },
  { name: "ดื่มน้ำ", emoji: "💧", type: "water" },
  { name: "ให้ขนม/รางวัล", emoji: "🍗", type: "treat" },
  { name: "นอนหลับพักผ่อน", emoji: "😴", type: "sleep" },
  { name: "แปรงฟัน", emoji: "🦷", type: "teeth" },
];

const emojiList = ["💊", "🎾", "✂️", "🩺", "💧", "🍗", "😴", "🦷", "🧼", "🧶", "⭐", "🏆"];

export default function HomePage() {
  const {
    pets,
    selectedPetIndex,
    setSelectedPetIndex,
    selectedPet,
    activityButtons,
    addActivityButton,
    activityLogs,
    logActivity,
    removeActivityLog,
    notifications,
    clearNotifications,
  } = usePetContext();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);

  // New activity form states
  const [customName, setCustomName] = useState("");
  const [customEmoji, setCustomEmoji] = useState("💊");
  const [customNote, setCustomNote] = useState("");
  const [pinToQuickBar, setPinToQuickBar] = useState(true);

  // Filter logs for the selected pet
  const petLogs = activityLogs.filter(
    (log) => !log.petId || log.petId === selectedPet.id
  );

  const handleQuickActivityClick = (btn: ActivityButton) => {
    setActiveActivityId(btn.id);
    logActivity(btn.type, `บันทึก${btn.name}`, btn.emoji);
    setToastMessage(`บันทึกกิจกรรม "${btn.name}" สำหรับ ${selectedPet.name} เรียบร้อยแล้ว ✨`);
    setTimeout(() => setActiveActivityId(null), 350);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleSelectPreset = (preset: typeof activityPresets[0]) => {
    setCustomName(preset.name);
    setCustomEmoji(preset.emoji);
  };

  const handleSaveCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    // Log the activity immediately
    logActivity("custom", customName.trim(), customEmoji, customNote.trim());

    // If user wants it on the quick bar, add it
    if (pinToQuickBar) {
      const alreadyExists = activityButtons.some(
        (b) => b.name.toLowerCase() === customName.trim().toLowerCase()
      );
      if (!alreadyExists) {
        addActivityButton({
          name: customName.trim(),
          emoji: customEmoji,
          type: "custom",
        });
      }
    }

    setShowAddActivityModal(false);
    setToastMessage(`บันทึกกิจกรรม "${customName.trim()}" สำหรับ ${selectedPet.name} เรียบร้อยแล้ว 🎉`);
    setCustomName("");
    setCustomNote("");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full relative select-none">
        
        {/* App Header (Top Mint Teal Bar) */}
        <AppHeader
          backHref="/"
          showLogo={true}
          showBell={true}
          bellCount={notifications.filter((n) => n.unread).length}
          onBellClick={() => setShowNotificationModal(true)}
        />

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-4">
          
          {/* Toast Notification for Instant Feedback */}
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          {/* Horizontal Pet Selector Bar */}
          <div className="flex items-center gap-3.5 py-1 px-1 overflow-x-auto no-scrollbar">
            {pets.map((pet, idx) => (
              <button
                key={pet.id}
                type="button"
                onClick={() => setSelectedPetIndex(idx)}
                className={`relative rounded-full p-0.5 transition-all duration-200 shrink-0 ${
                  selectedPetIndex === idx
                    ? "ring-2 ring-[#5CB8C1] ring-offset-2 scale-105"
                    : "opacity-80 hover:opacity-100"
                }`}
                title={pet.name}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center border border-amber-100">
                  {pet.avatar === "dog" ? (
                    <GoldenRetrieverAvatar size={56} />
                  ) : (
                    <FloralCatAvatar size={56} />
                  )}
                </div>
              </button>
            ))}

            {/* Add Pet Button */}
            <Link
              href="/pets/new"
              className="w-14 h-14 rounded-full bg-slate-200 hover:bg-slate-300 active:scale-95 flex items-center justify-center text-slate-700 transition-all shadow-sm shrink-0"
              title="เพิ่มสัตว์เลี้ยงใหม่"
            >
              <Plus className="w-7 h-7 stroke-[2.2]" />
            </Link>
          </div>

          {/* Urgent Appointment Alert Cards */}
          <div className="space-y-2.5">
            {/* Alert Card 1 */}
            <Link
              href="/clinic"
              className="block bg-white rounded-2xl p-3.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-transparent flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-500 font-bold text-xs">
                    !
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-red-600 leading-tight">
                    นัดหมายพบแพทย์
                  </div>
                  <div className="text-[13px] text-slate-700 mt-0.5">
                    พรุ่งนี้ เวลา 10:00 น. ที่คลินิกสงขลา
                  </div>
                </div>
              </div>
            </Link>

            {/* Alert Card 2 */}
            <Link
              href="/clinic"
              className="block bg-white rounded-2xl p-3.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-transparent flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-500 font-bold text-xs">
                    !
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-red-600 leading-tight">
                    นัดหมายพบแพทย์
                  </div>
                  <div className="text-[13px] text-slate-700 mt-0.5">
                    22/07/69 เวลา 09:00 น. ที่คลินิกสงขลา
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Activity Logger Section */}
          <div className="space-y-2 text-left pt-1">
            <div className="flex items-center justify-between">
              <div className="inline-block bg-slate-100 px-3 py-1 rounded-md">
                <h2 className="text-[13px] font-semibold text-slate-800">
                  บันทึกกิจกรรมด่วน
                </h2>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                ({selectedPet.name})
              </span>
            </div>

            {/* Quick Activity Circle Buttons (Scrollable if many buttons) */}
            <div className="flex items-center gap-2.5 pt-1 overflow-x-auto no-scrollbar pb-1">
              {activityButtons.map((btn) => {
                const isActive = activeActivityId === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => handleQuickActivityClick(btn)}
                    className={`w-14 h-14 rounded-full bg-white border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-95 flex flex-col items-center justify-center transition-all shrink-0 relative ${
                      isActive ? "scale-110 ring-2 ring-emerald-500 bg-emerald-50" : "hover:border-teal-300"
                    }`}
                    title={`บันทึก ${btn.name}`}
                  >
                    {btn.type === "food" ? (
                      <div className="relative">
                        <svg className="w-7 h-7 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 11h16a1 1 0 0 1 1 1v1a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-1a1 1 0 0 1 1-1z" />
                          <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                        </svg>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -top-1 -right-1 border-2 border-white shadow-sm" />
                      </div>
                    ) : btn.type === "poop" ? (
                      <svg className="w-7 h-7 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3c0 1 .5 2 1.5 2.5C9 8 8 9 8 10.5c0 1.2.8 2.2 2 2.5-1.5.5-2.5 1.8-2.5 3.3 0 2.2 2 4 4.5 4s4.5-1.8 4.5-4c0-1.5-1-2.8-2.5-3.3 1.2-.3 2-1.3 2-2.5 0-1.5-1-2.5-2.5-3C14.5 7 15 6 15 5a3 3 0 0 0-3-3z" />
                      </svg>
                    ) : btn.type === "walk" ? (
                      <svg className="w-7 h-7 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="6" r="2" />
                        <path d="M9 8v4l3 2" />
                        <path d="M15 11l-3-2" />
                        <path d="M12 14l-2 6" />
                        <path d="M14 16l3 4" />
                        <path d="M18 16c1-1 3-1 4 0" />
                      </svg>
                    ) : btn.type === "bath" ? (
                      <svg className="w-7 h-7 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                );
              })}

              {/* Plus Button to Add New Custom Activity */}
              <button
                type="button"
                onClick={() => setShowAddActivityModal(true)}
                className="w-14 h-14 rounded-full bg-slate-200 hover:bg-slate-300 active:scale-95 flex items-center justify-center text-slate-700 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.06)] shrink-0"
                title="เพิ่มกิจกรรมใหม่"
              >
                <Plus className="w-7 h-7 stroke-[2.4]" />
              </button>
            </div>
          </div>

          {/* Today's Logged Activities Feed (แสดงกิจกรรมที่บันทึกไว้) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <h3 className="text-[15px] font-bold text-slate-900 font-kanit">
                  บันทึกกิจกรรมวันนี้ ({petLogs.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddActivityModal(true)}
                className="text-[12px] font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                บันทึกเพิ่ม
              </button>
            </div>

            {petLogs.length === 0 ? (
              <div className="py-4 text-center text-slate-400 text-xs">
                ยังไม่มีบันทึกกิจกรรมวันนี้ แตะปุ่มด้านบนเพื่อเริ่มบันทึก! ✨
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {petLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-xl shrink-0">{log.emoji || "✨"}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-bold text-slate-800 truncate">
                          {log.title}
                        </div>
                        {log.note && (
                          <div className="text-[11px] text-slate-500 truncate">
                            {log.note}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[11px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {log.time}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeActivityLog(log.id)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors"
                        title="ลบบันทึก"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Health Info Card ("ข้อมูลสุขภาพ") */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-slate-900 text-slate-900" />
                <span className="text-[16px] font-bold text-slate-900 font-kanit">
                  ข้อมูลสุขภาพ
                </span>
              </div>
              <span className="text-[11px] font-medium px-2.5 py-1 bg-slate-200/80 text-slate-700 rounded-full">
                บันทึกโดยสัตวแพทย์
              </span>
            </div>

            {/* Health Info Rows */}
            <div className="space-y-2 text-[14px]">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-700 font-normal">
                  วัคซีนรวม (เข็มล่าสุด)
                </span>
                <span className="font-semibold text-slate-900">
                  {selectedPet.latestVaccine || "12 พ.ค. 2026"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-700 font-normal">
                  น้ำหนักล่าสุด
                </span>
                <span className="font-semibold text-slate-900">
                  {selectedPet.weight} กก. ปกติ
                </span>
              </div>
            </div>
          </div>

          {/* PetCare Premium Banner Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left space-y-3">
            {/* Header with Crown & Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 fill-slate-900 text-slate-900" />
                <span className="text-[16px] font-bold text-slate-900 tracking-tight font-kanit">
                  PetCare Premium
                </span>
              </div>
              <span className="text-[12px] font-semibold px-2.5 py-0.5 bg-slate-200 text-slate-800 rounded-full">
                ฿499/เดือน
              </span>
            </div>

            {/* Subtext Benefits */}
            <p className="text-[13px] text-slate-600 leading-snug">
              ปรึกษาแพทย์ส่วนตัว 24 ชม. และส่วนลดค่ายาพิเศษ
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/premium"
                className="block w-full text-center bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[15px] py-2.5 px-6 rounded-full shadow-[0_6px_16px_rgba(0,168,119,0.3)] transition-all duration-200"
              >
                สมัครเลย
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Navigation Bar */}
        <BottomNav />

        {/* Add / Log Activity Modal */}
        {showAddActivityModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900 font-kanit">
                    เพิ่มกิจกรรมสัตว์เลี้ยง
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selected Pet Tag */}
              <div className="text-xs bg-teal-50 text-teal-800 px-3 py-1.5 rounded-xl font-medium">
                บันทึกสำหรับ: <span className="font-bold">{selectedPet.name} ({selectedPet.breed})</span>
              </div>

              {/* Quick Presets */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  เลือกกิจกรรมด่วนที่พบบ่อย:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {activityPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1 border transition-all ${
                        customName === preset.name
                          ? "bg-teal-500 text-white border-teal-600 font-bold"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>{preset.emoji}</span>
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveCustomActivity} className="space-y-3 text-xs">
                {/* Custom Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    ชื่อกิจกรรม
                  </label>
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="เช่น ป้อนยาแก้อักเสบ, ฝึกวิ่ง"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Emoji Selector */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    เลือกสัญลักษณ์ไอคอน:
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    {emojiList.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setCustomEmoji(em)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-transform ${
                          customEmoji === em
                            ? "bg-white shadow-sm ring-2 ring-teal-500 scale-110"
                            : "hover:bg-slate-200/60"
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes (Optional) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    บันทึกเพิ่มเติม (ไม่บังคับ)
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="เช่น หลังอาหาร 1 เม็ด, วิ่ง 30 นาที"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Pin to Quick Bar Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    checked={pinToQuickBar}
                    onChange={(e) => setPinToQuickBar(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="font-medium text-slate-800">
                    📌 เพิ่มเป็นปุ่มด่วนบนหน้าหลักด้วย
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="pt-2 space-y-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00A877] hover:bg-[#009166] text-white font-medium rounded-full text-xs shadow-md active:scale-95 transition-transform"
                  >
                    บันทึกกิจกรรม
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddActivityModal(false)}
                    className="w-full py-1.5 text-slate-500 text-xs text-center"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Premium Modal */}
        {showPremiumModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-center space-y-4 shadow-2xl animate-fade-in border border-amber-200">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
                <Crown className="w-7 h-7 fill-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">PetCare Premium</h3>
                <p className="text-xs text-slate-500 mt-1">
                  แพ็กเกจการดูแลสัตว์เลี้ยงระดับ VIP เพียง ฿499/เดือน
                </p>
              </div>
              <ul className="text-left text-xs text-slate-700 space-y-2 bg-slate-50 p-3 rounded-2xl">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>ปรึกษาสัตวแพทย์ผ่านวิดีโอคอล 24 ชม.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>ส่วนลดค่ายาและวัคซีน 15% ทุกคลินิกในเครือ</span>
                </li>
              </ul>
              <div className="space-y-2 pt-1">
                <Link
                  href="/premium/pricing"
                  className="block w-full py-2.5 bg-[#00A877] text-white font-medium rounded-full text-sm shadow-md"
                >
                  ดูแพ็กเกจราคา
                </Link>
                <button
                  type="button"
                  onClick={() => setShowPremiumModal(false)}
                  className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-medium"
                >
                  ไว้คราวหลัง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Bell Modal */}
        {showNotificationModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-kanit">การแจ้งเตือน</h3>
                <button
                  type="button"
                  onClick={() => setShowNotificationModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    ไม่มีการแจ้งเตือนใหม่
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-2.5 bg-teal-50/80 rounded-2xl border border-teal-100 text-xs space-y-0.5">
                      <div className="font-bold text-teal-800">{notif.title}</div>
                      <div className="text-slate-600 leading-relaxed">{notif.message}</div>
                      <div className="text-[10px] text-slate-400 pt-0.5">{notif.time}</div>
                    </div>
                  ))
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  clearNotifications();
                  setShowNotificationModal(false);
                }}
                className="w-full py-2 bg-[#00A877] hover:bg-[#009166] text-white rounded-full text-xs font-medium transition-all font-kanit"
              >
                ทำเครื่องหมายว่าอ่านแล้ว
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
