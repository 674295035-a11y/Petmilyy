"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Camera, CheckCircle2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import { FloralCatAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";

export default function PetInfoPage() {
  const router = useRouter();
  const { addPet } = usePetContext();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    birthdate: "",
    age: "",
    weight: "",
    height: "",
    drugAllergy: "",
    avatar: "cat" as "cat" | "dog",
    ownerName: "คุณนามิ",
    latestVaccine: "12 พ.ค. 2026",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      addPet({
        name: formData.name || "น้องแมวตัวใหม่",
        type: formData.type || "แมว",
        breed: formData.breed || "สกอตติช โฟลด์",
        birthdate: formData.birthdate || "2024-03-15",
        age: formData.age || "1 ปี 2 เดือน",
        weight: formData.weight || "5.5",
        height: formData.height || "25 ซม.",
        drugAllergy: formData.drugAllergy || "ไม่มีประวัติแพ้ยา",
        avatar: formData.avatar,
        ownerName: "คุณนามิ",
        latestVaccine: "12 พ.ค. 2026",
      });

      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/home");
      }, 1000);
    }, 600);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-white min-h-full pb-8 select-none">
        
        {/* Top Header */}
        <div className="w-full shrink-0">
          {/* Back Arrow Bar */}
          <div className="px-4 pt-3 pb-1 flex items-center">
            <Link
              href="/home"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="ย้อนกลับ"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
            </Link>
          </div>

          {/* Mint Teal Title Bar (ข้อมูลสัตว์) */}
          <div className="w-full bg-[#62C0C6] py-3 text-center shadow-sm">
            <h1 className="text-[22px] font-bold text-slate-900 tracking-tight font-kanit">
              ข้อมูลสัตว์
            </h1>
          </div>
        </div>

        {/* Pet Avatar with Floral Wreath Decoration */}
        <div className="w-full flex justify-center my-3 shrink-0">
          <div className="relative group cursor-pointer">
            <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center relative">
              <FloralCatAvatar size={144} />
            </div>

            {/* Change Photo Overlay Button */}
            <div className="absolute bottom-0 right-1 bg-[#00A877] text-white p-2 rounded-full shadow-md hover:scale-105 transition-transform">
              <Camera className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Pet Form */}
        <form onSubmit={handleSubmit} className="px-6 space-y-3.5 flex-1">
          {/* Pet Name */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800">
              ชื่อสัตว์เลี้ยง
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            />
          </div>

          {/* Type & Breed (2 Columns) */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <label className="block text-[15px] font-medium text-slate-800">
                ประเภท
              </label>
              <input
                type="text"
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder=""
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[15px] font-medium text-slate-800">
                สายพันธุ์
              </label>
              <input
                type="text"
                required
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                placeholder=""
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>
          </div>

          {/* Birth Date & Age (2 Columns) */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <label className="block text-[15px] font-medium text-slate-800">
                วัน/เดือน/ปีเกิด
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  className="w-full pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                />
                <Calendar className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-[15px] font-medium text-slate-800">
                อายุ
              </label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder=""
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>
          </div>

          {/* Weight & Height (2 Columns) */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <label className="block text-[15px] font-medium text-slate-800">
                น้ำหนัก (ก.ก)
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder=""
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[15px] font-medium text-slate-800">
                ส่วนสูง
              </label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder=""
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>
          </div>

          {/* Drug Allergy */}
          <div className="space-y-1 text-left">
            <label className="block text-[15px] font-medium text-slate-800">
              ประวัติแพ้ยา
            </label>
            <input
              type="text"
              value={formData.drugAllergy}
              onChange={(e) => setFormData({ ...formData, drugAllergy: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            />
          </div>

          {/* Success Alert */}
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>บันทึกข้อมูลสัตว์เลี้ยงสำเร็จแล้ว!</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-3 space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[16px] py-3 px-6 rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 font-kanit"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "บันทึกข้อมูล"
              )}
            </button>

            <div className="text-center">
              <Link
                href="/home"
                className="text-[14px] text-slate-700 hover:text-slate-900 transition-colors inline-block py-1"
              >
                ยกเลิก
              </Link>
            </div>
          </div>
        </form>

      </div>
    </MobileFrame>
  );
}
