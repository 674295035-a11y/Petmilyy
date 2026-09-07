import React from "react";

interface PetmilyLogoProps {
  size?: number;
  className?: string;
}

export const PetmilyLogo: React.FC<PetmilyLogoProps> = ({
  size = 220,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 300 300"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-[1.02]"
      >
        {/* Outer Circular Ring */}
        <circle
          cx="150"
          cy="150"
          r="140"
          stroke="#5CB8C1"
          strokeWidth="6"
          fill="#FFFFFF"
        />

        {/* Inner Teal Filled Circle */}
        <circle
          cx="150"
          cy="150"
          r="128"
          fill="#61C0C6"
        />

        {/* Heart background with dog & cat silhouettes & paw */}
        <g id="heart-pet-composition">
          {/* Stylized White Heart Container */}
          <path
            d="M 150 185
               C 130 160, 80 130, 80 92
               C 80 62, 105 45, 132 50
               C 142 52, 147 58, 150 64
               C 153 58, 158 52, 168 50
               C 195 45, 220 62, 220 92
               C 220 130, 170 160, 150 185 Z"
            fill="#FFFFFF"
          />

          {/* Dog Silhouette Cutout (Left side of heart) */}
          <path
            d="M 108 80
               C 112 70, 118 64, 126 62
               C 130 61, 134 64, 133 70
               C 132 75, 128 80, 126 84
               C 130 84, 135 82, 140 85
               C 142 86, 142 90, 139 92
               C 133 96, 128 99, 125 106
               C 123 112, 125 125, 127 135
               C 123 138, 115 142, 110 138
               C 106 135, 107 125, 105 115
               C 103 103, 100 95, 108 80 Z"
            fill="#61C0C6"
          />

          {/* Cat Silhouette Cutout (Right side of heart) */}
          <path
            d="M 192 78
               C 195 70, 192 64, 185 62
               C 181 61, 179 66, 176 72
               C 172 74, 168 76, 165 80
               C 162 84, 163 88, 166 91
               C 170 94, 172 99, 172 106
               C 172 115, 170 125, 168 135
               C 173 138, 180 141, 185 137
               C 189 133, 188 122, 190 112
               C 192 100, 195 90, 192 78 Z"
            fill="#61C0C6"
          />

          {/* Paw Print in the middle */}
          <g transform="translate(150, 142)">
            {/* Main Pad */}
            <path
              d="M -7 0 
                 C -10 5, -8 11, -3 13 
                 C 2 14, 5 14, 8 12 
                 C 11 10, 11 5, 7 0 
                 C 3 -4, -3 -4, -7 0 Z"
              fill="#61C0C6"
            />
            {/* 4 Toes */}
            <ellipse cx="-8" cy="-7" rx="2.5" ry="3.8" transform="rotate(-25 -8 -7)" fill="#61C0C6" />
            <ellipse cx="-2.5" cy="-11" rx="2.6" ry="4" transform="rotate(-8 -2.5 -11)" fill="#61C0C6" />
            <ellipse cx="4.5" cy="-10" rx="2.6" ry="4" transform="rotate(10 4.5 -10)" fill="#61C0C6" />
            <ellipse cx="10" cy="-5" rx="2.5" ry="3.8" transform="rotate(28 10 -5)" fill="#61C0C6" />
          </g>
        </g>

        {/* PETMILY Text */}
        <text
          x="150"
          y="230"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-kanit), 'Fredoka', 'Nunito', 'Segoe UI', sans-serif"
          fontWeight="800"
          fontSize="36"
          letterSpacing="2.5"
        >
          PETMILY
        </text>

        {/* Thai Subtext: เพื่อนซี้สี่ขา */}
        <text
          x="150"
          y="256"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="var(--font-prompt), var(--font-kanit), sans-serif"
          fontWeight="400"
          fontSize="17"
          letterSpacing="0.5"
          opacity="0.95"
        >
          เพื่อนซี้สี่ขา
        </text>
      </svg>
    </div>
  );
};

export default PetmilyLogo;
