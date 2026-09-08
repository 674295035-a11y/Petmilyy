"use client";

import React from "react";

interface FloralCatAvatarProps {
  size?: number;
  className?: string;
}

export const FloralCatAvatar: React.FC<FloralCatAvatarProps> = ({
  size = 64,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="cushionGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9F2" />
            <stop offset="70%" stopColor="#F5E8D8" />
            <stop offset="100%" stopColor="#EAD8C3" />
          </radialGradient>
          <clipPath id="innerCircleClip">
            <circle cx="100" cy="100" r="76" />
          </clipPath>
        </defs>

        {/* Outer Wreath Background Glow */}
        <circle cx="100" cy="100" r="94" fill="#FCF8F3" />

        {/* Inner Photo Circle */}
        <g clipPath="url(#innerCircleClip)">
          {/* Knit Texture Bed */}
          <rect width="200" height="200" fill="url(#cushionGrad)" />
          {/* Soft blanket creases */}
          <path d="M 20 140 Q 60 120 100 145 T 180 130" stroke="#DFCDBC" strokeWidth="3" fill="none" opacity="0.4" />
          <path d="M 10 165 Q 70 145 120 170 T 195 155" stroke="#DFCDBC" strokeWidth="4" fill="none" opacity="0.3" />
          <path d="M 30 70 Q 70 50 110 75" stroke="#DFCDBC" strokeWidth="2.5" fill="none" opacity="0.35" />

          {/* Curled Sleeping Scottish Fold Body */}
          <ellipse cx="100" cy="108" rx="60" ry="46" fill="#D8BEA3" />
          <ellipse cx="98" cy="104" rx="54" ry="40" fill="#E6D3BF" />
          <ellipse cx="96" cy="100" rx="46" ry="34" fill="#F3E5D5" />

          {/* Fluffy Tail */}
          <path
            d="M 152 108 C 166 128 138 152 105 150 C 70 148 55 132 58 116"
            stroke="#CBB093"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M 152 108 C 164 126 138 148 107 147"
            stroke="#DFC9B2"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* Sleeping Cat Head */}
          <circle cx="118" cy="85" r="32" fill="#D8BEA3" />
          <circle cx="118" cy="86" r="29" fill="#EBD9C7" />
          <ellipse cx="118" cy="90" rx="23" ry="18" fill="#F7EDE3" />

          {/* Scottish Fold Ears (Folded Forward) */}
          <path d="M 98 67 Q 104 56 112 64 Z" fill="#C5AA8E" />
          <path d="M 132 63 Q 140 55 146 66 Z" fill="#C5AA8E" />
          <path d="M 100 68 Q 105 60 110 65 Z" fill="#E4BAAD" />
          <path d="M 133 65 Q 138 59 143 67 Z" fill="#E4BAAD" />

          {/* Peaceful Closed Eyes (Curved Lines) */}
          <path d="M 107 85 Q 112 89 117 85" stroke="#755B49" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 125 85 Q 130 89 135 85" stroke="#755B49" strokeWidth="2.4" strokeLinecap="round" />

          {/* Cute Nose and Whisker Pads */}
          <polygon points="120,91 124,91 122,94" fill="#EAA5A5" />
          <path d="M 120 94 Q 122 96.5 124 94" stroke="#B08383" strokeWidth="1.4" fill="none" />
          
          {/* Subtle Whiskers */}
          <path d="M 108 92 L 96 90" stroke="#BA9F8B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M 108 95 L 94 96" stroke="#BA9F8B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M 134 92 L 146 90" stroke="#BA9F8B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M 134 95 L 148 96" stroke="#BA9F8B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* Rosy Cheeks */}
          <circle cx="106" cy="90" r="4.5" fill="#FBAEAE" opacity="0.5" />
          <circle cx="136" cy="90" r="4.5" fill="#FBAEAE" opacity="0.5" />

          {/* Curled Paws */}
          <ellipse cx="102" cy="118" rx="10" ry="7" fill="#FBF5EE" />
          <ellipse cx="90" cy="114" rx="8" ry="6" fill="#FBF5EE" />
          <path d="M 99 119 L 101 122 M 103 119 L 105 122" stroke="#DFCABC" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Outer Circular Floral Wreath */}
        <circle cx="100" cy="100" r="76" stroke="#E3C3A8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
        
        {/* Flower Buds and Leaves around the perimeter */}
        {/* Top Flowers */}
        <circle cx="100" cy="18" r="4" fill="#F8A5A5" />
        <circle cx="94" cy="22" r="3" fill="#FDCBCB" />
        <circle cx="106" cy="22" r="3" fill="#FDCBCB" />
        <path d="M 88 24 Q 92 18 96 23" fill="#A8CEAB" />
        <path d="M 112 24 Q 108 18 104 23" fill="#A8CEAB" />

        {/* Top Right Flowers */}
        <circle cx="155" cy="45" r="4.5" fill="#F7B267" />
        <circle cx="160" cy="40" r="3" fill="#FDE2C3" />
        <path d="M 148 48 Q 152 42 155 48" fill="#9BC89E" />
        <circle cx="178" cy="85" r="4" fill="#F59292" />
        <circle cx="182" cy="92" r="3" fill="#F8C0C0" />

        {/* Bottom Right Flowers */}
        <circle cx="168" cy="148" r="5" fill="#E896B2" />
        <circle cx="162" cy="154" r="3.5" fill="#FAD1DF" />
        <circle cx="174" cy="154" r="3.5" fill="#FAD1DF" />
        <path d="M 154 158 Q 160 164 158 152" fill="#8EBF92" />

        {/* Bottom Flowers */}
        <circle cx="100" cy="182" r="4.5" fill="#F58B8B" />
        <circle cx="94" cy="178" r="3" fill="#FBC1C1" />
        <circle cx="106" cy="178" r="3" fill="#FBC1C1" />
        <circle cx="100" cy="174" r="2.5" fill="#FCE5A2" />
        <path d="M 86 176 Q 92 182 88 172" fill="#9BC89E" />
        <path d="M 114 176 Q 108 182 112 172" fill="#9BC89E" />

        {/* Bottom Left Flowers */}
        <circle cx="38" cy="145" r="4.5" fill="#F7A072" />
        <circle cx="32" cy="140" r="3" fill="#FDD6C4" />
        <circle cx="44" cy="140" r="3" fill="#FDD6C4" />
        <path d="M 44 152 Q 38 158 40 146" fill="#8EBF92" />

        {/* Top Left Flowers */}
        <circle cx="45" cy="55" r="5" fill="#EE92A6" />
        <circle cx="39" cy="50" r="3.5" fill="#F8CBD5" />
        <circle cx="51" cy="50" r="3.5" fill="#F8CBD5" />
        <circle cx="45" cy="45" r="2.5" fill="#FFF2B2" />
        <path d="M 52 62 Q 58 56 56 68" fill="#9BC89E" />
      </svg>
    </div>
  );
};

