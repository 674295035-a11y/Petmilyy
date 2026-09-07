"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowLeft, Plus, CheckCircle2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function ExpensesPage() {
  const [selectedMonth, setSelectedMonth] = useState("กรกฎาคม");

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

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-3.5 text-left">
          
          {/* Top Pill Banner: ค่าใช้จ่ายในเดือนนี้ */}
          <div className="flex justify-center">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-8 py-1.5 rounded-full text-[15px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] font-kanit">
              ค่าใช้จ่ายในเดือนนี้
            </div>
          </div>

          {/* 1. Summary Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[14px] font-bold text-slate-900 font-kanit">
                  ยอดรวมค่าใช้จ่าย
                </div>
                <div className="text-[20px] font-bold text-slate-900 font-kanit mt-0.5">
                  ฿12,500.00
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-800 cursor-pointer">
                  <span>{selectedMonth}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  เปรียบเทียบเดือนที่แล้ว
                </div>
                <div className="text-[14px] font-bold text-[#4CAF50]">
                  -5%
                </div>
              </div>
            </div>

            {/* Budget Progress Bar */}
            <div className="pt-1 space-y-1">
              <div className="text-[12px] text-slate-700 font-medium">
                ใช้ไปแล้ว 75% จากงบ 15,000
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#52B72A] rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </div>

          {/* 2. Charts Card (Donut & Daily Bar breakdown) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] grid grid-cols-2 gap-3 items-center">
            {/* Left: Donut Chart */}
            <div className="flex flex-col items-center">
              <h3 className="text-[13px] font-bold text-slate-800 mb-2 font-kanit">
                สัดส่วนค่าใช้จ่าย
              </h3>
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  {/* Background Circle */}
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F1F2F6" strokeWidth="6" />
                  {/* Segment 1: Medical (Red 40%) */}
                  <circle
                    cx="18" cy="18" r="14" fill="none" stroke="#E53935" strokeWidth="6"
                    strokeDasharray="35.2 88" strokeDashoffset="0"
                  />
                  {/* Segment 2: Equipment (Yellow 24%) */}
                  <circle
                    cx="18" cy="18" r="14" fill="none" stroke="#FBC02D" strokeWidth="6"
                    strokeDasharray="21.1 88" strokeDashoffset="-35.2"
                  />
                  {/* Segment 3: Food (Cyan 20%) */}
                  <circle
                    cx="18" cy="18" r="14" fill="none" stroke="#4DD0E1" strokeWidth="6"
                    strokeDasharray="17.6 88" strokeDashoffset="-56.3"
                  />
                  {/* Segment 4: Other (Green 16%) */}
                  <circle
                    cx="18" cy="18" r="14" fill="none" stroke="#43A047" strokeWidth="6"
                    strokeDasharray="14.1 88" strokeDashoffset="-73.9"
                  />
                </svg>
              </div>
            </div>

            {/* Right: Daily Bars & Legend */}
            <div>
              <h3 className="text-[13px] font-bold text-slate-800 mb-1.5 font-kanit">
                ยอดใช้จ่ายรายวัน
              </h3>
              
              {/* Mini Bar Chart */}
              <div className="flex items-end gap-1.5 h-10 mb-2 pt-1 border-b border-slate-100 pb-1">
                <div className="w-4 h-6 bg-[#FBC02D] rounded-t-sm" />
                <div className="w-4 h-9 bg-[#E53935] rounded-t-sm" />
                <div className="w-4 h-4 bg-[#43A047] rounded-t-sm" />
                <div className="w-4 h-5 bg-[#4DD0E1] rounded-t-sm" />
              </div>

              {/* Legend List */}
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FBC02D] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าอุปกรณ์</span>
                  <span className="font-bold text-slate-900 ml-auto">฿3,000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#E53935] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าการแพทย์</span>
                  <span className="font-bold text-slate-900 ml-auto">฿5,000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#43A047] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าอื่นๆ</span>
                  <span className="font-bold text-slate-900 ml-auto">฿2,000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#4DD0E1] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าอาหาร</span>
                  <span className="font-bold text-slate-900 ml-auto">฿2,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Main Categories Grid (หมวดหมู่หลัก) */}
          <div className="space-y-1.5">
            <h3 className="text-[14px] font-bold text-slate-900 font-kanit">
              หมวดหมู่หลัก
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center">
              {/* Card 1: Equipment */}
              <div className="bg-[#FFEAA7]/70 rounded-2xl p-2.5 flex flex-col justify-between h-28 border border-amber-200/60 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-amber-200/80 flex items-center justify-center mx-auto text-xs">
                  🧶
                </div>
                <div>
                  <div className="text-[10px] font-bold text-amber-900">ค่าอุปกรณ์</div>
                  <div className="text-[10px] font-bold text-amber-800">฿3,000</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E5A700] rounded-full w-3/5" />
                </div>
              </div>

              {/* Card 2: Medical */}
              <div className="bg-[#FF7675]/60 rounded-2xl p-2.5 flex flex-col justify-between h-28 border border-red-200/60 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-rose-200/80 flex items-center justify-center mx-auto text-xs">
                  🩺
                </div>
                <div>
                  <div className="text-[10px] font-bold text-rose-950">ค่าการแพทย์</div>
                  <div className="text-[10px] font-bold text-rose-900">฿5,000</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D63031] rounded-full w-4/5" />
                </div>
              </div>

              {/* Card 3: Other */}
              <div className="bg-[#55EFC4]/50 rounded-2xl p-2.5 flex flex-col justify-between h-28 border border-teal-200/60 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-emerald-200/80 flex items-center justify-center mx-auto text-xs">
                  🌿
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-950">ค่าอื่นๆ</div>
                  <div className="text-[10px] font-bold text-emerald-900">฿2,000</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00B894] rounded-full w-1/2" />
                </div>
              </div>

              {/* Card 4: Food */}
              <div className="bg-[#81ECEC]/60 rounded-2xl p-2.5 flex flex-col justify-between h-28 border border-cyan-200/60 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-cyan-200/80 flex items-center justify-center mx-auto text-xs">
                  🥫
                </div>
                <div>
                  <div className="text-[10px] font-bold text-cyan-950">ค่าอาหาร</div>
                  <div className="text-[10px] font-bold text-cyan-900">฿2,500</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0984E3] rounded-full w-3/5" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Recent Transactions List (รายการล่าสุด) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-900 font-kanit">
                รายการล่าสุด
              </h3>
              <button
                type="button"
                className="text-xs text-slate-600 underline font-medium"
              >
                ดูทั้งหมด
              </button>
            </div>

            {/* Today Group */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500">วันนี้</div>
              
              <div className="flex items-center justify-between text-[13px] py-1 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#4DD0E1] rounded-xs shrink-0" />
                  <span className="text-slate-800">อาหารเม็ดแมว (ไซส์ 3kg)</span>
                </div>
                <span className="font-bold text-slate-900">-฿950</span>
              </div>

              <div className="flex items-center justify-between text-[13px] py-1 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#FBC02D] rounded-xs shrink-0" />
                  <span className="text-slate-800">ทรายแมวเต้าหู้ 2 ถุง</span>
                </div>
                <span className="font-bold text-slate-900">-฿350</span>
              </div>
            </div>

            {/* Yesterday Group */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-slate-500">เมื่อวาน</div>
              
              <div className="flex items-center justify-between text-[13px] py-1 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#43A047] rounded-xs shrink-0" />
                  <span className="text-slate-800">อาบน้ำตัดขน</span>
                </div>
                <span className="font-bold text-slate-900">-฿450</span>
              </div>

              <div className="flex items-center justify-between text-[13px] py-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#E53935] rounded-xs shrink-0" />
                  <span className="text-slate-800">ฉีดวัคซีนรวม & พิษสุนัขบ้า</span>
                </div>
                <span className="font-bold text-slate-900">-฿600</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </MobileFrame>
  );
}
