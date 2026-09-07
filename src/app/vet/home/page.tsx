"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Heart, AlertCircle, X, CheckCircle2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";
import { VetDoctorAvatar } from "@/components/PetAvatars";
import { usePetContext, VetPatient } from "@/lib/petContext";

export default function VetHomePage() {
  const { vetPatients, updateVetPatient } = usePetContext();
  const [editingPatient, setEditingPatient] = useState<VetPatient | null>(null);
  const [editWeight, setEditWeight] = useState("");
  const [editVaccine, setEditVaccine] = useState("");
  const [editChecked, setEditChecked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openEditModal = (pat: VetPatient) => {
    setEditingPatient(pat);
    setEditWeight(pat.weight === "-" ? "" : pat.weight.replace(" กก. ปกติ", ""));
    setEditVaccine(pat.lastVaccine);
    setEditChecked(pat.checked);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;

    updateVetPatient(editingPatient.id, {
      weight: editWeight ? `${editWeight} กก. ปกติ` : "-",
      lastVaccine: editVaccine || editingPatient.lastVaccine,
      checked: editChecked,
    });

    setToastMessage(`อัปเดตข้อมูลสุขภาพของ "${editingPatient.ownerName}" สำเร็จแล้ว`);
    setEditingPatient(null);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
        
        {/* Top Header: Dr. Donut */}
        <header className="w-full bg-[#62C0C6] py-2.5 px-4 flex items-center justify-between shadow-sm z-30 shrink-0">
          <Link
            href="/"
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
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-4 text-left">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          {/* Section 1: กิจกรรม */}
          <div className="space-y-2.5">
            <h2 className="text-[18px] font-bold text-slate-900 font-kanit">
              กิจกรรม
            </h2>

            {/* Alert Card 1 */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0 mt-0.5 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-bold text-red-600 leading-tight">
                  วันนัดหมาย
                </div>
                <div className="text-[13px] text-slate-700 mt-0.5">
                  พรุ่งนี้ เวลา 10:00 น. ที่คลินิกสงขลา
                </div>
              </div>
            </div>

            {/* Alert Card 2 */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0 mt-0.5 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-[15px] font-bold text-red-600 leading-tight">
                    วันนัดหมาย
                  </div>
                  <span className="text-[13px] font-bold text-slate-800">
                    แพทย์หญิงโดนัท
                  </span>
                </div>
                <div className="text-[13px] text-slate-700 mt-0.5">
                  22/07/69 เวลา 09:00 น. ที่คลินิกสงขลา
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: การรักษา */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-slate-900">
              <Heart className="w-5 h-5 fill-slate-900 text-slate-900" />
              <h2 className="text-[18px] font-bold text-slate-900 font-kanit">
                การรักษา
              </h2>
            </div>

            {/* Patient Treatment Cards */}
            {vetPatients.map((pat) => (
              <div
                key={pat.id}
                className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] space-y-3 text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-slate-900 text-slate-900" />
                    <span className="text-[15px] font-bold text-slate-900 font-kanit">
                      ข้อมูลสุขภาพของ{pat.ownerName}
                    </span>
                  </div>

                  <span
                    className={`text-[12px] font-semibold px-3 py-0.5 rounded-full text-white ${
                      pat.checked ? "bg-[#00A877]" : "bg-[#E50914]"
                    }`}
                  >
                    {pat.checked ? "ตรวจแล้ว" : "ยังไม่ตรวจ"}
                  </span>
                </div>

                {/* Patient Rows */}
                <div className="space-y-2 text-[14px]">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-700 font-normal">วัคซีนรวม (เข็มล่าสุด)</span>
                    <span className="font-semibold text-slate-900">{pat.lastVaccine}</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-slate-700 font-normal">น้ำหนักล่าสุด</span>
                    <span className="font-semibold text-slate-900">{pat.weight}</span>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(pat)}
                    className="w-full py-2 bg-[#A0A4A8] hover:bg-[#8e9296] active:scale-[0.98] text-white font-medium text-[14px] rounded-full text-center transition-all font-kanit shadow-xs"
                  >
                    แก้ไขข้อมูล
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Nav (3 Tabs for Vet) */}
        <BottomNav role="vet" />

        {/* Edit Patient Modal */}
        {editingPatient && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-kanit">
                  แก้ไขข้อมูลสุขภาพ ({editingPatient.ownerName})
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingPatient(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">วันที่ฉีดวัคซีนล่าสุด</label>
                  <input
                    type="text"
                    value={editVaccine}
                    onChange={(e) => setEditVaccine(e.target.value)}
                    placeholder="เช่น 12 ม.ค. 2026"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">น้ำหนัก (กก.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    placeholder="เช่น 4.5"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={editChecked}
                      onChange={(e) => setEditChecked(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="font-bold text-slate-800">ทำเครื่องหมายว่า "ตรวจแล้ว"</span>
                  </label>
                </div>

                <div className="pt-2 space-y-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00A877] text-white font-medium rounded-full text-xs shadow-md active:scale-95"
                  >
                    บันทึกการเปลี่ยนแปลง
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPatient(null)}
                    className="w-full py-1.5 text-slate-500 text-xs text-center"
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