export const GoldenRetrieverAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="meadowGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E2F4D9" />
            <stop offset="55%" stopColor="#BCE6A8" />
            <stop offset="100%" stopColor="#7EBA68" />
          </radialGradient>
        </defs>

        {/* Meadow Green Background */}
        <circle cx="100" cy="100" r="100" fill="url(#meadowGrad)" />
        {/* Grass elements */}
        <path d="M 20 180 Q 40 140 50 190" stroke="#5E9647" strokeWidth="4" strokeLinecap="round" />
        <path d="M 150 180 Q 165 135 175 185" stroke="#5E9647" strokeWidth="4" strokeLinecap="round" />

        {/* Golden Body */}
        <ellipse cx="100" cy="170" rx="65" ry="45" fill="#E8B45E" />
        <ellipse cx="100" cy="165" rx="50" ry="35" fill="#F3CA80" />

        {/* Flop Ears Behind Head */}
        <ellipse cx="48" cy="95" rx="20" ry="38" fill="#C98F39" transform="rotate(-18 48 95)" />
        <ellipse cx="152" cy="95" rx="20" ry="38" fill="#C98F39" transform="rotate(18 152 95)" />

        {/* Golden Head */}
        <circle cx="100" cy="98" r="54" fill="#E8B45E" />
        <circle cx="100" cy="96" r="48" fill="#F3C87A" />

        {/* Forehead Stripe */}
        <ellipse cx="100" cy="74" rx="14" ry="24" fill="#FDE7BD" />

        {/* Happy Shiny Eyes */}
        <circle cx="78" cy="88" r="7" fill="#2D2115" />
        <circle cx="76" cy="86" r="2.5" fill="#FFFFFF" />
        <circle cx="122" cy="88" r="7" fill="#2D2115" />
        <circle cx="120" cy="86" r="2.5" fill="#FFFFFF" />

        {/* Snout */}
        <ellipse cx="100" cy="115" rx="26" ry="20" fill="#FDE5B9" />
        {/* Black Nose */}
        <path
          d="M 90 106 C 90 102 110 102 110 106 C 110 114 90 114 90 106 Z"
          fill="#221A13"
        />
        <circle cx="97" cy="105" r="1.5" fill="#888" />
        {/* Mouth & Tongue */}
        <path d="M 100 110 L 100 118" stroke="#221A13" strokeWidth="2.5" />
        <path d="M 90 118 Q 100 126 110 118" stroke="#221A13" strokeWidth="2.5" fill="none" />
        <path d="M 94 121 Q 100 134 106 121 Z" fill="#F47A8E" />
      </svg>
    </div>
  );
};

