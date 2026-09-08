"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Camera, CheckCircle2, Upload, Sparkles } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import { FloralCatAvatar, GoldenRetrieverAvatar } from "@/components/PetAvatars";
import { usePetContext } from "@/lib/petContext";
import { supabase } from "@/lib/supabaseClient";

export default function PetInfoPage() {
  const router = useRouter();
  const { addPet, currentUser } = usePetContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "แมว",
    breed: "",
    birthdate: "",
    ageValue: "1",
    ageUnit: "ปี" as "ปี" | "เดือน" | "วัน",
    weight: "",
    height: "",
    drugAllergy: "",
    avatar: "cat" as "cat" | "dog",
    customPhotoUrl: "",
    latestVaccine: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, customPhotoUrl: base64 }));
        setToastMessage("อัปโหลดรูปภาพสัตว์เลี้ยงเรียบร้อยแล้ว 📸");
        setTimeout(() => setToastMessage(null), 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto calculate age when birthdate changes
  const handleBirthdateChange = (dateStr: string) => {
    let calculatedAge = formData.ageValue;
    let calculatedUnit = formData.ageUnit;

    if (dateStr) {
      const birth = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays >= 365) {
        const years = Math.floor(diffDays / 365);
        calculatedAge = years.toString();
        calculatedUnit = "ปี";
      } else if (diffDays >= 30) {
        const months = Math.floor(diffDays / 30);
        calculatedAge = months.toString();
        calculatedUnit = "เดือน";
      } else if (diffDays > 0) {
        calculatedAge = diffDays.toString();
        calculatedUnit = "วัน";
      }
    }

    setFormData((prev) => ({
      ...prev,
      birthdate: dateStr,
      ageValue: calculatedAge,
      ageUnit: calculatedUnit,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const fullAgeString = `${formData.ageValue} ${formData.ageUnit}`;

    try {
      const chosenAvatar = formData.customPhotoUrl || formData.avatar;
      const newPetData = {
        name: formData.name || "สัตว์เลี้ยงของฉัน",
        type: formData.type || "แมว",
        breed: formData.breed || "ทั่วไป",
        birthdate: formData.birthdate || "",
        age: fullAgeString,
        weight: formData.weight ? formData.weight : "-",
        height: formData.height ? formData.height : "-",
        drugAllergy: formData.drugAllergy || "ไม่มีประวัติแพ้ยา",
        avatar: chosenAvatar,
        photoUrl: formData.customPhotoUrl || undefined,
        ownerName: currentUser.fullName || "ผู้ใช้งาน",
        latestVaccine: "",
      };

      addPet(newPetData);

      // Insert into Supabase pets table
      await supabase.from("pets").insert({
        name: newPetData.name,
        type: newPetData.type,
        breed: newPetData.breed,
        birthdate: newPetData.birthdate ? newPetData.birthdate : null,
        age: newPetData.age,
        weight: newPetData.weight,
        height: newPetData.height,
        drug_allergy: newPetData.drugAllergy,
        avatar: newPetData.photoUrl || newPetData.avatar,
        owner_name: newPetData.ownerName,
        latest_vaccine: newPetData.latestVaccine,
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/home");
      }, 900);
    } catch (err: any) {
      console.error("Supabase Save Error:", err);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/home");
      }, 900);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-white min-h-full pb-8 select-none relative overflow-y-auto">
        
        {/* Toast Feedback */}
        {toastMessage && (
          <div className="absolute top-14 left-4 right-4 z-50 p-3 bg-slate-900/90 text-white rounded-2xl text-xs flex items-center gap-2 shadow-xl animate-fade-in border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

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

        {/* Hidden File Input for Custom Pet Photo Upload */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />

        {/* Pet Avatar with Camera Upload Button */}
        <div className="w-full flex flex-col items-center justify-center my-3 shrink-0">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer"
            title="แตะเพื่อเพิ่มหรือเปลี่ยนรูปภาพสัตว์เลี้ยง"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center relative border-2 border-teal-300 shadow-md bg-slate-50">
              {formData.customPhotoUrl ? (
                <img
                  src={formData.customPhotoUrl}
                  alt="Pet Photo"
                  className="w-full h-full object-cover"
                />
              ) : formData.avatar === "dog" ? (
                <GoldenRetrieverAvatar size={128} />
              ) : formData.avatar === "cat" ? (
                <FloralCatAvatar size={128} />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                  <Camera className="w-9 h-9 text-teal-600 mb-1" />
                  <span className="text-[11px] font-medium leading-tight text-slate-500">ใส่รูปสัตว์เลี้ยง</span>
                </div>
              )}
            </div>

            {/* Change Photo Camera Overlay Button */}
            <div className="absolute bottom-0 right-0 bg-[#00A877] hover:bg-[#009166] text-white p-2.5 rounded-full shadow-lg active:scale-90 transition-transform">
              <Camera className="w-4 h-4 stroke-[2.4]" />
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[13px] font-bold text-[#00A877] hover:text-[#009166] mt-2 flex items-center gap-1.5 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 active:scale-95 transition-all shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>{formData.customPhotoUrl ? "เปลี่ยนรูปภาพสัตว์เลี้ยง" : "📷 แตะเพื่ออัปโหลดรูปภาพสัตว์เลี้ยง"}</span>
          </button>

          {/* Recommended Preset Avatars (แนะนำรูปได้) */}
          <div className="mt-3 flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
            <span className="text-[12px] text-slate-500 font-medium">รูปแนะนำ:</span>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, avatar: "cat", customPhotoUrl: "" }))}
              className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                formData.avatar === "cat" && !formData.customPhotoUrl
                  ? "border-[#5CB8C1] scale-110 shadow-sm ring-2 ring-teal-200"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
              title="รูปแนะนำ: น้องแมว"
            >
              <FloralCatAvatar size={36} />
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, avatar: "dog", customPhotoUrl: "" }))}
              className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                formData.avatar === "dog" && !formData.customPhotoUrl
                  ? "border-[#5CB8C1] scale-110 shadow-sm ring-2 ring-teal-200"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
              title="รูปแนะนำ: น้องสุนัข"
            >
              <GoldenRetrieverAvatar size={36} />
            </button>
          </div>
        </div>

        {/* Pet Form */}
        <form onSubmit={handleSubmit} className="px-6 space-y-3 flex-1 text-left">
          
          {/* Pet Name */}
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-slate-800">
              ชื่อสัตว์เลี้ยง
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="เช่น ตี๋บ้อง, มารวย, โมจิ"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            />
          </div>

          {/* Type & Breed (2 Columns) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="block text-[14px] font-medium text-slate-800">
                ประเภท
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                    avatar: e.target.value === "สุนัข" ? "dog" : "cat",
                  })
                }
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              >
                <option value="แมว">แมว</option>
                <option value="สุนัข">สุนัข</option>
                <option value="นก">นก</option>
                <option value="กระต่าย">กระต่าย</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[14px] font-medium text-slate-800">
                สายพันธุ์
              </label>
              <input
                type="text"
                required
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                placeholder="เช่น ไฮกัน, สกอตติช"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>
          </div>

          {/* Birth Date & Age (Stacked / Clean 2 Columns with no mobile overlap) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Birth Date */}
            <div className="space-y-1">
              <label className="block text-[14px] font-medium text-slate-800">
                วัน/เดือน/ปีเกิด
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => handleBirthdateChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                />
              </div>
            </div>

            {/* Age with Unit Dropdown (วัน - เดือน - ปี) */}
            <div className="space-y-1">
              <label className="block text-[14px] font-medium text-slate-800">
                อายุ (วัน-เดือน-ปี)
              </label>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  min="0"
                  value={formData.ageValue}
                  onChange={(e) => setFormData({ ...formData, ageValue: e.target.value })}
                  placeholder="เช่น 1"
                  className="w-1/2 px-3 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)] font-semibold"
                />
                <select
                  value={formData.ageUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, ageUnit: e.target.value as any })
                  }
                  className="w-1/2 px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="ปี">ปี</option>
                  <option value="เดือน">เดือน</option>
                  <option value="วัน">วัน</option>
                </select>
              </div>
            </div>
          </div>

          {/* Weight & Height (2 Columns) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="block text-[14px] font-medium text-slate-800">
                น้ำหนัก (ก.ก)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="เช่น 4.5"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[14px] font-medium text-slate-800">
                ส่วนสูง (ซม.)
              </label>
              <input
                type="number"
                step="1"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="เช่น 25"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              />
            </div>
          </div>

          {/* Drug Allergy */}
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-slate-800">
              ประวัติแพ้ยา (ถ้ามี)
            </label>
            <input
              type="text"
              value={formData.drugAllergy}
              onChange={(e) => setFormData({ ...formData, drugAllergy: e.target.value })}
              placeholder="เช่น ไม่มี หรือ ระบุชื่อยา"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            />
          </div>

          {/* Success Alert */}
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>บันทึกข้อมูลสัตว์เลี้ยงสำเร็จแล้ว! กำลังไปที่หน้าหลัก...</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[16px] py-3 px-6 rounded-full shadow-[0_8px_20px_rgba(0,168,119,0.35)] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 font-kanit cursor-pointer"
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
                className="text-[14px] text-slate-600 hover:text-slate-900 transition-colors inline-block py-1"
              >
                ไว้บันทึกภายหลัง
              </Link>
            </div>
          </div>
        </form>

      </div>
    </MobileFrame>
  );
}
