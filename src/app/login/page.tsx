"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import PetmilyLogo from "@/components/PetmilyLogo";

function LoginForm() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";
  const isVet = role === "vet";

  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return;

    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (isVet) {
          router.push("/vet/home");
        } else {
          router.push("/home");
        }
      }, 900);
    }, 800);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between px-6 pt-2 pb-8 bg-white min-h-full">
        {/* Top Navigation Bar */}
        <div className="w-full flex items-center justify-between py-2">
          <Link
            href="/"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="ย้อนกลับ"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
            {isVet ? "โหมดสัตวแพทย์" : "โหมดผู้ใช้งานทั่วไป"}
          </span>
        </div>

        {/* Brand Logo */}
        <div className="w-full flex flex-col items-center justify-center -mt-2 mb-4">
          <Link href="/" className="transform hover:scale-105 transition-all duration-300">
            <PetmilyLogo size={185} />
          </Link>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
          {/* Email / Phone Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="identifier"
              className="block text-[15px] font-medium text-slate-800"
            >
              อีเมล/เบอร์
            </label>
            <div className="relative">
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="กรอกอีเมลหรือเบอร์โทรศัพท์"
                required
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="password"
              className="block text-[15px] font-medium text-slate-800"
            >
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                required
                className="w-full pl-4 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-700 hover:text-slate-900 focus:outline-none transition-colors"
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-slate-700" />
                ) : (
                  <Eye className="w-5 h-5 text-slate-700" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-left pt-0.5">
            <Link
              href="#forgot-password"
              className="text-[14px] text-slate-700 hover:text-teal-600 font-normal transition-colors"
            >
              ลืมรหัสผ่าน
            </Link>
          </div>

          {/* Success Message Simulation */}
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>เข้าสู่ระบบสำเร็จ! กำลังเข้าสู่หน้าแดชบอร์ด...</span>
            </div>
          )}

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[17px] py-3.5 px-6 rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] hover:shadow-[0_10px_25px_rgba(0,168,119,0.45)] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center pt-2">
            <span className="text-[14px] text-slate-700">ยังไม่มีบัญชี? </span>
            <Link
              href={isVet ? "/register/vet" : "/register/user"}
              className="text-[14px] text-slate-900 font-semibold hover:text-teal-600 transition-colors underline-offset-2 hover:underline"
            >
              สมัครสมาชิก
            </Link>
          </div>

          {/* Social Login Options */}
          <div className="pt-4 flex items-center justify-center gap-4">
            {/* Google Login Button */}
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all"
              title="เข้าสู่ระบบด้วย Google"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </button>

            {/* Apple Login Button */}
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-slate-200 hover:bg-slate-300 active:scale-95 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all text-black"
              title="เข้าสู่ระบบด้วย Apple"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.79-11.72-14.24-5.77-9.04-10.22-19.16-13.35-30.34-3.13-11.19-4.7-21.84-4.7-31.97 0-14.53 3.69-26.68 11.07-36.46 7.37-9.78 16.74-14.78 28.1-15.01 4.79 0 10.15 1.25 16.08 3.76 5.93 2.5 9.78 3.82 11.55 3.96 1.48 0 5.48-1.46 12.01-4.38 6.53-2.92 12.44-4.07 17.74-3.45 13.82 1.09 24.63 6.13 32.44 15.12-12.18 7.39-18.17 17.52-17.97 30.4.19 10.23 4.1 18.82 11.72 25.75 7.63 6.94 16.71 10.88 27.24 11.83-2.48 7.5-5.63 15.11-9.46 22.84zM119.22 31.84c0-7.39 2.67-14.45 8.01-21.18 5.34-6.73 11.96-10.66 19.86-11.79.85 7.23-1.63 14.28-7.44 21.16-5.81 6.88-12.62 10.8-20.43 11.81z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </MobileFrame>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">กำลังโหลด...</div>}>
      <LoginForm />
    </Suspense>
  );
}
