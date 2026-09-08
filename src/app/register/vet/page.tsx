"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import { supabase } from "@/lib/supabaseClient";
import { usePetContext } from "@/lib/petContext";

export default function RegisterVetPage() {
  const router = useRouter();
  const { resetForNewUser } = usePetContext();
  const [formData, setFormData] = useState({
    clinicName: "",
    fullName: "",
    email: "",
    education: "",
    specialization: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const emailTrimmed = formData.email.trim();
    const fullNameTrimmed = formData.fullName.trim();
    const clinicNameTrimmed = formData.clinicName.trim();
    const educationTrimmed = formData.education.trim();
    const specializationTrimmed = formData.specialization.trim();

    try {
      // 1. Supabase Auth Sign Up for Vet
      const { data, error } = await supabase.auth.signUp({
        email: emailTrimmed,
        password: formData.password,
        options: {
          data: {
            full_name: fullNameTrimmed,
            clinic_name: clinicNameTrimmed,
            education: educationTrimmed,
            specialization: specializationTrimmed,
            role: "vet",
          },
        },
      });

      // If user is already registered, attempt to sign in and update profile
      if (error) {
        if (
          error.message.toLowerCase().includes("already registered") ||
          error.message.toLowerCase().includes("already exists") ||
          error.message.toLowerCase().includes("user already")
        ) {
          const { data: signInData, error: signInErr } =
            await supabase.auth.signInWithPassword({
              email: emailTrimmed,
              password: formData.password,
            });

          if (!signInErr && signInData?.user) {
            await supabase.from("profiles").upsert({
              id: signInData.user.id,
              email: emailTrimmed,
              full_name: fullNameTrimmed,
              clinic_name: clinicNameTrimmed,
              education: educationTrimmed,
              specialization: specializationTrimmed,
              role: "vet",
              updated_at: new Date().toISOString(),
            });

            resetForNewUser({
              fullName: fullNameTrimmed,
              email: emailTrimmed,
              phone: "",
              role: "vet",
              clinicName: clinicNameTrimmed,
            });

            setIsSuccess(true);
            setTimeout(() => {
              router.push("/vet/home");
            }, 900);
            return;
          } else {
            setErrorMessage("อีเมลนี้ได้รับการลงทะเบียนแล้ว กรุณาเข้าสู่ระบบ");
            setIsLoading(false);
            return;
          }
        }

        setErrorMessage(`เกิดข้อผิดพลาด: ${error.message}`);
        setIsLoading(false);
        return;
      }

      // 2. Insert/Upsert into profiles table
      const userId = data?.user?.id;
      if (userId) {
        const { error: profileErr } = await supabase.from("profiles").upsert({
          id: userId,
          email: emailTrimmed,
          full_name: fullNameTrimmed,
          clinic_name: clinicNameTrimmed,
          education: educationTrimmed,
          specialization: specializationTrimmed,
          role: "vet",
          updated_at: new Date().toISOString(),
        });

        if (profileErr) {
          console.warn("Vet Profile Save Error:", profileErr.message);
        }
      }

      // 3. Reset context state for vet
      resetForNewUser({
        fullName: fullNameTrimmed,
        email: emailTrimmed,
        phone: "",
        role: "vet",
        clinicName: clinicNameTrimmed,
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/vet/home");
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
      <div className="flex-1 flex flex-col justify-between bg-white min-h-full pb-8 select-none">
        
        {/* Top Header Bar */}
        <div className="w-full shrink-0">
          <div className="px-4 pt-3 pb-1 flex items-center">
            <Link
              href="/"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="ย้อนกลับ"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
            </Link>
          </div>

          {/* Teal Pill Banner: สมัครสมาชิก */}
          <div className="flex justify-center mt-1 mb-3">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-8 py-1.5 rounded-full text-[16px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] font-kanit">
              สมัครสมาชิก
            </div>
          </div>
        </div>

        {/* Form Fields Container */}
        <form onSubmit={handleSubmit} className="px-6 space-y-3.5 flex-1">
          {/* 1. ชื่อสถานที่ */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800 font-kanit">
              ชื่อสถานที่
            </label>
            <input
              type="text"
              required
              value={formData.clinicName}
              onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* 2. ชื่อ - นามสกุล */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800 font-kanit">
              ชื่อ - นามสกุล
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* 3. อีเมล */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800 font-kanit">
              อีเมล
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* 4. วุฒิการศึกษา */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800 font-kanit">
              วุฒิการศึกษา
            </label>
            <input
              type="text"
              required
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* 5. ความถนัดเฉพาะทาง */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800 font-kanit">
              ความถนัดเฉพาะทาง
            </label>
            <input
              type="text"
              required
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* 6. รหัสผ่าน */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800 font-kanit">
              รหัสผ่าน
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs text-left">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>ลงทะเบียนสัตวแพทย์สำเร็จ! กำลังเข้าสู่ระบบ...</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[16px] rounded-full shadow-[0_6px_16px_rgba(0,168,119,0.3)] transition-all font-kanit"
            >
              {isLoading ? "กำลังลงทะเบียน..." : "ยืนยันการสมัครสมาชิก"}
            </button>

            {/* Red Cancel Button */}
            <Link
              href="/"
              className="block w-32 mx-auto py-2 bg-[#E50914] hover:bg-[#CC0812] active:scale-[0.98] text-white font-semibold text-[14px] rounded-full text-center shadow-[0_4px_12px_rgba(229,9,20,0.3)] transition-all font-kanit"
            >
              ยกเลิก
            </Link>
          </div>
        </form>

      </div>
    </MobileFrame>
  );
}
