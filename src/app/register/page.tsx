"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, User, Stethoscope, ChevronRight } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import PetmilyLogo from "@/components/PetmilyLogo";

function RegisterChoice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    if (role === "vet") {
      router.replace("/register/vet");
    } else if (role === "user") {
      router.replace("/register/user");
    }
  }, [role, router]);

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between px-6 pt-3 pb-8 bg-white min-h-full">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between py-2">
          <Link
            href="/login"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="ย้อนกลับ"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm font-semibold text-slate-800">สมัครสมาชิก</span>
          <div className="w-10" />
        </div>

        {/* Logo */}
        <div className="w-full flex flex-col items-center justify-center my-4 text-center">
          <Link href="/" className="transform hover:scale-105 transition-all duration-300 mb-3">
            <PetmilyLogo size={160} />
          </Link>
          <h1 className="text-xl font-bold text-slate-800">
            เลือกประเภทบัญชีผู้ใช้
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            กรุณาเลือกประเภทการสมัครที่ตรงกับบทบาทของคุณ
          </p>
        </div>

        {/* Role Choice Cards */}
        <div className="w-full max-w-sm mx-auto space-y-4 my-auto">
          {/* Pet Owner Card */}
          <Link
            href="/register/user"
            className="group flex items-center justify-between p-4 bg-white border-2 border-slate-100 hover:border-teal-400 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(92,184,193,0.18)] transition-all duration-200"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-[16px] font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                  ผู้ใช้งานทั่วไป
                </div>
                <div className="text-[12px] text-slate-500">
                  สำหรับเจ้าของสัตว์เลี้ยง
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Veterinarian Card */}
          <Link
            href="/register/vet"
            className="group flex items-center justify-between p-4 bg-white border-2 border-slate-100 hover:border-teal-400 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(92,184,193,0.18)] transition-all duration-200"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-[16px] font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  สัตวแพทย์
                </div>
                <div className="text-[12px] text-slate-500">
                  สำหรับคุณหมอและสถานพยาบาล
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Footer Login Link */}
        <div className="text-center pt-6">
          <span className="text-[14px] text-slate-600">มีบัญชีผู้ใช้อยู่แล้ว? </span>
          <Link
            href="/login"
            className="text-[14px] text-slate-900 font-semibold hover:text-teal-600 underline"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">กำลังโหลด...</div>}>
      <RegisterChoice />
    </Suspense>
  );
}
