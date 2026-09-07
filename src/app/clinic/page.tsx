"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  X,
  CornerUpRight,
  Navigation,
  Phone,
  Bookmark,
  Share2,
  Calendar,
  CheckCircle2,
  MapPin,
  Car,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { ClinicImage, SatelliteMapView } from "@/components/ClinicGraphics";
import { usePetContext } from "@/lib/petContext";

interface ClinicItem {
  id: number;
  name: string;
  distance: string;
  location: string;
  rating: number;
  starCount: number;
  imageType: "neenee" | "thasaan" | "raksat";
  travelTime: string;
  category: string;
  openStatus: string;
  tel: string;
}

const clinicData: ClinicItem[] = [
  {
    id: 1,
    name: "นีเน่แคร์เซ็นเตอร์",
    distance: "2.5 km",
    location: "เมืองสงขลา, สงขลา",
    rating: 5.0,
    starCount: 5,
    imageType: "neenee",
    travelTime: "6 นาที",
    category: "คลินิกรักษาสัตว์ & อาบน้ำตัดขน",
    openStatus: "เปิด • ปิด 21:00",
    tel: "074-321-999",
  },
  {
    id: 2,
    name: "โรงพยาบาลสัตว์ท่าสะอ้าน",
    distance: "3.9 km",
    location: "เมืองสงขลา, สงขลา",
    rating: 4.0,
    starCount: 4,
    imageType: "thasaan",
    travelTime: "9 นาที",
    category: "สัตวแพทย์",
    openStatus: "เปิด • ปิด 20:00",
    tel: "074-555-888",
  },
  {
    id: 3,
    name: "คลินิกรักษ์สัตว์",
    distance: "15.7 km",
    location: "เมืองสงขลา, สงขลา",
    rating: 3.0,
    starCount: 3,
    imageType: "raksat",
    travelTime: "25 นาที",
    category: "คลินิกรักษาสัตว์ทั่วไป",
    openStatus: "เปิด • ปิด 19:30",
    tel: "074-222-111",
  },
];

