"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MessageCircle,
  Syringe,
  Check,
  CreditCard,
  QrCode,
  Smartphone,
  Wallet,
  Plus,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";
  const isYearly = plan === "yearly";

  const priceFormatted = isYearly ? "฿ 5,499.00" : "฿ 499.00";
  const planName = isYearly ? "แผนพรีเมียม (รายปี)" : "แผนพรีเมียม (รายเดือน)";

  const [paymentMethod, setPaymentMethod] = useState<"promptpay" | "card" | "banking" | "truemoney">("banking");
  const [saveCard, setSaveCard] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessModalOpen(true);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] min-h-full select-none relative">
      
      {/* Top Header */}
      <AppHeader
        backHref="/premium/pricing"
        showLogo={true}
        showBell={true}
        bellCount={2}
      />

      {/* Content Viewport */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-3.5 text-left">
        
        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative">
          {/* Top Right Price Badge */}
          <div className="absolute top-4 right-4 bg-[#62C0C6] text-slate-900 font-bold px-3 py-1 rounded-xl text-[13px] shadow-xs font-kanit">
            {priceFormatted}
          </div>

          <h2 className="text-[16px] font-bold text-slate-900 font-kanit pr-24">
            {planName}
          </h2>

          <div className="space-y-1.5 mt-2.5 text-[12px] text-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-sm">💬</span>
              <span>ปรึกษาแพทย์ส่วนตัว 24 ชั่วโมง</span>
            </div>
            <div className="flex items-center gap-2 pl-5">
              <span>ส่วนลดค่ารักษา&ยาพิเศษ 20%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">💉</span>
              <span>ฟรีตรวจสุขภาพ/ฉีดวัคซีนประจำปี</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-[16px] font-bold text-slate-900 font-kanit">
            เลือกวิธีชำระเงิน
          </h3>

          {/* 1. PromptPay */}
          <div
            onClick={() => setPaymentMethod("promptpay")}
            className={`bg-white rounded-2xl p-3.5 border cursor-pointer flex items-center gap-3 transition-all ${
              paymentMethod === "promptpay"
                ? "border-teal-400 shadow-sm ring-1 ring-teal-400"
                : "border-slate-100 shadow-xs hover:border-slate-200"
            }`}
          >
            {/* Radio Circle */}
            <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center shrink-0">
              {paymentMethod === "promptpay" && (
                <div className="w-2.5 h-2.5 bg-teal-600 rounded-full" />
              )}
            </div>

            {/* PromptPay Logo */}
            <div className="w-10 h-10 rounded-xl bg-[#1A3761] text-white flex items-center justify-center shrink-0 font-bold text-xs">
              <QrCode className="w-6 h-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-bold text-slate-800 font-kanit">
                PromptPay (QR Code)
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                สแกน QR Code เพื่อชำระเงิน
              </div>
            </div>
          </div>

          {/* 2. Credit / Debit Card (MasterCard form) */}
          <div
            onClick={() => setPaymentMethod("card")}
            className={`bg-white rounded-2xl p-3.5 border cursor-pointer space-y-3 transition-all ${
              paymentMethod === "card"
                ? "border-teal-400 shadow-sm ring-1 ring-teal-400"
                : "border-slate-100 shadow-xs hover:border-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center shrink-0">
                {paymentMethod === "card" && (
                  <div className="w-2.5 h-2.5 bg-teal-600 rounded-full" />
                )}
              </div>

              {/* MasterCard Icon */}
              <div className="flex items-center -space-x-2 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#EB001B]" />
                <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-80" />
              </div>

              <span className="text-[14px] font-bold text-slate-800 font-kanit">
                บัตรเครดิต / เดบิต
              </span>
            </div>

            {/* Card Details Form */}
            <div className="space-y-2.5 pt-1 pl-8 text-xs text-slate-700">
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">เลขบัตร</label>
                <div className="py-1 border-b border-slate-300 font-mono text-[13px] text-slate-800 tracking-wider">
                  **** **** **** 5678
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">ชื่อบนบัตร</label>
                <div className="py-1 border-b border-slate-300 text-[13px] text-slate-800 font-medium">
                  สมชาย ใจดี
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">MM/YY</label>
                  <div className="py-1 border-b border-slate-300 font-mono text-[13px] text-slate-800">
                    12/26
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">CVC/CVV</label>
                  <div className="py-1 border-b border-slate-300 font-mono text-[13px] text-slate-800">
                    ***
                  </div>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600">
                <span>ชื่อเจ้าของบัตร</span>
                <span className="font-bold text-slate-800">สมชาย ใจดี</span>
              </div>

              {/* Save Card Checkbox */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-400"
                />
                <span className="text-[11px] text-slate-700">
                  บันทึกบัตรนี้สำหรับการสั่งซื้อครั้งถัดไป
                </span>
              </label>
            </div>
          </div>

          {/* 3. Mobile Banking */}
          <div
            onClick={() => setPaymentMethod("banking")}
            className={`bg-white rounded-2xl p-3.5 border cursor-pointer flex items-center gap-3 transition-all ${
              paymentMethod === "banking"
                ? "border-slate-800 shadow-sm ring-1 ring-slate-800"
                : "border-slate-100 shadow-xs hover:border-slate-200"
            }`}
          >
            {/* Checked Circle */}
            <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>

            {/* Bank Logos (KBank & SCB) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#138f2d] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                🌾
              </div>
              <div className="w-8 h-8 rounded-full bg-[#4e2e7f] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                💜
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-bold text-slate-800 font-kanit">
                Mobile Banking
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                โอนเงินผ่าน Mobile Banking
              </div>
            </div>
          </div>

          {/* 4. TrueMoney Wallet */}
          <div
            onClick={() => setPaymentMethod("truemoney")}
            className={`bg-white rounded-2xl p-3.5 border cursor-pointer flex items-center gap-3 transition-all ${
              paymentMethod === "truemoney"
                ? "border-teal-400 shadow-sm ring-1 ring-teal-400"
                : "border-slate-100 shadow-xs hover:border-slate-200"
            }`}
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center shrink-0">
              {paymentMethod === "truemoney" && (
                <div className="w-2.5 h-2.5 bg-teal-600 rounded-full" />
              )}
            </div>

            {/* TrueMoney Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF7A00] to-[#E50000] flex items-center justify-center text-white text-xs font-bold shadow-xs">
              TM
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-bold text-slate-800 font-kanit">
                TrueMoney Wallet
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                ทรูมันนี่ วอเล็ท (TrueMoney Wallet)
              </div>
            </div>
          </div>

          {/* Add / Manage Payment Methods */}
          <button
            type="button"
            className="w-full py-3 bg-white border border-slate-300 rounded-2xl text-[13px] font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.99] transition-all text-center shadow-xs font-kanit"
          >
            + เพิ่มบัตร/จัดการวิธีชำระเงิน
          </button>
        </div>

      </div>

      {/* Sticky Bottom Total Summary & Pay Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-3.5 flex items-center justify-between shadow-[0_-6px_20px_rgba(0,0,0,0.08)] z-40">
        <div>
          <div className="text-[12px] text-slate-500">ยอดรวมทั้งสิ้น</div>
          <div className="text-[18px] font-bold text-slate-900 font-kanit leading-tight">
            {priceFormatted}
          </div>
        </div>

        <button
          type="button"
          disabled={isProcessing}
          onClick={handlePay}
          className="py-3 px-8 bg-[#00A877] hover:bg-[#009166] active:scale-95 text-white font-semibold text-[16px] rounded-full shadow-[0_6px_16px_rgba(0,168,119,0.35)] transition-all font-kanit disabled:opacity-60 flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>กำลังชำระ...</span>
            </>
          ) : (
            "ชำระเงิน"
          )}
        </button>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-fade-in border border-emerald-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 font-kanit">
                ชำระเงินสำเร็จ! 🎉
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ขอบคุณที่สมัครสมาชิก {planName}
                <br />
                สิทธิประโยชน์ VIP ของคุณเปิดใช้งานเรียบร้อยแล้ว
              </p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-2xl text-left text-xs space-y-1.5 text-emerald-800">
              <div className="flex justify-between">
                <span>หมายเลขคำสั่งซื้อ:</span>
                <span className="font-mono font-bold">#PM-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>ยอดเงินที่ชำระ:</span>
                <span className="font-bold">{priceFormatted}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/home"
                className="block w-full py-3 bg-[#00A877] text-white font-medium rounded-full text-sm shadow-md active:scale-95 transition-transform"
              >
                กลับสู่หน้าหลัก
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function PaymentPage() {
  return (
    <MobileFrame>
      <Suspense fallback={<div className="p-8 text-center text-slate-500">กำลังโหลด...</div>}>
        <PaymentContent />
      </Suspense>
    </MobileFrame>
  );
}