export const VetDoctorAvatar: React.FC<{
  type: "da" | "donut" | "veerapon";
  size?: number;
  className?: string;
}> = ({ type, size = 60, className = "" }) => {
  if (type === "veerapon") {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-teal-200 bg-teal-50 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} className="w-full h-full">
          <rect width="100" height="100" fill="#E8F4F8" />
          {/* Male Vet with Stethoscope */}
          <circle cx="50" cy="40" r="22" fill="#F5CBA7" />
          {/* Short Dark Hair */}
          <path d="M 28 36 Q 50 14 72 36 Q 50 24 28 36 Z" fill="#2C3E50" />
          {/* Eyes & Smile */}
          <circle cx="43" cy="38" r="2.2" fill="#2C3E50" />
          <circle cx="57" cy="38" r="2.2" fill="#2C3E50" />
          <path d="M 45 47 Q 50 51 55 47" stroke="#935116" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* White Doctor Coat & Shirt */}
          <path d="M 24 95 L 24 75 Q 50 62 76 75 L 76 95 Z" fill="#FFFFFF" stroke="#D5D8DC" strokeWidth="1" />
          <path d="M 42 66 L 50 82 L 58 66 Z" fill="#3498DB" />
          {/* Stethoscope */}
          <path d="M 36 68 Q 36 88 50 88 Q 64 88 64 68" stroke="#7F8C8D" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="88" r="4" fill="#BDC3C7" stroke="#7F8C8D" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (type === "donut") {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-amber-200 bg-amber-50 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#FFF8EE" />
          <circle cx="50" cy="50" r="44" stroke="#F5CBA7" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          {/* Female Vet with curly brown hair */}
          {/* Hair background */}
          <circle cx="50" cy="42" r="26" fill="#6E473B" />
          <circle cx="34" cy="46" r="10" fill="#6E473B" />
          <circle cx="66" cy="46" r="10" fill="#6E473B" />
          {/* Face */}
          <circle cx="50" cy="44" r="18" fill="#FADBD8" />
          {/* Front Curls */}
          <circle cx="40" cy="30" r="7" fill="#6E473B" />
          <circle cx="50" cy="28" r="7" fill="#6E473B" />
          <circle cx="60" cy="30" r="7" fill="#6E473B" />
          {/* Face Features */}
          <circle cx="44" cy="42" r="2" fill="#3E2723" />
          <circle cx="56" cy="42" r="2" fill="#3E2723" />
          <circle cx="40" cy="46" r="2.5" fill="#F1948A" opacity="0.6" />
          <circle cx="60" cy="46" r="2.5" fill="#F1948A" opacity="0.6" />
          <path d="M 46 50 Q 50 53 54 50" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* White Vet Coat */}
          <path d="M 26 95 L 26 74 Q 50 64 74 74 L 74 95 Z" fill="#FFFFFF" stroke="#E5E7E9" strokeWidth="1" />
          <path d="M 44 68 L 50 78 L 56 68 Z" fill="#F9E79F" />
        </svg>
      </div>
    );
  }

  // Dr. Da (Default)
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-rose-200 bg-rose-50 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#FDF2E9" />
        <circle cx="50" cy="50" r="44" stroke="#EDBB99" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        {/* Female Vet with Long Auburn Hair & Floral Crown */}
        <ellipse cx="50" cy="52" rx="24" ry="30" fill="#A04000" />
        <circle cx="50" cy="42" r="18" fill="#FDEBD0" />
        {/* Hair bangs */}
        <path d="M 33 38 Q 50 25 67 38 Q 50 32 33 38 Z" fill="#873600" />
        {/* Floral Crown on Head */}
        <circle cx="40" cy="28" r="3" fill="#F1948A" />
        <circle cx="48" cy="26" r="3.5" fill="#F7DC6F" />
        <circle cx="56" cy="26" r="3" fill="#BB8FCE" />
        <circle cx="62" cy="29" r="2.5" fill="#85C1E9" />
        {/* Face */}
        <circle cx="44" cy="41" r="2" fill="#2C3E50" />
        <circle cx="56" cy="41" r="2" fill="#2C3E50" />
        <circle cx="41" cy="45" r="2.5" fill="#F5B7B1" opacity="0.6" />
        <circle cx="59" cy="45" r="2.5" fill="#F5B7B1" opacity="0.6" />
        <path d="M 46 48 Q 50 51 54 48" stroke="#BA4A00" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* White Coat */}
        <path d="M 26 95 L 26 74 Q 50 64 74 74 L 74 95 Z" fill="#FFFFFF" stroke="#E5E7E9" strokeWidth="1" />
        <path d="M 44 68 L 50 78 L 56 68 Z" fill="#D4EFDF" />
      </svg>
    </div>
  );
};