export default function ClinicPage() {
  const { selectedPet, currentUser, addAppointment, notifications } = usePetContext();
  const [activeView, setActiveView] = useState<"list" | "map">("list");
  const [selectedClinic, setSelectedClinic] = useState<ClinicItem>(clinicData[1]); // โรงพยาบาลสัตว์ท่าสะอ้าน by default
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [savedClinics, setSavedClinics] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [bookingDate, setBookingDate] = useState("2026-09-08");
  const [bookingTime, setBookingTime] = useState("10:00 - 11:00 น.");
  const [bookingNote, setBookingNote] = useState("ฉีดวัคซีนรวมประจำปี");

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  const filteredClinics = clinicData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openMapForClinic = (clinic: ClinicItem) => {
    setSelectedClinic(clinic);
    setActiveView("map");
  };

  const toggleBookmark = (id: number) => {
    if (savedClinics.includes(id)) {
      setSavedClinics(savedClinics.filter((item) => item !== id));
      setToastMessage("นำออกจากรายการบันทึกแล้ว");
    } else {
      setSavedClinics([...savedClinics, id]);
      setToastMessage("บันทึกคลินิกลงในรายการโปรดเรียบร้อย");
    }
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShare = () => {
    setToastMessage("คัดลอกลิงก์ตำแหน่งคลินิกแล้ว พร้อมแชร์");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);

    addAppointment({
      petName: selectedPet.name,
      petType: selectedPet.type,
      ownerName: currentUser.fullName || "ผู้ใช้งาน",
      phone: currentUser.phone || "08X-XXX-XXXX",
      clinicName: selectedClinic.name,
      doctorName: "สัตวแพทย์ประจำเวร",
      serviceType: bookingNote || "ตรวจสุขภาพและฉีดวัคซีน",
      date: bookingDate,
      time: bookingTime,
      status: "ยืนยันแล้ว",
      notes: bookingNote,
      fee: "฿450.00",
    });

    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setToastMessage(`จองคิวตรวจที่ "${selectedClinic.name}" สำหรับ ${selectedPet.name} สำเร็จแล้ว! 📅`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 1200);
  };

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

        {/* View Switcher / Tab Header */}
        <div className="px-5 pt-3 pb-2 text-left shrink-0 bg-white border-b border-slate-100 flex items-center justify-between">
          <h1 className="text-[19px] font-bold text-slate-900 tracking-tight font-kanit">
            คลินิกและโรงพยาบาลสัตว์
          </h1>

          {/* Quick View Toggle Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full text-xs">
            <button
              type="button"
              onClick={() => setActiveView("list")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                activeView === "list"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              รายการ
            </button>
            <button
              type="button"
              onClick={() => setActiveView("map")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                activeView === "map"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              แผนที่
            </button>
          </div>
        </div>

        {/* Toast Feedback Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-4 right-4 z-50 p-3 bg-slate-900/90 text-white rounded-2xl text-xs flex items-center gap-2 shadow-xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: CLINIC LIST VIEW (MATCHING IMAGE 4) */}
        {/* ------------------------------------------------------------- */}
        {activeView === "list" && (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาคลินิกใกล้คุณ..."
                className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
              />
              <Search className="w-5 h-5 text-slate-700 absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.2]" />
            </div>

            {/* Recommended Clinic Subtitle */}
            <div className="flex items-center gap-1.5 text-slate-800 text-left pt-1">
              <span className="text-[16px]">⭐</span>
              <h2 className="text-[16px] font-bold text-slate-800 font-kanit">
                คลินิกแนะนำ
              </h2>
            </div>

            {/* Clinic Card List */}
            <div className="space-y-3.5">
              {filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="bg-white rounded-3xl p-3 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex gap-3 text-left hover:shadow-md transition-shadow"
                >
                  {/* Left: Clinic Photo Container */}
                  <div
                    onClick={() => openMapForClinic(clinic)}
                    className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 cursor-pointer shadow-xs border border-slate-100 relative group"
                  >
                    <ClinicImage type={clinic.imageType} />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[10px] bg-black/60 px-2 py-0.5 rounded-full">
                        ดูแผนที่
                      </span>
                    </div>
                  </div>

                  {/* Right: Clinic Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                    <div>
                      {/* Distance */}
                      <div className="text-[12px] text-slate-500 font-normal">
                        ห่างจากคุณ {clinic.distance}
                      </div>

                      {/* Name */}
                      <h3
                        onClick={() => openMapForClinic(clinic)}
                        className="text-[16px] font-bold text-slate-900 truncate font-kanit hover:text-teal-600 cursor-pointer"
                      >
                        {clinic.name}
                      </h3>

                      {/* Location */}
                      <div className="text-[12px] text-slate-600 truncate">
                        {clinic.location}
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 text-slate-900 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < clinic.starCount ? "text-slate-900" : "text-slate-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button: ดูรายละเอียด / จองคิว */}
                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedClinic(clinic);
                          setBookingModalOpen(true);
                        }}
                        className="w-full py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-800 rounded-xl text-[12px] font-semibold text-slate-800 text-center active:scale-95 transition-all shadow-xs"
                      >
                        ดูรายละเอียด / จองคิว
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: MAP / DETAIL VIEW (MATCHING IMAGE 5) */}
        {/* ------------------------------------------------------------- */}
        {activeView === "map" && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto relative">
            
            {/* Search input with clinic name prefilled & X button */}
            <div className="px-4 py-2.5 bg-white border-b border-slate-100 z-10 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={selectedClinic.name}
                  className="w-full pl-10 pr-10 py-2 bg-white rounded-full text-[14px] font-medium text-slate-900 border border-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.06)] focus:outline-none"
                />
                <Search className="w-5 h-5 text-slate-800 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
                <button
                  type="button"
                  onClick={() => setActiveView("list")}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Satellite Map Area with pinpoint */}
            <div className="w-full flex-1 min-h-[220px] relative">
              <SatelliteMapView
                selectedClinicName={selectedClinic.name}
                onPinClick={() => {
                  setToastMessage(`พิกัด: ${selectedClinic.name} (ห่าง ${selectedClinic.distance})`);
                  setTimeout(() => setToastMessage(null), 2000);
                }}
              />
            </div>

            {/* Bottom Floating Info Sheet (Bottom Sheet UI) */}
            <div className="bg-white rounded-t-3xl border-t border-slate-200 shadow-[0_-8px_24px_rgba(0,0,0,0.1)] p-4 text-left space-y-3 z-20 shrink-0">
              {/* Sheet Drag Pill */}
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto -mt-1 mb-2" />

              {/* Title & Ratings */}
              <div>
                <h2 className="text-[18px] font-bold text-slate-900 font-kanit">
                  {selectedClinic.name}
                </h2>
                
                <div className="flex items-center gap-2 mt-1 text-[13px] text-slate-700">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < selectedClinic.starCount ? "text-slate-900" : "text-slate-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="font-bold ml-1">{selectedClinic.starCount}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-medium text-slate-800">
                    <Car className="w-4 h-4 text-slate-700" />
                    <span>{selectedClinic.travelTime}</span>
                  </div>
                </div>

                <div className="text-[12px] text-slate-500 mt-0.5">
                  {selectedClinic.category}
                </div>

                <div className="flex items-center gap-2 mt-1 text-[12px]">
                  <span className="font-bold text-emerald-600">เปิด</span>
                  <span className="text-slate-600">ปิด 20:00</span>
                </div>
              </div>

              {/* 5 Action Buttons Row (เส้นทาง, เริ่ม, โทร, บันทึก, แชร์) */}
              <div className="flex items-center justify-between gap-1 pt-1 overflow-x-auto no-scrollbar">
                {/* 1. Directions (เส้นทาง) */}
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(`กำลังคำนวณเส้นทางไป ${selectedClinic.name}... 🚗`);
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-teal-50 text-slate-800 active:scale-95 transition-all text-center flex-1 border border-slate-100"
                >
                  <CornerUpRight className="w-4 h-4 stroke-[2.2] text-teal-600" />
                  <span className="text-[11px] font-medium">เส้นทาง</span>
                </button>

                {/* 2. Start Navigation (เริ่ม) */}
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage("เริ่มระบบนำทางแบบเลี้ยวต่อเลี้ยว 🧭");
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-800 active:scale-95 transition-all text-center flex-1 border border-slate-100"
                >
                  <Navigation className="w-4 h-4 stroke-[2.2] text-emerald-600" />
                  <span className="text-[11px] font-medium">เริ่ม</span>
                </button>

                {/* 3. Call (โทร) */}
                <a
                  href={`tel:${selectedClinic.tel}`}
                  className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-800 active:scale-95 transition-all text-center flex-1 border border-slate-100"
                >
                  <Phone className="w-4 h-4 stroke-[2.2] text-blue-600" />
                  <span className="text-[11px] font-medium">โทร</span>
                </a>

                {/* 4. Bookmark (บันทึก) */}
                <button
                  type="button"
                  onClick={() => toggleBookmark(selectedClinic.id)}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl active:scale-95 transition-all text-center flex-1 border ${
                    savedClinics.includes(selectedClinic.id)
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-slate-50 text-slate-800 border-slate-100 hover:bg-amber-50"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 stroke-[2.2] ${
                      savedClinics.includes(selectedClinic.id)
                        ? "fill-amber-500 text-amber-500"
                        : "text-slate-700"
                    }`}
                  />
                  <span className="text-[11px] font-medium">บันทึก</span>
                </button>

                {/* 5. Share (แชร์) */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-purple-50 text-slate-800 active:scale-95 transition-all text-center flex-1 border border-slate-100"
                >
                  <Share2 className="w-4 h-4 stroke-[2.2] text-purple-600" />
                  <span className="text-[11px] font-medium">แชร์</span>
                </button>
              </div>

              {/* Clinic Gallery Thumbnails Carousel */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-semibold text-slate-600">บรรยากาศภายในคลินิก</div>
                <div className="grid grid-cols-3 gap-2 h-16">
                  <ClinicImage type="interior1" />
                  <ClinicImage type="interior2" />
                  <ClinicImage type="interior3" />
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-2.5 bg-[#00A877] hover:bg-[#009166] active:scale-95 text-white rounded-full font-medium text-sm shadow-md transition-all font-kanit"
                >
                  จองคิวตรวจรักษาที่นี่
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Bottom Navigation Bar */}
        <BottomNav />

        {/* Booking Appointment Modal */}
        {bookingModalOpen && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">จองคิวตรวจรักษา</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-teal-50/60 p-2.5 rounded-2xl text-xs space-y-1">
                <div className="font-bold text-slate-800">{selectedClinic.name}</div>
                <div className="text-slate-600">สัตว์เลี้ยง: {selectedPet.name} ({selectedPet.breed})</div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">วันที่ต้องการนัดหมาย</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">ช่วงเวลา</label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  >
                    <option value="10:00 - 11:00 น.">เช้า: 10:00 - 11:00 น.</option>
                    <option value="14:00 - 15:00 น.">บ่าย: 14:00 - 15:00 น.</option>
                    <option value="17:00 - 18:00 น.">เย็น: 17:00 - 18:00 น.</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">อาการหรือเรื่องที่ต้องการตรวจ</label>
                  <input
                    type="text"
                    placeholder="เช่น ตรวจสุขภาพประจำปี, ฉีดวัคซีน"
                    value={bookingNote}
                    onChange={(e) => setBookingNote(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                {bookingSuccess && (
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl text-center font-bold">
                    ✓ กำลังยืนยันการจองคิว...
                  </div>
                )}

                <div className="pt-2 space-y-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00A877] text-white font-medium rounded-full text-xs shadow-md active:scale-95 transition-transform"
                  >
                    ยืนยันการจองคิว
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="w-full py-1.5 text-slate-500 text-xs"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </MobileFrame>
  );
}
