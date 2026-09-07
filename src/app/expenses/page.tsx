"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowLeft,
  Plus,
  Trash2,
  X,
  Sparkles,
  Receipt,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { usePetContext, ExpenseItem } from "@/lib/petContext";

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const categoryConfig: Record<
  "อุปกรณ์" | "การแพทย์" | "อาหาร" | "อื่นๆ",
  {
    label: string;
    emoji: string;
    bgCard: string;
    bgIcon: string;
    textTitle: string;
    textPrice: string;
    barColor: string;
    chartColor: string;
  }
> = {
  อุปกรณ์: {
    label: "ค่าอุปกรณ์",
    emoji: "🧶",
    bgCard: "bg-[#FFEAA7]/70 border-amber-200/60",
    bgIcon: "bg-amber-200/80",
    textTitle: "text-amber-900",
    textPrice: "text-amber-800",
    barColor: "bg-[#E5A700]",
    chartColor: "#FBC02D",
  },
  การแพทย์: {
    label: "ค่าการแพทย์",
    emoji: "🩺",
    bgCard: "bg-[#FF7675]/60 border-red-200/60",
    bgIcon: "bg-rose-200/80",
    textTitle: "text-rose-950",
    textPrice: "text-rose-900",
    barColor: "bg-[#D63031]",
    chartColor: "#E53935",
  },
  อื่นๆ: {
    label: "ค่าอื่นๆ",
    emoji: "🌿",
    bgCard: "bg-[#55EFC4]/50 border-teal-200/60",
    bgIcon: "bg-emerald-200/80",
    textTitle: "text-emerald-950",
    textPrice: "text-emerald-900",
    barColor: "bg-[#00B894]",
    chartColor: "#43A047",
  },
  อาหาร: {
    label: "ค่าอาหาร",
    emoji: "🥫",
    bgCard: "bg-[#81ECEC]/60 border-cyan-200/60",
    bgIcon: "bg-cyan-200/80",
    textTitle: "text-cyan-950",
    textPrice: "text-cyan-900",
    barColor: "bg-[#0984E3]",
    chartColor: "#4DD0E1",
  },
};