export const PatientAvatar: React.FC<{
  type: "reangmaew" | "tookae" | "shoki";
  size?: number;
  className?: string;
}> = ({ type, size = 52, className = "" }) => {
  if (type === "reangmaew") {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border border-teal-200 bg-white shadow-xs ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#F0FDF4" />
          <circle cx="50" cy="50" r="44" stroke="#86EFAC" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <ellipse cx="50" cy="54" rx="22" ry="18" fill="#5EEAD4" />
          <circle cx="50" cy="40" r="16" fill="#2DD4BF" />
          <polygon points="38,32 44,22 48,32" fill="#0F766E" />
          <polygon points="52,32 56,22 62,32" fill="#0F766E" />
          <circle cx="45" cy="38" r="2" fill="#134E4A" />
          <circle cx="55" cy="38" r="2" fill="#134E4A" />
          <polygon points="49,42 51,42 50,44" fill="#F43F5E" />
          <text x="50" y="82" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F766E">เริงแมว</text>
        </svg>
      </div>
    );
  }

  if (type === "tookae") {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border border-amber-200 bg-white shadow-xs ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#FFFBEB" />
          <circle cx="50" cy="50" r="44" stroke="#FDE68A" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="42" r="18" fill="#FEF3C7" />
          <circle cx="44" cy="40" r="2.5" fill="#78350F" />
          <circle cx="56" cy="40" r="2.5" fill="#78350F" />
          <path d="M 46 46 Q 50 50 54 46" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="28" cy="45" r="4" fill="#F87171" />
          <circle cx="72" cy="45" r="4" fill="#60A5FA" />
          <circle cx="50" cy="20" r="3.5" fill="#FBBF24" />
          <text x="50" y="78" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#B45309">Good Mood</text>
          <text x="50" y="88" textAnchor="middle" fontSize="7" fill="#78350F">Cat House</text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border border-amber-300 bg-white shadow-xs ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#FEF2F2" />
        <circle cx="50" cy="50" r="44" stroke="#FECACA" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
        <rect x="34" y="44" width="32" height="26" rx="6" fill="#D97706" />
        <path d="M 66 50 Q 76 57 66 64" stroke="#D97706" strokeWidth="3.5" fill="none" />
        <circle cx="50" cy="40" r="16" fill="#FDE68A" />
        <ellipse cx="36" cy="38" rx="4" ry="8" fill="#D97706" />
        <ellipse cx="64" cy="38" rx="4" ry="8" fill="#D97706" />
        <circle cx="45" cy="38" r="2" fill="#451A03" />
        <circle cx="55" cy="38" r="2" fill="#451A03" />
        <polygon points="49,42 51,42 50,44" fill="#DC2626" />
        <text x="50" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350F">คุณโชกิ</text>
      </svg>
    </div>
  );
};

export const PetAvatarDisplay: React.FC<{
  avatar?: string;
  photoUrl?: string;
  name?: string;
  size?: number;
  className?: string;
}> = ({ avatar = "cat", photoUrl, name = "Pet", size = 56, className = "" }) => {
  const imageSource = photoUrl || (avatar?.startsWith("data:") || avatar?.startsWith("http") ? avatar : null);

  if (imageSource) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={imageSource}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (avatar === "dog") {
    return <GoldenRetrieverAvatar size={size} className={className} />;
  }

  return <FloralCatAvatar size={size} className={className} />;
};


