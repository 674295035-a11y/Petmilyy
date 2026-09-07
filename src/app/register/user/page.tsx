"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, CheckCircle2, User } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import PetmilyLogo from "@/components/PetmilyLogo";
import { supabase } from "@/lib/supabaseClient";
import { usePetContext } from "@/lib/petContext";

export default function UserRegisterPage() {
  const router = useRouter();
  const { resetForNewUser } = usePetContext();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setIsLoading(true);

    try {
      // Check if Supabase URL is placeholder
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.warn("NEXT_PUBLIC_SUPABASE_URL is missing in environment variables.");
      }

      // 1. Try Supabase Auth Sign Up
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullname,
            phone: formData.phone,
            role: "user",
          },
        },
      });

      if (error) {
        setErrorMessage(`Supabase Auth Error: ${error.message}`);
        setIsLoading(false);
        return;
      }

      // 2. Insert into profiles table
      const userId = data?.user?.id;
      if (userId) {
        const { error: profileErr } = await supabase.from("profiles").upsert({
          id: userId,
          email: formData.email,
          full_name: formData.fullname,
          role: "user",
        });

        if (profileErr) {
          console.warn("Profile save error:", profileErr.message);
        }
      }

      // 3. Reset data state for new user
      resetForNewUser({
        fullName: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        role: "user",
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login?role=user&registered=true");
      }, 1000);
    } catch (err: any) {
      console.error("Supabase Save Error:", err);
      setErrorMessage(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ Supabase");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between px-6 pt-3 pb-8 bg-white min-h-full">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between py-2">
          <Link
            href="/login?role=user"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="ย้อนกลับ"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            ผู้ใช้งานทั่วไป
          </span>
        </div>

        {/* Logo & Header Title */}
        <div className="w-full flex flex-col items-center justify-center my-2 text-center">
          <Link href="/" className="transform hover:scale-105 transition-all duration-300 mb-2">
            <PetmilyLogo size={140} />
          </Link>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
            สมัครสมาชิกผู้ใช้งานทั่วไป
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ร่วมเป็นครอบครัว PETMILY เพื่อดูแลเพื่อนซี้สี่ขาของคุณ
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-3.5 mt-2 text-left">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-slate-800">
              ชื่อ - นามสกุล
            </label>
            <input
              type="text"
              required
              placeholder="กรอกชื่อและนามสกุล"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-slate-800">
              อีเมล
            </label>
            <input
              type="email"
              required
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-slate-800">
              เบอร์โทรศัพท์
            </label>
            <input
              type="tel"
              required
              placeholder="08X-XXX-XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-slate-800">
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="อย่างน้อย 6 ตัวอักษร"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-600 hover:text-slate-900"
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-slate-800">
              ยืนยันรหัสผ่าน
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-600 hover:text-slate-900"
                aria-label={showConfirmPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>สมัครสมาชิกสำเร็จ! ไปที่หน้าเข้าสู่ระบบ</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[16px] py-3.5 px-6 rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "สมัครสมาชิก"
              )}
            </button>
          </div>

          {/* Switch to Vet Register / Back to Login */}
          <div className="text-center pt-2 space-y-1.5">
            <div>
              <span className="text-[13px] text-slate-600">มีบัญชีผู้ใช้อยู่แล้ว? </span>
              <Link
                href="/login?role=user"
                className="text-[13px] text-slate-900 font-semibold hover:text-teal-600 underline"
              >
                เข้าสู่ระบบ
              </Link>
            </div>
            <div>
              <Link
                href="/register/vet"
                className="text-[12px] text-teal-700 hover:text-teal-800 font-medium underline"
              >
                ต้องการสมัครสำหรับสัตวแพทย์? คลิกที่นี่
              </Link>
            </div>
          </div>
        </form>
      </div>
    </MobileFrame>
  );
}
