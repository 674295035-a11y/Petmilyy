"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Heart, X, CheckCircle2, Calendar, FileText, User } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

interface HistoryItem {
  id: string;
  type: "booking" | "treatment";
  date: string;
  time: string;
  title: string;
  doctor: string;
  status: string;
  hospital: string;
  notes?: string;
  fee?: string;
}

const historyData: HistoryItem[] = [
  {
    id: "h1",
    type: "booking",
    date: "15 ก.ค. 2568",
    time: "15:30 น.",
    title: "จองคิวที่โรงพยาบาลสงขลา",
    doctor: "แพทย์หญิงด้า",
    status: "สำเร็จ",
    hospital: "โรงพยาบาลสัตว์สงขลา",
    notes: "ตรวจสุขภาพประจำปีและฉีดวัคซีนรวม",
    fee: "฿850.00",
  },
  {
    id: "h2",
    type: "booking",
    date: "25 ม.ค. 2568",
    time: "10:30 น.",
    title: "จองคิวที่โรงพยาบาลสตูล",
    doctor: "แพทย์หญิงโดนัท",
    status: "สำเร็จ",
    hospital: "โรงพยาบาลสัตว์สตูล",
    notes: "ขูดหินปูนและตรวจสุขภาพฟัน",
    fee: "฿1,200.00",
  },
  {
    id: "h3",
    type: "treatment",
    date: "25 ม.ค. 2568",
    time: "09:00 น.",
    title: "ฉีดวัคซีนป้องกันโรคพิษสุนัขบ้า",
    doctor: "นายแพทย์วีพล ภูมิ",
    status: "สำเร็จ",
    hospital: "โรงพยาบาลสัตว์ท่าสะอ้าน",
    notes: "ฉีดวัคซีนป้องกันพิษสุนัขบ้าและถ่ายพยาธิ สุขภาพแข็งแรงดี",
    fee: "฿450.00",
  },
  {
    id: "h4",
    type: "treatment",
    date: "25 ม.ค. 2568",
    time: "13:30 น.",
    title: "ตรวจรักษาอาการทั่วไป",
    doctor: "นายแพทย์สมชาย ลำดวน",
    status: "สำเร็จ",
    hospital: "นีเน่แคร์เซ็นเตอร์",
    notes: "ตรวจรักษาแผลที่อุ้งเท้า ให้ยาปฏิชีวนะและยาลดอักเสบ",
    fee: "฿650.00",
  },
];

export default function HistoryPage() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const bookings = historyData.filter((item) => item.type === "booking");
  const treatments = historyData.filter((item) => item.type === "treatment");

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
        
        {/* Top Header */}
        <AppHeader
          backHref="/profile"
          showLogo={true}
          showBell={true}
          bellCount={2}
        />

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-4">
          
          {/* Top Pill Banner: ประวัติการจองคิว/การรักษา */}
          <div className="flex justify-center">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-6 py-1.5 rounded-full text-[14px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] font-kanit">
              ประวัติการจองคิว/การรักษา
            </div>
          </div>

          {/* Section 1: การจองคิว */}
          <div className="space-y-2.5 text-left">
            <div className="flex items-center gap-1.5 text-slate-800">
              <Clock className="w-5 h-5 text-slate-900 stroke-[2.2]" />
              <h2 className="text-[16px] font-bold text-slate-900 font-kanit">
                การจองคิว
              </h2>
            </div>

            <div className="space-y-3">
              {bookings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-bold text-slate-900 font-kanit">
                      {item.date}
                    </span>
                    <span className="text-[13px] font-semibold text-[#539E18]">
                      {item.status}
                    </span>
                  </div>

                  <div className="text-[13px] text-slate-700">
                    {item.time} | {item.title}
                  </div>
                  <div className="text-[13px] text-slate-600 font-medium">
                    {item.doctor}
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="w-full py-2 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[14px] rounded-full shadow-[0_4px_12px_rgba(0,168,119,0.3)] transition-all font-kanit text-center"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: การรักษา */}
          <div className="space-y-2.5 text-left pt-1">
            <div className="flex items-center gap-1.5 text-slate-800">
              <Heart className="w-5 h-5 text-slate-900 stroke-[2.2]" />
              <h2 className="text-[16px] font-bold text-slate-900 font-kanit">
                การรักษา
              </h2>
            </div>

            <div className="space-y-3">
              {treatments.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-bold text-slate-900 font-kanit">
                      {item.date}
                    </span>
                    <span className="text-[13px] font-semibold text-[#539E18]">
                      {item.status}
                    </span>
                  </div>

                  <div className="text-[13px] text-slate-700">
                    {item.time} | {item.title}
                  </div>
                  <div className="text-[13px] text-slate-600 font-medium">
                    {item.doctor}
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="w-full py-2 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[14px] rounded-full shadow-[0_4px_12px_rgba(0,168,119,0.3)] transition-all font-kanit text-center"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Nav */}
        <BottomNav />

        {/* Detail Modal */}
        {selectedItem && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900 font-kanit">
                    รายละเอียดเวชระเบียน
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="bg-teal-50/60 p-3 rounded-2xl space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{selectedItem.title}</div>
                  <div className="text-slate-600">สถานพยาบาล: {selectedItem.hospital}</div>
                  <div className="text-slate-600">แพทย์ผู้ตรวจ: {selectedItem.doctor}</div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">วันและเวลา</span>
                    <span className="font-medium text-slate-800">{selectedItem.date} {selectedItem.time}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">สถานะ</span>
                    <span className="font-bold text-emerald-600">{selectedItem.status}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">ค่าบริการ/ค่ายา</span>
                    <span className="font-bold text-slate-900">{selectedItem.fee}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-500 block mb-0.5">บันทึกการรักษา:</span>
                    <p className="bg-slate-50 p-2 rounded-xl text-slate-700 leading-relaxed">
                      {selectedItem.notes}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-full py-2 bg-[#00A877] text-white font-medium rounded-full text-xs shadow-md"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