export default function ExpensesPage() {
  const { expenses, addExpense, deleteExpense, notifications } = usePetContext();
  
  // Real current month in Thai
  const currentRealMonth = thaiMonths[new Date().getMonth()];
  const [selectedMonth, setSelectedMonth] = useState(currentRealMonth);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New expense form states
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<"อุปกรณ์" | "การแพทย์" | "อาหาร" | "อื่นๆ">("อาหาร");
  const [date, setDate] = useState("วันนี้");

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  // Filter expenses by selected month or show all logged for this month
  const monthlyExpenses = expenses.filter((e) => !e.date.includes(" ") || e.date.includes(selectedMonth) || e.date === "วันนี้" || e.date === "เมื่อวาน" || true);

  // Calculate totals dynamically from expenses
  const totalExpense = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const budget = 15000;
  const percentUsed = budget > 0 ? Math.min(100, Math.round((totalExpense / budget) * 100)) : 0;

  const equipmentTotal = expenses
    .filter((e) => e.category === "อุปกรณ์")
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const medicalTotal = expenses
    .filter((e) => e.category === "การแพทย์")
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const otherTotal = expenses
    .filter((e) => e.category === "อื่นๆ")
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const foodTotal = expenses
    .filter((e) => e.category === "อาหาร")
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  // Calculate chart proportions (Circumference = 2 * PI * 14 = 87.96 ≈ 88)
  const circumference = 88;
  const medicalStroke = totalExpense > 0 ? (medicalTotal / totalExpense) * circumference : 0;
  const equipmentStroke = totalExpense > 0 ? (equipmentTotal / totalExpense) * circumference : 0;
  const foodStroke = totalExpense > 0 ? (foodTotal / totalExpense) * circumference : 0;
  const otherStroke = totalExpense > 0 ? (otherTotal / totalExpense) * circumference : 0;

  const offset1 = 0;
  const offset2 = -medicalStroke;
  const offset3 = -(medicalStroke + equipmentStroke);
  const offset4 = -(medicalStroke + equipmentStroke + foodStroke);

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    addExpense({
      title: title.trim(),
      amount: numAmount,
      category,
      date: date.trim() || `วันนี้ (${selectedMonth})`,
    });

    setShowAddModal(false);
    setTitle("");
    setAmount("");
    setToastMessage(`บันทึกค่าใช้จ่าย "${title.trim()}" ฿${numAmount.toLocaleString()} สำเร็จแล้ว ✨`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
        
        {/* Top Header */}
        <AppHeader
          backHref="/profile"
          showLogo={true}
          showBell={true}
          bellCount={unreadNotifs}
        />

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-3.5 text-left">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          {/* Top Pill Banner: ค่าใช้จ่ายในเดือนนี้ */}
          <div className="flex items-center justify-between">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-6 py-1.5 rounded-full text-[14px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] font-kanit mx-auto">
              ค่าใช้จ่ายในเดือนนี้
            </div>
          </div>

          {/* Add Expense Quick Action Button */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="w-full py-2.5 bg-white border border-teal-300 hover:bg-teal-50/50 active:scale-[0.99] rounded-2xl text-xs font-bold text-teal-700 flex items-center justify-center gap-1.5 shadow-xs transition-all font-kanit"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ บันทึกค่าใช้จ่ายใหม่</span>
          </button>

          {/* 1. Summary Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[14px] font-bold text-slate-900 font-kanit">
                  ยอดรวมค่าใช้จ่าย
                </div>
                <div className="text-[20px] font-bold text-slate-900 font-kanit mt-0.5">
                  ฿{totalExpense.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {/* Month Selector Dropdown Button */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowMonthModal(true)}
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-xl border border-teal-200 transition-colors"
                >
                  <span>{selectedMonth}</span>
                  <ChevronDown className="w-4 h-4 text-teal-600" />
                </button>
                <div className="text-[11px] text-slate-500 mt-1">
                  เปรียบเทียบเดือนที่แล้ว
                </div>
                <div className="text-[14px] font-bold text-[#4CAF50]">
                  {totalExpense > 0 ? "-5%" : "0%"}
                </div>
              </div>
            </div>

            {/* Budget Progress Bar */}
            <div className="pt-1 space-y-1">
              <div className="text-[12px] text-slate-700 font-medium">
                ใช้ไปแล้ว {percentUsed}% จากงบ {budget.toLocaleString()}
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#52B72A] rounded-full transition-all duration-500"
                  style={{ width: `${percentUsed}%` }}
                />
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
                  
                  {totalExpense > 0 ? (
                    <>
                      {/* Segment 1: Medical (Red) */}
                      {medicalStroke > 0 && (
                        <circle
                          cx="18" cy="18" r="14" fill="none" stroke="#E53935" strokeWidth="6"
                          strokeDasharray={`${medicalStroke} ${circumference}`} strokeDashoffset={offset1}
                        />
                      )}
                      {/* Segment 2: Equipment (Yellow) */}
                      {equipmentStroke > 0 && (
                        <circle
                          cx="18" cy="18" r="14" fill="none" stroke="#FBC02D" strokeWidth="6"
                          strokeDasharray={`${equipmentStroke} ${circumference}`} strokeDashoffset={offset2}
                        />
                      )}
                      {/* Segment 3: Food (Cyan) */}
                      {foodStroke > 0 && (
                        <circle
                          cx="18" cy="18" r="14" fill="none" stroke="#4DD0E1" strokeWidth="6"
                          strokeDasharray={`${foodStroke} ${circumference}`} strokeDashoffset={offset3}
                        />
                      )}
                      {/* Segment 4: Other (Green) */}
                      {otherStroke > 0 && (
                        <circle
                          cx="18" cy="18" r="14" fill="none" stroke="#43A047" strokeWidth="6"
                          strokeDasharray={`${otherStroke} ${circumference}`} strokeDashoffset={offset4}
                        />
                      )}
                    </>
                  ) : (
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                  )}
                </svg>
              </div>
            </div>

            {/* Right: Daily Bars & Legend */}
            <div>
              <h3 className="text-[13px] font-bold text-slate-800 mb-1.5 font-kanit">
                หมวดหมู่การใช้จ่าย
              </h3>
              
              {/* Mini Bar Chart */}
              <div className="flex items-end gap-1.5 h-10 mb-2 pt-1 border-b border-slate-100 pb-1">
                <div
                  className="w-4 bg-[#FBC02D] rounded-t-sm transition-all"
                  style={{ height: totalExpense > 0 ? `${Math.max(4, (equipmentTotal / totalExpense) * 36)}px` : "4px" }}
                />
                <div
                  className="w-4 bg-[#E53935] rounded-t-sm transition-all"
                  style={{ height: totalExpense > 0 ? `${Math.max(4, (medicalTotal / totalExpense) * 36)}px` : "4px" }}
                />
                <div
                  className="w-4 bg-[#43A047] rounded-t-sm transition-all"
                  style={{ height: totalExpense > 0 ? `${Math.max(4, (otherTotal / totalExpense) * 36)}px` : "4px" }}
                />
                <div
                  className="w-4 bg-[#4DD0E1] rounded-t-sm transition-all"
                  style={{ height: totalExpense > 0 ? `${Math.max(4, (foodTotal / totalExpense) * 36)}px` : "4px" }}
                />
              </div>

              {/* Legend List */}
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FBC02D] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าอุปกรณ์</span>
                  <span className="font-bold text-slate-900 ml-auto">฿{equipmentTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#E53935] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าการแพทย์</span>
                  <span className="font-bold text-slate-900 ml-auto">฿{medicalTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#43A047] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าอื่นๆ</span>
                  <span className="font-bold text-slate-900 ml-auto">฿{otherTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#4DD0E1] rounded-xs shrink-0" />
                  <span className="text-slate-600">ค่าอาหาร</span>
                  <span className="font-bold text-slate-900 ml-auto">฿{foodTotal.toLocaleString()}</span>
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
              <div className={`${categoryConfig["อุปกรณ์"].bgCard} rounded-2xl p-2.5 flex flex-col justify-between h-28 border shadow-xs`}>
                <div className={`w-7 h-7 rounded-full ${categoryConfig["อุปกรณ์"].bgIcon} flex items-center justify-center mx-auto text-xs`}>
                  {categoryConfig["อุปกรณ์"].emoji}
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${categoryConfig["อุปกรณ์"].textTitle}`}>ค่าอุปกรณ์</div>
                  <div className={`text-[10px] font-bold ${categoryConfig["อุปกรณ์"].textPrice}`}>฿{equipmentTotal.toLocaleString()}</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${categoryConfig["อุปกรณ์"].barColor} rounded-full transition-all`}
                    style={{ width: totalExpense > 0 ? `${(equipmentTotal / totalExpense) * 100}%` : "0%" }}
                  />
                </div>
              </div>

              {/* Card 2: Medical */}
              <div className={`${categoryConfig["การแพทย์"].bgCard} rounded-2xl p-2.5 flex flex-col justify-between h-28 border shadow-xs`}>
                <div className={`w-7 h-7 rounded-full ${categoryConfig["การแพทย์"].bgIcon} flex items-center justify-center mx-auto text-xs`}>
                  {categoryConfig["การแพทย์"].emoji}
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${categoryConfig["การแพทย์"].textTitle}`}>ค่าการแพทย์</div>
                  <div className={`text-[10px] font-bold ${categoryConfig["การแพทย์"].textPrice}`}>฿{medicalTotal.toLocaleString()}</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${categoryConfig["การแพทย์"].barColor} rounded-full transition-all`}
                    style={{ width: totalExpense > 0 ? `${(medicalTotal / totalExpense) * 100}%` : "0%" }}
                  />
                </div>
              </div>

              {/* Card 3: Other */}
              <div className={`${categoryConfig["อื่นๆ"].bgCard} rounded-2xl p-2.5 flex flex-col justify-between h-28 border shadow-xs`}>
                <div className={`w-7 h-7 rounded-full ${categoryConfig["อื่นๆ"].bgIcon} flex items-center justify-center mx-auto text-xs`}>
                  {categoryConfig["อื่นๆ"].emoji}
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${categoryConfig["อื่นๆ"].textTitle}`}>ค่าอื่นๆ</div>
                  <div className={`text-[10px] font-bold ${categoryConfig["อื่นๆ"].textPrice}`}>฿{otherTotal.toLocaleString()}</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${categoryConfig["อื่นๆ"].barColor} rounded-full transition-all`}
                    style={{ width: totalExpense > 0 ? `${(otherTotal / totalExpense) * 100}%` : "0%" }}
                  />
                </div>
              </div>

              {/* Card 4: Food */}
              <div className={`${categoryConfig["อาหาร"].bgCard} rounded-2xl p-2.5 flex flex-col justify-between h-28 border shadow-xs`}>
                <div className={`w-7 h-7 rounded-full ${categoryConfig["อาหาร"].bgIcon} flex items-center justify-center mx-auto text-xs`}>
                  {categoryConfig["อาหาร"].emoji}
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${categoryConfig["อาหาร"].textTitle}`}>ค่าอาหาร</div>
                  <div className={`text-[10px] font-bold ${categoryConfig["อาหาร"].textPrice}`}>฿{foodTotal.toLocaleString()}</div>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${categoryConfig["อาหาร"].barColor} rounded-full transition-all`}
                    style={{ width: totalExpense > 0 ? `${(foodTotal / totalExpense) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Recent Transactions List (รายการล่าสุด) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-900 font-kanit">
                รายการล่าสุด ({expenses.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                บันทึกเพิ่ม
              </button>
            </div>

            {expenses.length === 0 ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Receipt className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  ยังไม่มีรายการค่าใช้จ่ายในเดือน{selectedMonth}
                </div>
                <p className="text-[11px] text-slate-400">
                  แตะปุ่ม &ldquo;+ บันทึกค่าใช้จ่ายใหม่&rdquo; เพื่อเริ่มต้นจดบันทึก
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {expenses.map((item) => {
                  const cat = categoryConfig[item.category] || categoryConfig["อื่นๆ"];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-[13px] py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-xl px-2 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span
                          className="w-3 h-3 rounded-xs shrink-0"
                          style={{ backgroundColor: cat.chartColor }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-slate-800 font-medium truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.category} • {item.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="font-bold text-slate-900">
                          -฿{Number(item.amount).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteExpense(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors"
                          title="ลบรายการ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Nav */}
        <BottomNav />

        {/* Month Selector Modal */}
        {showMonthModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900 font-kanit">
                    เลือกดูตามเดือน
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMonthModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 max-h-60 overflow-y-auto pr-1">
                {thaiMonths.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(m);
                      setShowMonthModal(false);
                      setToastMessage(`แสดงข้อมูลค่าใช้จ่ายเดือน ${m}`);
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      selectedMonth === m
                        ? "bg-[#00A877] text-white border-[#00A877] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedMonth(currentRealMonth);
                  setShowMonthModal(false);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full text-xs"
              >
                กลับไปเดือนปัจจุบัน ({currentRealMonth})
              </button>
            </div>
          </div>
        )}

        {/* Add Expense Modal */}
        {showAddModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900 font-kanit">
                    บันทึกค่าใช้จ่าย
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveExpense} className="space-y-3 text-xs">
                {/* Title */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    ชื่อรายการค่าใช้จ่าย
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="เช่น อาหารเม็ดแมว, ฉีดวัคซีน"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    จำนวนเงิน (บาท)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="เช่น 950"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    หมวดหมู่
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["อาหาร", "การแพทย์", "อุปกรณ์", "อื่นๆ"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`p-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all ${
                          category === cat
                            ? "bg-teal-50 border-teal-500 text-teal-800 font-bold ring-1 ring-teal-500"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span>{categoryConfig[cat].emoji}</span>
                        <span>{categoryConfig[cat].label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    วันที่ / เดือน
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder={`เช่น วันนี้, 08 ${selectedMonth}`}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00A877] hover:bg-[#009166] text-white font-medium rounded-full text-xs shadow-md active:scale-95 transition-transform"
                  >
                    บันทึกข้อมูล
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
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
