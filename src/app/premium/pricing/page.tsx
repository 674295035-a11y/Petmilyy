"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function PricingPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");

  const handleConfirm = () => {
    router.push(`/payment?plan=${selectedPlan}`);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
        
        {/* Top Header */}
        <AppHeader
          backHref="/premium"
          showLogo={true}
          showBell={true}
          bellCount={2}
        />

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6 space-y-4 text-center">
          
          {/* Headlines */}
          <div className="space-y-1">
            <div className="text-[20px] font-bold text-[#5DAE2B] font-kanit">
              Transparent Pricing
            </div>
            <h1 className="text-[22px] font-bold text-slate-900 font-kanit tracking-tight leading-snug">
              ไม่มีค่าธรรมเนียมแอบแฝง
              <br />
              ยกเลิกได้ตลอดเวลา
            </h1>
          </div>

          {/* Plan Option 1: Monthly (499 THB /เดือน) */}
          <div
            onClick={() => setSelectedPlan("monthly")}
            className={`bg-white rounded-3xl p-5 border cursor-pointer transition-all text-left relative ${
              selectedPlan === "monthly"
                ? "border-[#5CB8C1] shadow-[0_8px_24px_rgba(92,184,193,0.18)] ring-1 ring-[#5CB8C1]"
                : "border-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.03)] opacity-80 hover:opacity-100"
            }`}
          >
            {/* Top Right Price */}
            <div className="absolute top-5 right-5 text-right">
              <span className="text-[17px] font-bold text-slate-900 font-kanit">
                499
              </span>
              <span className="text-[13px] text-slate-600 font-normal"> THB /เดือน</span>
            </div>

            <div className="flex items-start gap-3.5 pr-28">
              {/* Radio Button */}
              <div className="w-6 h-6 rounded-full border-2 border-[#1E88E5] flex items-center justify-center shrink-0 mt-0.5">
                {selectedPlan === "monthly" && (
                  <div className="w-3 h-3 bg-[#1E88E5] rounded-full" />
                )}
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-slate-900 font-kanit">
                  แผนพรีเมียม
                </h3>
                <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                  ชุดดูแลสุขภาพแบบครบวงจร & ดูแลตลอด 24 ชั่วโมง
                </p>
              </div>
            </div>
          </div>

          {/* Plan Option 2: Yearly (5499 THB /ปี) */}
          <div
            onClick={() => setSelectedPlan("yearly")}
            className={`bg-white rounded-3xl p-5 border cursor-pointer transition-all text-left relative ${
              selectedPlan === "yearly"
                ? "border-[#5CB8C1] shadow-[0_8px_24px_rgba(92,184,193,0.18)] ring-1 ring-[#5CB8C1]"
                : "border-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.03)] opacity-80 hover:opacity-100"
            }`}
          >
            {/* Top Right Price & Badge */}
            <div className="absolute top-5 right-5 text-right">
              <div>
                <span className="text-[17px] font-bold text-slate-900 font-kanit">
                  5499
                </span>
                <span className="text-[13px] text-slate-600 font-normal"> THB /ปี</span>
              </div>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-[#4CAF50] text-white rounded-full text-[11px] font-bold shadow-xs">
                ประหยัด8%
              </span>
            </div>

            <div className="flex items-start gap-3.5 pr-32">
              {/* Radio Button */}
              <div className="w-6 h-6 rounded-full border-2 border-[#1E88E5] flex items-center justify-center shrink-0 mt-0.5">
                {selectedPlan === "yearly" && (
                  <div className="w-3 h-3 bg-[#1E88E5] rounded-full" />
                )}
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-slate-900 font-kanit">
                  แผนพรีเมียม
                </h3>
                <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                  ชุดดูแลสุขภาพแบบครบวงจร & ดูแลตลอด 24 ชั่วโมง
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-300 my-4" />

          {/* Security Notice */}
          <div className="flex items-center gap-2.5 text-slate-800 text-left px-2">
            <ShieldCheck className="w-6 h-6 text-slate-900 stroke-[2] shrink-0" />
            <span className="text-[14px] font-medium text-slate-800 font-kanit">
              ชำระเงินอย่างปลอดภัยโดยธนาคาร
            </span>
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-3.5 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-semibold text-[17px] rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] transition-all font-kanit"
            >
              ยืนยันการสมัคร
            </button>
          </div>

        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </MobileFrame>
  );
}
