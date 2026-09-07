"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Star, Sparkles } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export default function PremiumPromoPage() {
  const benefits = [
    {
      id: 1,
      title: "ปรึกษาแพทย์ส่วนตัว 24 ชั่วโมง",
      subtitle: "แชทกับสัตวแพทย์ผู้เชี่ยวชาญได้ตลอดเวลา",
    },
    {
      id: 2,
      title: "ส่วนลดค่ารักษา&ยาพิเศษ 20%",
      subtitle: "สั่งยาผ่านแอปในราคาที่ถูกกว่า เฉพาะสมาชิกเท่านั้น",
    },
    {
      id: 3,
      title: "ตรวจสุขภาพ/ฉีดวัคซีนประจำปี",
      subtitle: "ได้รับคูปองฉีดวัคซีนฟรีที่คลินิกในเครือข่าย",
    },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
        
        {/* Top Header */}
        <AppHeader
          backHref="/home"
          showLogo={true}
          showBell={true}
          bellCount={2}
        />

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6 space-y-4 text-center">
          
          {/* Top Pill: ขอแนะนำ PETMILY GOLD */}
          <div className="flex justify-center">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-6 py-1.5 rounded-full text-[14px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] flex items-center gap-1.5 font-kanit">
              <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>ขอแนะนำ PETMILY GOLD</span>
            </div>
          </div>

          {/* Large Headline */}
          <div className="space-y-0.5 pt-1">
            <h1 className="text-[24px] font-bold text-slate-900 font-kanit tracking-tight">
              อัปเกรด พรีเมียม
            </h1>
            <h2 className="text-[24px] font-bold text-slate-900 font-kanit tracking-tight">
              เพียง 499 บาท/เดือน
            </h2>
          </div>

          {/* Benefits White Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_6px_24px_rgba(0,0,0,0.04)] space-y-4 text-left">
            {benefits.map((b) => (
              <div key={b.id} className="flex items-start gap-3.5">
                {/* Shield Check Badge Icon */}
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-slate-900 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 font-kanit leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-[12px] text-slate-600 leading-tight mt-0.5">
                    {b.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              href="/premium/pricing"
              className="block w-full py-3.5 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-semibold text-[17px] rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] transition-all font-kanit"
            >
              สมัครสมาชิกเลย
            </Link>

            <Link
              href="/premium/pricing"
              className="block w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.98] text-slate-800 font-semibold text-[15px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all font-kanit"
            >
              เปรียบเทียบแผน
            </Link>
          </div>

        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </MobileFrame>
  );
}
