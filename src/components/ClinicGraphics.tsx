"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, Layers, MapPin, Sparkles, Navigation } from "lucide-react";

export interface ClinicAtmosphereImage {
  id: string;
  title: string;
  category: string;
  url: string;
}

export const clinicAtmosphereData: ClinicAtmosphereImage[] = [
  {
    id: "att-1",
    title: "เคาน์เตอร์เวชระเบียน & จุดต้อนรับ",
    category: "Reception",
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "att-2",
    title: "ห้องตรวจรักษาสัตว์ปลอดเชื้อ",
    category: "Examination Room",
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "att-3",
    title: "ห้องผ่าตัดและเครื่องมือทันสมัย",
    category: "Surgery Suite",
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "att-4",
    title: "แผนกผู้ป่วยใน & กรงพักฟื้น",
    category: "Recovery Ward",
    url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
  },
];

export const ClinicImage: React.FC<{
  type: "neenee" | "thasaan" | "raksat" | "interior1" | "interior2" | "interior3" | "interior4";
  className?: string;
  onClick?: () => void;
}> = ({ type, className = "", onClick }) => {
  if (type === "neenee") {
    return (
      <div onClick={onClick} className={`w-full h-full relative overflow-hidden bg-slate-100 ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between p-2">
          <div className="bg-teal-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-max shadow-xs">
            นีเน่แคร์เซ็นเตอร์
          </div>
          <div className="text-white text-[10px] font-medium drop-shadow-sm">
            📍 เมืองสงขลา
          </div>
        </div>
      </div>
    );
  }

  if (type === "thasaan") {
    return (
      <div onClick={onClick} className={`w-full h-full relative overflow-hidden bg-slate-100 ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=500&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between p-2">
          <div className="bg-emerald-700/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-max shadow-xs">
            โรงพยาบาลสัตว์ท่าสะอ้าน
          </div>
          <div className="text-white text-[10px] font-medium drop-shadow-sm">
            📍 เมืองสงขลา
          </div>
        </div>
      </div>
    );
  }

  if (type === "raksat") {
    return (
      <div onClick={onClick} className={`w-full h-full relative overflow-hidden bg-slate-100 ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=500&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between p-2">
          <div className="bg-amber-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-max shadow-xs">
            คลินิกรักษ์สัตว์
          </div>
          <div className="text-white text-[10px] font-medium drop-shadow-sm">
            📍 เมืองสงขลา
          </div>
        </div>
      </div>
    );
  }

  if (type === "interior1") {
    return (
      <div onClick={onClick} className={`w-full h-full relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer group ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-300"
          style={{
            backgroundImage: `url('${clinicAtmosphereData[0].url}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-1.5">
          <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
            💻 จุดต้อนรับ
          </span>
        </div>
      </div>
    );
  }

  if (type === "interior2") {
    return (
      <div onClick={onClick} className={`w-full h-full relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer group ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-300"
          style={{
            backgroundImage: `url('${clinicAtmosphereData[1].url}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-1.5">
          <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
            🩺 ห้องตรวจ
          </span>
        </div>
      </div>
    );
  }

  if (type === "interior3") {
    return (
      <div onClick={onClick} className={`w-full h-full relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer group ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-300"
          style={{
            backgroundImage: `url('${clinicAtmosphereData[2].url}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-1.5">
          <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
            ✂️ ห้องผ่าตัด
          </span>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className={`w-full h-full relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer group ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-300"
        style={{
          backgroundImage: `url('${clinicAtmosphereData[3].url}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-1.5">
        <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
          🐾 ห้องพักฟื้น
        </span>
      </div>
    </div>
  );
};

export const SatelliteMapView: React.FC<{
  selectedClinicName: string;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPinClick?: () => void;
  onSelectOtherClinic?: (name: string) => void;
  className?: string;
}> = ({
  selectedClinicName,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onPinClick,
  onSelectOtherClinic,
  className = "",
}) => {
  const [mapMode, setMapMode] = useState<"satellite" | "real_osm">("real_osm");

  return (
    <div className={`relative w-full h-[380px] bg-slate-900 overflow-hidden select-none ${className}`}>
      
      {/* Map Mode 1: Live Interactive OpenStreetMap Tile Frame */}
      {mapMode === "real_osm" ? (
        <div
          className="w-full h-full transition-transform duration-300 origin-center relative"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <iframe
            title="Real Hospital Map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=100.5750%2C7.1700%2C100.6250%2C7.2100&layer=mapnik&marker=7.1895%2C100.5960`}
            className="w-full h-full border-0 pointer-events-auto"
          />
        </div>
      ) : (
        /* Map Mode 2: Realistic Satellite Imagery View with SVG Road Layers */
        <div
          className="w-full h-full transition-transform duration-300 origin-center relative"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`,
              filter: "brightness(0.7) contrast(1.2) saturate(1.1)",
            }}
          />

          {/* SVG Road Overlays */}
          <svg viewBox="0 0 400 400" className="w-full h-full object-cover absolute inset-0 pointer-events-none">
            <path
              d="M 0 0 L 110 0 C 130 90, 60 210, 100 330 C 115 370, 90 400, 90 400 L 0 400 Z"
              fill="#0D2B3A"
              opacity="0.65"
            />
            <path d="M 50 400 L 135 0" stroke="#F1C40F" strokeWidth="6" opacity="0.8" />
            <path d="M 50 400 L 135 0" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.9" />
            <path d="M 100 230 L 390 175" stroke="#FFFFFF" strokeWidth="5" opacity="0.8" />
            <path d="M 220 400 L 210 175" stroke="#FFFFFF" strokeWidth="4" opacity="0.75" />
            <path d="M 120 110 L 380 65" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.7" />

            <g transform="translate(68, 280) rotate(-78)">
              <rect x="-2" y="-10" width="64" height="13" rx="3" fill="#000000" opacity="0.7" />
              <text x="2" y="0" fill="#F1C40F" fontSize="8" fontWeight="bold">ถ.กาญจนวนิช</text>
            </g>
          </svg>
        </div>
      )}

      {/* Floating Main Hospital Marker Pin */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-transform hover:scale-110 active:scale-95"
        onClick={onPinClick}
      >
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-red-500/30 animate-ping absolute -top-1" />
          <div className="relative z-10 drop-shadow-lg">
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
              <path
                d="M17 0C7.61116 0 0 7.61116 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61116 26.3888 0 17 0Z"
                fill="#EA4335"
                stroke="#B71C1C"
                strokeWidth="1.5"
              />
              <circle cx="17" cy="16" r="6.5" fill="#FFFFFF" />
              <circle cx="17" cy="16" r="3.5" fill="#EA4335" />
            </svg>
          </div>

          <div className="mt-1 bg-slate-900/95 text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-xl border border-red-400 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{selectedClinicName}</span>
          </div>
        </div>
      </div>

      {/* Other Clickable Hospitals nearby */}
      <div
        onClick={() => onSelectOtherClinic && onSelectOtherClinic("นีเน่แคร์เซ็นเตอร์")}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:scale-105 transition-transform"
      >
        <div className="flex items-center gap-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-full border border-teal-400/80 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span>นีเน่แคร์เซ็นเตอร์</span>
        </div>
      </div>

      <div
        onClick={() => onSelectOtherClinic && onSelectOtherClinic("คลินิกรักษ์สัตว์")}
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 cursor-pointer z-10 hover:scale-105 transition-transform"
      >
        <div className="flex items-center gap-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-full border border-amber-400/80 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>คลินิกรักษ์สัตว์</span>
        </div>
      </div>

      {/* Map Control Buttons: Zoom In (+) / Zoom Out (-) & Layer Mode */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-30">
        <button
          type="button"
          onClick={onZoomIn}
          title="ซูมเข้า (+)"
          className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold text-base shadow-lg flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all border border-slate-200"
        >
          +
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          title="ซูมออก (-)"
          className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold text-base shadow-lg flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all border border-slate-200"
        >
          -
        </button>
        <button
          type="button"
          onClick={() => setMapMode(mapMode === "real_osm" ? "satellite" : "real_osm")}
          title="สลับโหมดแผนที่"
          className="w-8 h-8 rounded-xl bg-white text-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all border border-slate-200 mt-1"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Map Watermark & GPS status */}
      <div className="absolute bottom-2 right-3 text-[9px] text-white font-medium bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full z-20 flex items-center gap-1 shadow-sm">
        <span>📍 พิกัดแผนที่จริง</span>
        <span className="text-emerald-400">• สด</span>
      </div>
    </div>
  );
};
