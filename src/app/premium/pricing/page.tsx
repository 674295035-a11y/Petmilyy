"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Crown, LogIn, UserPlus, X, CheckCircle2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { usePetContext } from "@/lib/petContext";
import { supabase } from "@/lib/supabaseClient";

export default function PricingPage() {
  const router = useRouter();
  const { currentUser } = usePetContext();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUserStr = localStorage.getItem("petmily_current_user");
        let hasLocalUser = false;
        if (savedUserStr) {
          const parsed = JSON.parse(savedUserStr);
          if (parsed && (parsed.email || parsed.fullName || parsed.id)) {
            hasLocalUser = true;
          }
        }
        if (currentUser?.email || currentUser?.fullName || currentUser?.id || hasLocalUser) {
          setIsClientLoggedIn(true);
          return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          setIsClientLoggedIn(true);
        } else {
          setIsClientLoggedIn(false);
        }
      } catch (e) {
        setIsClientLoggedIn(false);
      }
    };
    checkAuth();
  }, [currentUser]);

  const handleConfirm = () => {
    if (!isClientLoggedIn) {
      setShowAuthModal(true);
      return;
    }
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
              className="w-full py-3.5 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-semibold text-[17px] rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] transition-all font-kanit cursor-pointer"
            >
              ยืนยันการสมัคร
            </button>
          </div>

        </div>

        {/* Modal: กรุณาเข้าสู่ระบบก่อนชำระเงิน */}
        {showAuthModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-5 text-center space-y-4 shadow-2xl border border-purple-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200 relative">
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Crown className="w-9 h-9 fill-white text-white drop-shadow-sm" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-[18px] font-black text-slate-900 dark:text-white font-kanit">
                  กรุณาเข้าสู่ระบบก่อน
                </h3>
                <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  ต้องเข้าสู่ระบบหรือสมัครสมาชิกก่อน เพื่อผูกสิทธิประโยชน์พรีเมียมและเชื่อมต่อกับบัญชีของคุณบน Supabase
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    router.push(`/login?redirect=/payment?plan=${selectedPlan}`);
                  }}
                  className="w-full py-3 bg-[#00A877] hover:bg-[#009166] active:scale-95 text-white font-bold text-[14px] rounded-full shadow-md shadow-emerald-500/25 transition-all font-kanit flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>เข้าสู่ระบบ</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    router.push(`/register/user?redirect=/payment?plan=${selectedPlan}`);
                  }}
                  className="w-full py-2.5 bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 border border-emerald-300 dark:border-slate-600 active:scale-95 text-emerald-700 dark:text-emerald-300 font-bold text-[13px] rounded-full shadow-xs transition-all font-kanit flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>สมัครสมาชิกใหม่</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="w-full py-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 text-[11px]"
                >
                  ไว้ภายหลัง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </MobileFrame>
  );
}
