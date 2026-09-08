import React from "react";
import Image from "next/image";

interface PetmilyLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export const PetmilyLogo: React.FC<PetmilyLogoProps> = ({
  size = 220,
  className = "",
  priority = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="PETMILY Logo"
        width={size}
        height={size}
        priority={priority}
        className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
};

export default PetmilyLogo;
