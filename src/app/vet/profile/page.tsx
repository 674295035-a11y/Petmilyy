"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Pill,
  Settings,
  AlertCircle,
  User,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  X,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";
import { VetDoctorAvatar } from "@/components/PetAvatars";

export default function VetProfilePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    {
      id: "schedule",
      title: "ระบบจัดการตารางเวลาเข้าเวรแพทย์",
      icon: Clock,
      onClick: () => setActiveModal("schedule"),
    },
    {
      id: "eprescription",
      title: "สั่งยาอิเล็กทรอนิกส์",
      icon: Pill,
      onClick: () => setActiveModal("eprescription"),
    },
    {
      id: "settings",
      title: "การตั้งค่า",
      icon: Settings,
      onClick: () => setActiveModal("settings"),
    },
    {
      id: "notifications",
      title: "การแจ้งเตือน",
      icon: AlertCircle,
      onClick: () => setActiveModal("notifications"),
    },
    {
      id: "privacy",
      title: "ความเป็นส่วนตัวและรหัสผ่าน",
      icon: User,
      onClick: () => setActiveModal("privacy"),
    },
    {
      id: "help",
      title: "ศูนย์ช่วยเหลือ",
      icon: MessageCircle,
      onClick: () => setActiveModal("help"),
    },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
        
        {/* Top Header Bar: Dr. Donut */}
        <header className="w-full bg-[#62C0C6] py-2.5 px-4 flex items-center justify-between shadow-sm z-30 shrink-0">
          <Link
            href="/vet/home"
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-900 hover:bg-black/10 active:scale-95 transition-all"
            aria-label="ย้อนกลับ"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white shadow-xs border border-white/60 flex items-center justify-center">
              <VetDoctorAvatar type="donut" size={36} />
            </div>
            <span className="text-[17px] font-bold text-slate-900 font-kanit">
              แพทย์หญิงโดนัท
            </span>
          </div>

          <div className="w-9 h-9" />
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-3.5">
          
          {/* Top Pill Banner: โปรไฟล์ของฉัน */}
          <div className="flex justify-center">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-8 py-1.5 rounded-full text-[15px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] font-kanit">
              โปรไฟล์ของฉัน
            </div>
          </div>

          {/* Vet Profile Card with Floating Avatar */}
          <div className="pt-8">
            <div className="bg-white rounded-3xl pt-11 pb-4 px-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative text-center">
              {/* Floating Avatar */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md border-2 border-white flex items-center justify-center">
                  <VetDoctorAvatar type="donut" size={76} />
                </div>
              </div>

              {/* Vet Info */}
              <h2 className="text-[19px] font-bold text-slate-900 font-kanit">
                แพทย์โดนัท
              </h2>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Donat@gamili.com
              </p>
              <div className="text-[13px] font-medium text-emerald-600 mt-1">
                สัตวแพทย์
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/80 my-3" />

              {/* Single Centered Stat: 15 นัดหมายวันนี้ */}
              <div className="text-center">
                <div className="text-[26px] font-bold text-slate-900 font-kanit leading-none">
                  15
                </div>
                <div className="text-[13px] text-slate-600 mt-1">
                  นัดหมายวันนี้
                </div>
              </div>
            </div>
          </div>

          {/* 6 Menu Items */}
          <div className="space-y-2.5 pt-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className="w-full bg-white rounded-2xl py-3 px-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between hover:bg-slate-50 active:scale-[0.99] transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-800 stroke-[2]" />
                    <span className="text-[14px] font-medium text-slate-800 font-kanit">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 stroke-[1.8]" />
                </button>
              );
            })}
          </div>

          {/* Logout Button (Solid Red) */}
          <div className="pt-2">
            <Link
              href="/"
              className="block w-full py-3 bg-[#E50914] hover:bg-[#CC0812] active:scale-[0.98] text-white font-semibold text-[16px] rounded-full text-center shadow-[0_6px_16px_rgba(229,9,20,0.35)] transition-all font-kanit"
            >
              ออกจากระบบ
            </Link>
          </div>

        </div>

        {/* Bottom Nav (3 Tabs) */}
        <BottomNav role="vet" />

        {/* Modal for Vet Features */}
        {activeModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3 shadow-2xl animate-fade-in border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-kanit">
                  {activeModal === "schedule" && "ตารางเวลาเข้าเวรแพทย์"}
                  {activeModal === "eprescription" && "สั่งยาอิเล็กทรอนิกส์ (e-Rx)"}
                  {activeModal === "settings" && "การตั้งค่าคลินิก"}
                  {activeModal === "notifications" && "การแจ้งเตือนคิวตรวจ"}
                  {activeModal === "privacy" && "ความปลอดภัยเวชระเบียน"}
                  {activeModal === "help" && "ศูนย์ช่วยเหลือสำหรับแพทย์"}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-2 py-1">
                {activeModal === "schedule" && (
                  <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>จันทร์ - ศุกร์:</span>
                      <span className="text-teal-700">09:00 - 18:00 น.</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>เสาร์ - อาทิตย์:</span>
                      <span className="text-amber-700">10:00 - 15:00 น.</span>
                    </div>
                  </div>
                )}
                {activeModal === "eprescription" && (
                  <p>ระบบออกใบสั่งยาออนไลน์เชื่อมต่อกับคลังยาของโรงพยาบาล พร้อมพิมพ์และส่งให้เจ้าของสัตว์เลี้ยงทันที</p>
                )}
                {activeModal === "notifications" && (
                  <p>มีนัดหมายตรวจสุขภาพ 15 รายการสำหรับวันนี้</p>
                )}
                {activeModal === "privacy" && (
                  <p>ระบบบันทึกเวชระเบียนสัตว์เลี้ยงปลอดภัยตามมาตรฐานสัตวแพทยสภา</p>
                )}
                {activeModal === "help" && (
                  <div className="space-y-2.5">
                    <p className="text-[12px] leading-relaxed text-slate-600">
                      หากมีข้อสงสัยหรือต้องการความช่วยเหลือ สามารถติดต่อทีมงาน Petmily ได้ผ่านช่องทางดังนี้:
                    </p>
                    <div className="p-3.5 bg-[#EDF8F8] rounded-2xl space-y-2 text-[12px] border border-teal-100/80">
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span className="text-slate-700">Call Center:</span>
                        <a
                          href="tel:0656324781"
                          className="font-bold text-[#0D6E6E] underline hover:opacity-80 transition-opacity"
                        >
                          0656324781
                        </a>
                        <span className="text-slate-500 text-[11px]">(24 ชม.)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span>💬</span>
                        <span className="text-slate-700">Facebook:</span>
                        <a
                          href="https://www.facebook.com/search/top?q=Petmily"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#0D6E6E] underline hover:opacity-80 transition-opacity"
                        >
                          เพจ Petmily
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>📧</span>
                        <span className="text-slate-700">Email:</span>
                        <a
                          href="mailto:patmily3@gmail.com"
                          className="font-bold text-[#0D6E6E] underline hover:opacity-80 transition-opacity"
                        >
                          patmily3@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {activeModal === "settings" && (
                  <p>ตั้งค่าโปรไฟล์สัตวแพทย์และเวลาเปิดรับเคสออนไลน์</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full py-2 bg-[#62C0C6] hover:bg-[#53adb3] text-slate-900 font-medium rounded-full text-xs"
              >
                ตกลง
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
