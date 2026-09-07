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
  Maximize2,
  ExternalLink,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import {
  ClinicImage,
  SatelliteMapView,
  clinicAtmosphereData,
  ClinicAtmosphereImage,
} from "@/components/ClinicGraphics";
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
  lat: number;
  lng: number;
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
    lat: 7.195,
    lng: 100.602,
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
    lat: 7.1895,
    lng: 100.596,
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
    lat: 7.172,
    lng: 100.615,
  },
];

export default function ClinicPage() {
  const { selectedPet, currentUser, addAppointment, notifications } = usePetContext();
  const [activeView, setActiveView] = useState<"list" | "map">("list");
  const [selectedClinic, setSelectedClinic] = useState<ClinicItem>(clinicData[1]); // โรงพยาบาลสัตว์ท่าสะอ้าน
  const [searchQuery, setSearchQuery] = useState("");
  const [mapSearchInput, setMapSearchInput] = useState("");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [savedClinics, setSavedClinics] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<ClinicAtmosphereImage | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const [bookingDate, setBookingDate] = useState("2026-09-08");
  const [bookingTime, setBookingTime] = useState("10:00 - 11:00 น.");
  const [bookingNote, setBookingNote] = useState("ฉีดวัคซีนรวมประจำปี");

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  const filteredClinics = clinicData.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openMapForClinic = (clinic: ClinicItem) => {
    setSelectedClinic(clinic);
    setMapSearchInput(clinic.name);
    setActiveView("map");
  };

  const handleMapSearch = (query: string) => {
    setMapSearchInput(query);
    if (!query.trim()) return;
    const match = clinicData.find(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.location.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      setSelectedClinic(match);
      setToastMessage(`พบ "${match.name}"`);
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const clearMapSearch = () => {
    setMapSearchInput("");
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2.0, parseFloat((prev + 0.2).toFixed(1))));
    setToastMessage("ซูมเข้าแผนที่ 🔍");
    setTimeout(() => setToastMessage(null), 1500);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.8, parseFloat((prev - 0.2).toFixed(1))));
    setToastMessage("ซูมออกแผนที่ 🔎");
    setTimeout(() => setToastMessage(null), 1500);
  };

  const toggleBookmark = (id: number) => {
    if (savedClinics.includes(id)) {
      setSavedClinics(savedClinics.filter((item) => item !== id));
      setToastMessage("นำออกจากรายการบันทึกแล้ว");
    } else {
      setSavedClinics([...savedClinics, id]);
      setToastMessage("บันทึกคลินิกลงในรายการโปรดเรียบร้อย ⭐");
    }
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Open Google Maps Directions
  const handleDirections = () => {
    const dest = encodeURIComponent(`${selectedClinic.name} ${selectedClinic.location}`);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
    window.open(mapsUrl, "_blank");
    setToastMessage(`เปิดเส้นทางนำทางไปยัง ${selectedClinic.name} บน Google Maps 🚗`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Start Navigation GPS
  const handleStartNav = () => {
    const dest = encodeURIComponent(`${selectedClinic.name} ${selectedClinic.location}`);
    const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
    window.open(navUrl, "_blank");
    setToastMessage(`เริ่มนำทางแบบเลี้ยวต่อเลี้ยวไปยัง ${selectedClinic.name} 🧭`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Share Clinic
  const handleShare = async () => {
    const shareText = `คลินิกสัตว์แนะนำ: ${selectedClinic.name} (${selectedClinic.location}) โทร: ${selectedClinic.tel}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedClinic.name,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (err) {}
    }
    navigator.clipboard?.writeText(`${shareText} ${window.location.href}`);
    setToastMessage("คัดลอกข้อมูลและลิงก์คลินิกเรียบร้อยแล้ว พร้อมแชร์ 📋");
    setTimeout(() => setToastMessage(null), 3000);
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
          bellCount={unreadNotifs}
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
          <div className="absolute top-16 left-4 right-4 z-50 p-3 bg-slate-900/90 backdrop-blur-sm text-white rounded-2xl text-xs flex items-center gap-2 shadow-xl animate-fade-in border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: CLINIC LIST VIEW */}
        {/* ------------------------------------------------------------- */}
        {activeView === "list" && (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {/* Search Bar */}
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาคลินิกใกล้คุณ..."
                className="w-full pl-11 pr-10 py-2.5 bg-white rounded-full text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
              />
              <Search className="w-5 h-5 text-slate-700 absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.2]" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 absolute right-3 top-1/2 -translate-y-1/2"
                  title="ล้างคำค้นหา"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
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
        {/* VIEW 2: MAP / DETAIL VIEW (MATCHING IMAGE 2) */}
        {/* ------------------------------------------------------------- */}
        {activeView === "map" && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto relative">
            
            {/* Search input with live search, click search, and X button */}
            <div className="px-4 py-2.5 bg-white border-b border-slate-100 z-10 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={mapSearchInput}
                  onChange={(e) => handleMapSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleMapSearch(mapSearchInput);
                  }}
                  placeholder="พิมพ์ค้นหาชื่อโรงพยาบาลหรือคลินิก..."
                  className="w-full pl-10 pr-10 py-2 bg-white rounded-full text-[14px] font-medium text-slate-900 border border-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <Search
                  onClick={() => handleMapSearch(mapSearchInput)}
                  className="w-5 h-5 text-slate-800 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2] cursor-pointer"
                />
                {mapSearchInput && (
                  <button
                    type="button"
                    onClick={clearMapSearch}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 absolute right-3 top-1/2 -translate-y-1/2"
                    title="ล้างคำค้นหา"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>

            {/* Satellite / Real Map Area with Working Zoom +/- */}
            <div className="w-full flex-1 min-h-[220px] relative">
              <SatelliteMapView
                selectedClinicName={selectedClinic.name}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onPinClick={() => {
                  setToastMessage(`พิกัด: ${selectedClinic.name} (${selectedClinic.location})`);
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                onSelectOtherClinic={(name) => {
                  const match = clinicData.find((c) => c.name === name);
                  if (match) {
                    setSelectedClinic(match);
                    setMapSearchInput(match.name);
                    setToastMessage(`เลือก: ${match.name}`);
                    setTimeout(() => setToastMessage(null), 2000);
                  }
                }}
              />
            </div>

            {/* Bottom Floating Info Sheet */}
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
                  onClick={handleDirections}
                  className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-teal-50 text-slate-800 active:scale-95 transition-all text-center flex-1 border border-slate-100"
                >
                  <CornerUpRight className="w-4 h-4 stroke-[2.2] text-teal-600" />
                  <span className="text-[11px] font-medium">เส้นทาง</span>
                </button>

                {/* 2. Start Navigation (เริ่ม) */}
                <button
                  type="button"
                  onClick={handleStartNav}
                  className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-800 active:scale-95 transition-all text-center flex-1 border border-slate-100"
                >
                  <Navigation className="w-4 h-4 stroke-[2.2] text-emerald-600" />
                  <span className="text-[11px] font-medium">เริ่ม</span>
                </button>

                {/* 3. Call (โทร) */}
                <button
                  type="button"
                  onClick={() => setShowPhoneModal(true)}
                  className="flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-800 active:scale-95 transition-all text-center flex-1 border border-slate-100"
                >
                  <Phone className="w-4 h-4 stroke-[2.2] text-blue-600" />
                  <span className="text-[11px] font-medium">โทร</span>
                </button>

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

              {/* Realistic Clinic Gallery Thumbnails Carousel */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-700">
                    บรรยากาศภายในคลินิก (แตะเพื่อดูภาพจริง)
                  </span>
                  <span className="text-[10px] text-teal-600 font-medium">
                    {clinicAtmosphereData.length} รูป
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 h-16">
                  {clinicAtmosphereData.map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => setPreviewImage(img)}
                      className="h-full rounded-xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer relative group"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-200"
                        style={{ backgroundImage: `url('${img.url}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                        <span className="text-[8px] font-bold text-white truncate">
                          {img.title.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                  ))}
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

        {/* Fullscreen Atmosphere Photo Preview Lightbox Modal */}
        {previewImage && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl space-y-3 p-4 animate-fade-in text-left">
              <div className="flex items-center justify-between text-white pb-1">
                <div>
                  <h3 className="text-sm font-bold">{previewImage.title}</h3>
                  <span className="text-[11px] text-slate-400">{selectedClinic.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full h-56 rounded-2xl overflow-hidden relative shadow-inner">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${previewImage.url}')` }}
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                ภาพบรรยากาศจริงภายใน {selectedClinic.name} เครื่องมือแพทย์และห้องปลอดเชื้อได้มาตรฐานสากล
              </p>

              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-xs font-medium"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        )}

        {/* Phone Dial Modal */}
        {showPhoneModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-center space-y-3.5 shadow-2xl animate-fade-in border border-blue-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-kanit">
                  โทรติดต่อคลินิก
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedClinic.name}</p>
                <div className="text-lg font-bold text-blue-600 font-mono mt-1">
                  {selectedClinic.tel}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href={`tel:${selectedClinic.tel}`}
                  className="block w-full py-2.5 bg-[#00A877] hover:bg-[#009166] text-white font-medium rounded-full text-xs shadow-md active:scale-95"
                >
                  📞 โทรออกทันที
                </a>
                <button
                  type="button"
                  onClick={() => setShowPhoneModal(false)}
                  className="w-full py-1.5 text-slate-500 text-xs"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Appointment Modal */}
        {bookingModalOpen && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-left space-y-3.5 shadow-2xl animate-fade-in border border-teal-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900 font-kanit">จองคิวตรวจรักษา</h3>
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
