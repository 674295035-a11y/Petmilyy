"use client";

import React from "react";

export const ClinicImage: React.FC<{
  type: "neenee" | "thasaan" | "raksat" | "interior1" | "interior2" | "interior3";
  className?: string;
}> = ({ type, className = "" }) => {
  if (type === "neenee") {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-slate-100 ${className}`}>
        {/* Realistic Clinic Storefront Photo */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80')`
        }} />
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
      <div className={`w-full h-full relative overflow-hidden bg-slate-100 ${className}`}>
        {/* Realistic Animal Hospital Photo */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80')`
        }} />
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
      <div className={`w-full h-full relative overflow-hidden bg-slate-100 ${className}`}>
        {/* Realistic Modern Pet Clinic Storefront */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80')`
        }} />
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
      <div className={`w-full h-full relative rounded-xl overflow-hidden shadow-xs border border-slate-200 ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-110 duration-300"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1.5">
          <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
            💻 เคาน์เตอร์เวชระเบียน
          </span>
        </div>
      </div>
    );
  }

  if (type === "interior2") {
    return (
      <div className={`w-full h-full relative rounded-xl overflow-hidden shadow-xs border border-slate-200 ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-110 duration-300"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1.5">
          <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
            💊 คลังยา & อาหารสัตว์
          </span>
        </div>
      </div>
    );
  }

  // interior3
  return (
    <div className={`w-full h-full relative rounded-xl overflow-hidden shadow-xs border border-slate-200 ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-110 duration-300"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1.5">
        <span className="text-white text-[10px] font-bold tracking-tight drop-shadow-md">
          🩺 ห้องตรวจรักษา
        </span>
      </div>
    </div>
  );
};

export const SatelliteMapView: React.FC<{
  selectedClinicName: string;
  onPinClick?: () => void;
  className?: string;
}> = ({ selectedClinicName, onPinClick, className = "" }) => {
  return (
    <div className={`relative w-full h-[380px] bg-slate-900 overflow-hidden select-none ${className}`}>
      {/* Realistic Google Satellite Imagery Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')`,
          filter: "brightness(0.7) contrast(1.2) saturate(1.1)",
        }}
      />

      {/* Satellite Overlay Grid & Road Overlay Vectors */}
      <svg viewBox="0 0 400 400" className="w-full h-full object-cover absolute inset-0 pointer-events-none">
        {/* Semi-transparent Sea / Lagoon overlay on Left */}
        <path
          d="M 0 0 L 110 0 C 130 90, 60 210, 100 330 C 115 370, 90 400, 90 400 L 0 400 Z"
          fill="#0D2B3A"
          opacity="0.65"
        />

        {/* Satellite Road Overlays */}
        <path d="M 50 400 L 135 0" stroke="#F1C40F" strokeWidth="6" opacity="0.8" />
        <path d="M 50 400 L 135 0" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.9" />

        <path d="M 100 230 L 390 175" stroke="#FFFFFF" strokeWidth="5" opacity="0.8" />
        <path d="M 220 400 L 210 175" stroke="#FFFFFF" strokeWidth="4" opacity="0.75" />
        <path d="M 120 110 L 380 65" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.7" />

        {/* Road Label Tags */}
        <g transform="translate(68, 280) rotate(-78)">
          <rect x="-2" y="-10" width="64" height="13" rx="3" fill="#000000" opacity="0.7" />
          <text x="2" y="0" fill="#F1C40F" fontSize="8" fontWeight="bold">ถ.กาญจนวนิช</text>
        </g>

        <g transform="translate(270, 195)">
          <rect x="-2" y="-10" width="60" height="13" rx="3" fill="#000000" opacity="0.7" />
          <text x="2" y="0" fill="#FFFFFF" fontSize="7.5" fontStyle="italic">Saibun Soi 11</text>
        </g>

        {/* Neighboring POI Badges */}
        <g transform="translate(85, 175)">
          <circle cx="0" cy="0" r="4.5" fill="#E67E22" />
          <rect x="8" y="-7" width="90" height="13" rx="3" fill="#000000" opacity="0.7" />
          <text x="12" y="2" fill="#FFFFFF" fontSize="7.5" fontWeight="bold">BUNDAYA SEAFOOD</text>
        </g>

        <g transform="translate(80, 260)">
          <circle cx="0" cy="0" r="4.5" fill="#E91E63" />
          <rect x="8" y="-7" width="85" height="13" rx="3" fill="#000000" opacity="0.7" />
          <text x="12" y="2" fill="#FFFFFF" fontSize="7.5">Sunshine Songkhla</text>
        </g>

        <g transform="translate(225, 185)">
          <circle cx="0" cy="0" r="4" fill="#E67E22" />
          <rect x="7" y="-6" width="55" height="11" rx="2" fill="#000000" opacity="0.7" />
          <text x="10" y="2" fill="#FFFFFF" fontSize="7">ร้านพี่แก้ว</text>
        </g>
      </svg>

      {/* Target Red Map Marker Pin */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-transform hover:scale-110"
        onClick={onPinClick}
      >
        <div className="relative flex flex-col items-center">
          {/* Pulsing Beacon Circle */}
          <div className="w-10 h-10 rounded-full bg-red-500/30 animate-ping absolute -top-1" />
          
          {/* Google Pin Icon */}
          <div className="relative z-10">
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

          {/* Location Name Tag */}
          <div className="mt-1 bg-slate-900/90 text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-lg border border-red-400 whitespace-nowrap flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{selectedClinicName}</span>
          </div>
        </div>
      </div>

      {/* Map Control Buttons (Zoom / Layer Toggle) */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-white/90 text-slate-800 font-bold text-sm shadow-md flex items-center justify-center hover:bg-white active:scale-95"
        >
          +
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-white/90 text-slate-800 font-bold text-sm shadow-md flex items-center justify-center hover:bg-white active:scale-95"
        >
          -
        </button>
      </div>

      {/* Map Satellite Watermark */}
      <div className="absolute bottom-2 right-3 text-[9px] text-white/80 font-medium bg-black/50 px-2 py-0.5 rounded-full z-10">
        🛰️ ภาพถ่ายดาวเทียม Google Satellite
      </div>
    </div>
  );
};
