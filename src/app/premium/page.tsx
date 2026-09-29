"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Star, Sparkles, Crown, LogIn, UserPlus, X, CheckCircle2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { usePetContext } from "@/lib/petContext";
import { supabase } from "@/lib/supabaseClient";

export default function PremiumPromoPage() {
  const router = useRouter();
  const { currentUser } = usePetContext();
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

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isClientLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    router.push("/premium/pricing");
  };

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
            <button
              type="button"
              onClick={handleCtaClick}
              className="block w-full py-3.5 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-semibold text-[17px] rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] transition-all font-kanit cursor-pointer"
            >
              สมัครสมาชิกเลย
            </button>

            <button
              type="button"
              onClick={handleCtaClick}
              className="block w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.98] text-slate-800 font-semibold text-[15px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all font-kanit cursor-pointer"
            >
              เปรียบเทียบแผน
            </button>
          </div>

        </div>

        {/* Modal: กรุณาเข้าสู่ระบบก่อนสมัครพรีเมียม */}
        {showAuthModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-5 text-center space-y-4 shadow-2xl border border-teal-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200 relative">
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
                  ต้องเข้าสู่ระบบหรือสมัครสมาชิกก่อน ถึงจะสามารถสมัคร <span className="font-bold text-teal-700 dark:text-teal-300">PetCare Premium</span> เพื่อเชื่อมต่อและบันทึกสิทธิ์ลงในบัญชีของคุณบน Supabase
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowAuthModal(false);
                    router.push("/login?redirect=/premium/pricing");
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
                    router.push("/register/user?redirect=/premium/pricing");
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
