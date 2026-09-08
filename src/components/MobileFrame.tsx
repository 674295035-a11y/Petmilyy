import React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#EEF2F6] dark:bg-[#0B0F17] selection:bg-teal-200 transition-colors duration-300">
      {/* Responsive Mobile-first Container */}
      <main
        className={`w-full max-w-[430px] min-h-screen bg-white dark:bg-[#111827] sm:shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:sm:shadow-[0_0_40px_rgba(0,0,0,0.5)] sm:border-x sm:border-slate-200/70 dark:sm:border-slate-800 flex flex-col relative overflow-x-hidden transition-colors duration-300 ${className}`}
      >
        {children}
      </main>
    </div>
  );
};

export default MobileFrame;


