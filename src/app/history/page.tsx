"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Heart, X, CheckCircle2, Calendar, FileText, User } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

import { usePetContext, Appointment } from "@/lib/petContext";

export default function HistoryPage() {
  const { appointments, notifications } = usePetContext();
  const [selectedItem, setSelectedItem] = useState<Appointment | null>(null);

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] dark:bg-[#0B0F17] min-h-full select-none relative transition-colors duration-300">
        
        {/* Top Header */}
        <AppHeader
          backHref="/profile"
          showLogo={true}
          showBell={true}
          bellCount={unreadNotifs}
        />

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 space-y-4">
          
          {/* Top Pill Banner: ประวัติการจองคิว/การรักษา */}
          <div className="flex justify-center">
            <div className="bg-[#62C0C6] text-slate-900 font-bold px-6 py-1.5 rounded-full text-[14px] shadow-[0_4px_12px_rgba(98,192,198,0.35)] font-kanit">
              ประวัติการจองคิว/การรักษา
            </div>
          </div>

          {/* Section: รายการการจองคิว & การรักษา */}
          <div className="space-y-2.5 text-left">
            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
              <Clock className="w-5 h-5 text-slate-900 dark:text-teal-400 stroke-[2.2]" />
              <h2 className="text-[16px] font-bold text-slate-900 dark:text-white font-kanit">
                รายการนัดหมาย & การรักษา
              </h2>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-slate-700 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-white">
                  ยังไม่มีประวัติการจองคิวหรือการรักษา
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  คุณสามารถค้นหาคลินิกและนัดหมายพบคุณหมอได้ทันที
                </p>
                <Link
                  href="/clinic"
                  className="inline-block py-2 px-6 bg-[#00A877] text-white font-medium text-xs rounded-full shadow-md hover:bg-[#009166] active:scale-95 transition-all font-kanit"
                >
                  ค้นหาคลินิก & จองคิว
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2.5 hover:shadow-md transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-bold text-slate-900 dark:text-white font-kanit">
                        {item.date}
                      </span>
                      <span className="text-[13px] font-semibold text-[#539E18] dark:text-emerald-400">
                        {item.status || "ยืนยันแล้ว"}
                      </span>
                    </div>

                    <div className="text-[13px] text-slate-700 dark:text-slate-300">
                      {item.time} | {item.serviceType}
                    </div>
                    <div className="text-[13px] text-slate-600 dark:text-slate-300 font-medium">
                      {item.clinicName} {item.doctorName ? `(${item.doctorName})` : ""}
                    </div>
                    <div className="text-[12px] text-slate-500 dark:text-slate-400">
                      สัตว์เลี้ยง: {item.petName} | ผู้จอง: {item.ownerName}
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="w-full py-2 bg-[#00A877] hover:bg-[#009166] active:scale-[0.98] text-white font-medium text-[14px] rounded-full shadow-[0_4px_12px_rgba(0,168,119,0.3)] transition-all font-kanit text-center cursor-pointer"
                      >
                        ดูรายละเอียด
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Nav */}
        <BottomNav />

        {/* Detail Modal */}
        {selectedItem && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200 dark:border-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-kanit">
                    รายละเอียดเวชระเบียน
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="bg-teal-50/60 dark:bg-slate-700/60 p-3 rounded-2xl space-y-1 border border-teal-100 dark:border-slate-600">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{selectedItem.serviceType}</div>
                  <div className="text-slate-600 dark:text-slate-300">สถานพยาบาล: {selectedItem.clinicName}</div>
                  <div className="text-slate-600 dark:text-slate-300">แพทย์ผู้ตรวจ: {selectedItem.doctorName || "สัตวแพทย์ประจำเวร"}</div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">วันและเวลา</span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{selectedItem.date} {selectedItem.time}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">สัตว์เลี้ยง</span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{selectedItem.petName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">ผู้จอง/เจ้าของ</span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{selectedItem.ownerName} ({selectedItem.phone})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">สถานะ</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedItem.status || "ยืนยันแล้ว"}</span>
                  </div>
                  {selectedItem.notes && (
                    <div className="pt-1">
                      <span className="text-slate-500 dark:text-slate-400 block mb-0.5">หมายเหตุ/อาการ:</span>
                      <p className="bg-slate-50 dark:bg-slate-700/60 p-2 rounded-xl text-slate-700 dark:text-slate-200 leading-relaxed border border-slate-100 dark:border-slate-600">
                        {selectedItem.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-full py-2 bg-[#00A877] text-white font-medium rounded-full text-xs shadow-md font-kanit cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
