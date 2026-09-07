import Link from "next/link";
import MobileFrame from "@/components/MobileFrame";
import PetmilyLogo from "@/components/PetmilyLogo";

export default function WelcomePage() {
  return (
    <MobileFrame>
      <main className="flex-1 flex flex-col justify-between items-center px-6 py-8 text-center bg-white min-h-full">
        {/* Top Spacer & Header Logo */}
        <div className="w-full flex-1 flex flex-col items-center justify-center pt-8 sm:pt-12">
          <div className="mb-6 transform hover:scale-105 transition-all duration-300">
            <PetmilyLogo size={240} />
          </div>
        </div>

        {/* Role Action Buttons */}
        <div className="w-full max-w-xs space-y-4 mb-10">
          {/* User Login Role */}
          <Link
            href="/login?role=user"
            className="group block w-full bg-white hover:bg-slate-50 border border-slate-100 rounded-full py-3.5 px-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(92,184,193,0.22)] active:scale-[0.98] transition-all duration-200 text-center"
          >
            <div className="text-[13px] text-slate-500 font-normal leading-tight">
              เข้าสู่ระบบสำหรับ
            </div>
            <div className="text-[17px] font-medium text-slate-800 tracking-tight group-hover:text-teal-600 transition-colors">
              สำหรับผู้ใช้งานทั่วไป
            </div>
          </Link>

          {/* Veterinarian Login Role */}
          <Link
            href="/login?role=vet"
            className="group block w-full bg-white hover:bg-slate-50 border border-slate-100 rounded-full py-3.5 px-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(92,184,193,0.22)] active:scale-[0.98] transition-all duration-200 text-center"
          >
            <div className="text-[13px] text-slate-500 font-normal leading-tight">
              เข้าสู่ระบบสำหรับ
            </div>
            <div className="text-[17px] font-medium text-slate-800 tracking-tight group-hover:text-teal-600 transition-colors">
              สำหรับสัตวแพทย์
            </div>
          </Link>
        </div>

        {/* Footer Credits */}
        <footer className="w-full pb-4 pt-2 text-center select-none">
          <p className="text-[12px] text-slate-400 font-normal leading-relaxed">
            จัดทำโดย
            <br />
            นักศึกษาชั้นปีที่ 3 สาขาเทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล
          </p>
        </footer>
      </main>
    </MobileFrame>
  );
}
