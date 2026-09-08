"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
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
  X,
  Trash2,
  Download,
  Copy,
  ExternalLink,
} from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import AppHeader from "@/components/AppHeader";
import { usePetContext } from "@/lib/petContext";

interface SavedCard {
  id: string;
  type: "mastercard" | "visa" | "promptpay";
  title: string;
  number: string;
  name: string;
  expiry: string;
  isDefault: boolean;
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsPremium } = usePetContext();
  const plan = searchParams.get("plan") || "monthly";
  const isYearly = plan === "yearly";

  const priceFormatted = isYearly ? "฿ 5,499.00" : "฿ 499.00";
  const planName = isYearly ? "แผนพรีเมียม (รายปี)" : "แผนพรีเมียม (รายเดือน)";

  const [paymentMethod, setPaymentMethod] = useState<"promptpay" | "card" | "banking" | "truemoney">("banking");
  
  // Credit card editable state
  const [cardNumber, setCardNumber] = useState("**** **** **** 5678");
  const [cardName, setCardName] = useState("สมชาย ใจดี");
  const [cardExpiry, setCardExpiry] = useState("12/26");
  const [cardCvc, setCardCvc] = useState("***");
  const [saveCard, setSaveCard] = useState(true);

  // Manage Payment Methods state
  const [showManageModal, setShowManageModal] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showPromptPayModal, setShowPromptPayModal] = useState(false);

  // New Card Form state in modal
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvc, setNewCardCvc] = useState("");

  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: "card-1",
      type: "mastercard",
      title: "Mastercard",
      number: "•••• •••• •••• 5678",
      name: "สมชาย ใจดี",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "visa",
      title: "Visa Card",
      number: "•••• •••• •••• 1234",
      name: "สมชาย ใจดี",
      expiry: "09/27",
      isDefault: false,
    },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto format card number with spaces
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleAddNewCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber.trim() || !newCardName.trim()) return;

    const newId = `card-${Date.now()}`;
    const newCardItem: SavedCard = {
      id: newId,
      type: newCardNumber.startsWith("4") ? "visa" : "mastercard",
      title: newCardNumber.startsWith("4") ? "Visa Card" : "Mastercard",
      number: `•••• •••• •••• ${newCardNumber.slice(-4) || "8888"}`,
      name: newCardName.trim(),
      expiry: newCardExpiry.trim() || "12/28",
      isDefault: false,
    };

    setSavedCards([...savedCards, newCardItem]);
    setCardNumber(`•••• •••• •••• ${newCardNumber.slice(-4) || "8888"}`);
    setCardName(newCardName.trim());
    setCardExpiry(newCardExpiry.trim() || "12/28");
    setPaymentMethod("card");
    setShowAddCardForm(false);
    setShowManageModal(false);

    setToastMessage("เพิ่มบัตรชำระเงินใหม่เรียบร้อยแล้ว ✨");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteCard = (id: string) => {
    setSavedCards(savedCards.filter((c) => c.id !== id));
    setToastMessage("ลบบัตรที่บันทึกแล้ว 🗑️");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handlePay = () => {
    if (paymentMethod === "promptpay") {
      setShowPromptPayModal(true);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsPremium(true);
      setIsProcessing(false);
      setIsSuccessModalOpen(true);
    }, 1200);
  };

  const handleConfirmPromptPayTransfer = () => {
    setShowPromptPayModal(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsPremium(true);
      setIsProcessing(false);
      setIsSuccessModalOpen(true);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8FAFB] dark:bg-[#0B0F17] min-h-full select-none relative transition-colors duration-300">
      
      {/* Top Header */}
      <AppHeader
        backHref="/premium/pricing"
        showLogo={true}
        showBell={true}
        bellCount={2}
      />

      {/* Content Viewport */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-3.5 text-left">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3 bg-teal-50 dark:bg-slate-800 border border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-200 rounded-2xl text-xs flex items-center gap-2 shadow-md animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Order Summary Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative">
          {/* Top Right Price Badge */}
          <div className="absolute top-4 right-4 bg-[#62C0C6] text-slate-900 font-bold px-3 py-1 rounded-xl text-[13px] shadow-xs font-kanit">
            {priceFormatted}
          </div>

          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white font-kanit pr-24">
            {planName}
          </h2>

          <div className="space-y-1.5 mt-2.5 text-[12px] text-slate-700 dark:text-slate-300">
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
          <h3 className="text-[16px] font-bold text-slate-900 dark:text-white font-kanit">
            เลือกวิธีชำระเงิน
          </h3>

          {/* 1. PromptPay */}
          <div
            onClick={() => {
              setPaymentMethod("promptpay");
              setShowPromptPayModal(true);
            }}
            className={`bg-white dark:bg-slate-800 rounded-2xl p-3.5 border cursor-pointer flex items-center gap-3 transition-all ${
              paymentMethod === "promptpay"
                ? "border-teal-400 dark:border-teal-500 shadow-sm ring-1 ring-teal-400"
                : "border-slate-100 dark:border-slate-700 shadow-xs hover:border-slate-200"
            }`}
          >
            {/* Radio Circle */}
            <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center shrink-0">
              {paymentMethod === "promptpay" && (
                <div className="w-2.5 h-2.5 bg-teal-600 rounded-full" />
              )}
            </div>

            {/* PromptPay Logo */}
            <div className="w-10 h-10 rounded-xl bg-[#1A3761] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
              <QrCode className="w-6 h-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-bold text-slate-800 dark:text-white font-kanit flex items-center gap-2">
                <span>PromptPay (QR Code)</span>
                <span className="text-[10px] bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-normal px-2 py-0.5 rounded-full">
                  แตะเพื่อดู QR
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                สแกน QR Code เพื่อชำระเงิน
              </div>
            </div>
          </div>

          {/* 2. Credit / Debit Card (Interactive Editable Inputs) */}
          <div
            onClick={() => setPaymentMethod("card")}
            className={`bg-white dark:bg-slate-800 rounded-2xl p-3.5 border cursor-pointer space-y-3 transition-all ${
              paymentMethod === "card"
                ? "border-teal-400 dark:border-teal-500 shadow-sm ring-1 ring-teal-400"
                : "border-slate-100 dark:border-slate-700 shadow-xs hover:border-slate-200"
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

              <span className="text-[14px] font-bold text-slate-800 dark:text-white font-kanit">
                บัตรเครดิต / เดบิต
              </span>
            </div>

            {/* Editable Card Details Form */}
            <div
              className="space-y-2.5 pt-1 pl-8 text-xs text-slate-700 dark:text-slate-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card Number Input */}
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
                  เลขบัตร
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="**** **** **** 5678"
                  className="w-full py-1 border-b border-slate-300 dark:border-slate-600 bg-transparent font-mono text-[13px] text-slate-800 dark:text-white tracking-wider focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Cardholder Name Input */}
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
                  ชื่อบนบัตร
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="สมชาย ใจดี"
                  className="w-full py-1 border-b border-slate-300 dark:border-slate-600 bg-transparent text-[13px] text-slate-800 dark:text-white font-medium focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Expiry and CVV Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
                    MM/YY
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                    placeholder="12/26"
                    className="w-full py-1 border-b border-slate-300 dark:border-slate-600 bg-transparent font-mono text-[13px] text-slate-800 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-0.5 font-medium">
                    CVC/CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="***"
                    className="w-full py-1 border-b border-slate-300 dark:border-slate-600 bg-transparent font-mono text-[13px] text-slate-800 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span>ชื่อเจ้าของบัตร</span>
                <span className="font-bold text-slate-800 dark:text-white">{cardName || "สมชาย ใจดี"}</span>
              </div>

              {/* Save Card Checkbox */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-400"
                />
                <span className="text-[11px] text-slate-700 dark:text-slate-300">
                  บันทึกบัตรนี้สำหรับการสั่งซื้อครั้งถัดไป
                </span>
              </label>
            </div>
          </div>

          {/* 3. Mobile Banking */}
          <div
            onClick={() => setPaymentMethod("banking")}
            className={`bg-white dark:bg-slate-800 rounded-2xl p-3.5 border cursor-pointer flex items-center gap-3 transition-all ${
              paymentMethod === "banking"
                ? "border-slate-800 dark:border-teal-400 shadow-sm ring-1 ring-slate-800 dark:ring-teal-400"
                : "border-slate-100 dark:border-slate-700 shadow-xs hover:border-slate-200"
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
              <div className="text-[14px] font-bold text-slate-800 dark:text-white font-kanit">
                Mobile Banking
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                โอนเงินผ่าน Mobile Banking
              </div>
            </div>
          </div>

          {/* 4. TrueMoney Wallet */}
          <div
            onClick={() => setPaymentMethod("truemoney")}
            className={`bg-white dark:bg-slate-800 rounded-2xl p-3.5 border cursor-pointer flex items-center gap-3 transition-all ${
              paymentMethod === "truemoney"
                ? "border-teal-400 dark:border-teal-500 shadow-sm ring-1 ring-teal-400"
                : "border-slate-100 dark:border-slate-700 shadow-xs hover:border-slate-200"
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
              <div className="text-[14px] font-bold text-slate-800 dark:text-white font-kanit">
                TrueMoney Wallet
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                ทรูมันนี่ วอเล็ท (TrueMoney Wallet)
              </div>
            </div>
          </div>

          {/* Add / Manage Payment Methods Interactive Button */}
          <button
            type="button"
            onClick={() => setShowManageModal(true)}
            className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.99] transition-all text-center shadow-xs font-kanit cursor-pointer"
          >
            + เพิ่มบัตร/จัดการวิธีชำระเงิน
          </button>
        </div>

      </div>

      {/* Sticky Bottom Total Summary & Pay Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-3.5 flex items-center justify-between shadow-[0_-6px_20px_rgba(0,0,0,0.08)] z-40">
        <div>
          <div className="text-[12px] text-slate-500 dark:text-slate-400">ยอดรวมทั้งสิ้น</div>
          <div className="text-[18px] font-bold text-slate-900 dark:text-white font-kanit leading-tight">
            {priceFormatted}
          </div>
        </div>

        <button
          type="button"
          disabled={isProcessing}
          onClick={handlePay}
          className="py-3 px-8 bg-[#00A877] hover:bg-[#009166] active:scale-95 text-white font-semibold text-[16px] rounded-full shadow-[0_6px_16px_rgba(0,168,119,0.35)] transition-all font-kanit disabled:opacity-60 flex items-center gap-2 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>กำลังชำระ...</span>
            </>
          ) : (
            paymentMethod === "promptpay" ? "เปิด QR พร้อมเพย์" : "ชำระเงิน"
          )}
        </button>
      </div>

      {/* PromptPay QR Code Modal matching Image 2 */}
      {showPromptPayModal && (
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl animate-fade-in border border-teal-200 dark:border-slate-700 text-center relative max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowPromptPayModal(false)}
              className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-slate-100/80 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Navy Header Banner with THAI QR PAYMENT & PromptPay logos */}
            <div className="bg-[#1A3761] py-3.5 px-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-teal-300" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-[12px] font-bold tracking-wider block">THAI QR</span>
                  <span className="text-[10px] text-teal-200 tracking-tight">PAYMENT</span>
                </div>
              </div>
              <div className="bg-white text-[#1A3761] font-bold text-[11px] px-2.5 py-0.5 rounded shadow-xs">
                พร้อมเพย์
              </div>
            </div>

            {/* PromptPay Slip Body */}
            <div className="p-4 space-y-3">
              {/* QR Image */}
              <div className="relative w-48 h-48 mx-auto bg-white p-2 rounded-2xl border-2 border-slate-100 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="/promptpay_qr.png"
                  alt="PromptPay QR Code"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Transfer Details from Image 2 */}
              <div className="space-y-1 text-center">
                <div className="text-[15px] font-bold text-[#0D6E6E] dark:text-teal-300 font-kanit">
                  สแกน QR เพื่อโอนเข้าบัญชี
                </div>
                <div className="text-[14px] font-bold text-slate-900 dark:text-white">
                  ชื่อ: น.ส. รุสณีย์ ยุดา
                </div>
                <div className="text-[12px] font-mono text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5">
                  <span>บัญชี: xxx-x-x2064-x</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText("xxx-x-x2064-x");
                      setToastMessage("คัดลอกเลขบัญชีแล้ว 📋");
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-800"
                    title="คัดลอกเลขบัญชี"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">
                  เลขที่อ้างอิง: 004999073034950
                </div>
                <div className="text-[16px] font-bold text-teal-700 dark:text-teal-300 font-kanit pt-1">
                  ยอดชำระ: {priceFormatted}
                </div>
              </div>

              {/* K+ Banner Footer from Image 2 */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-1.5 px-3 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 font-medium">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">K+</span>
                <span>Accepts all banks | รับเงินได้จากทุกธนาคาร</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleConfirmPromptPayTransfer}
                  className="w-full py-2.5 bg-[#00A877] hover:bg-[#009166] active:scale-95 text-white font-medium rounded-full text-xs shadow-md transition-all font-kanit cursor-pointer"
                >
                  ฉันโอนเงินเรียบร้อยแล้ว
                </button>
                <button
                  type="button"
                  onClick={() => setShowPromptPayModal(false)}
                  className="w-full py-1 text-slate-500 dark:text-slate-400 text-xs"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Manage Payment Methods Modal */}
      {showManageModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-5 text-left space-y-4 shadow-2xl animate-fade-in border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-kanit">
                  จัดการวิธีชำระเงิน
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowManageModal(false);
                  setShowAddCardForm(false);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Saved Cards */}
            {!showAddCardForm ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold">
                          💳
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-slate-800 dark:text-white">
                            {card.title} {card.isDefault && <span className="text-[10px] text-teal-600 dark:text-teal-400 font-normal">(หลัก)</span>}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {card.number} • {card.expiry}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                        title="ลบวิธีชำระเงิน"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Card Button in Modal */}
                <button
                  type="button"
                  onClick={() => setShowAddCardForm(true)}
                  className="w-full py-2.5 bg-teal-50 dark:bg-slate-700 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-slate-600 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-teal-100 transition-all font-kanit cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>เพิ่มบัตรเครดิต / เดบิตใหม่</span>
                </button>
              </div>
            ) : (
              /* Add New Card Form inside Modal */
              <form onSubmit={handleAddNewCardSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    หมายเลขบัตร 16 หลัก
                  </label>
                  <input
                    type="text"
                    required
                    value={newCardNumber}
                    onChange={(e) => setNewCardNumber(e.target.value)}
                    placeholder="เช่น 4111 2222 3333 4444"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ชื่อบนบัตร (ภาษาอังกฤษ)
                  </label>
                  <input
                    type="text"
                    required
                    value={newCardName}
                    onChange={(e) => setNewCardName(e.target.value)}
                    placeholder="เช่น SOMCHAI JAIDEE"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      วันหมดอายุ (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={newCardExpiry}
                      onChange={(e) => setNewCardExpiry(e.target.value)}
                      placeholder="เช่น 12/28"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={newCardCvc}
                      onChange={(e) => setNewCardCvc(e.target.value)}
                      placeholder="เช่น 123"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00A877] hover:bg-[#009166] text-white font-medium rounded-full text-xs shadow-md active:scale-95 transition-all font-kanit cursor-pointer"
                  >
                    บันทึกบัตร
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddCardForm(false)}
                    className="w-full py-1 text-slate-500 dark:text-slate-400 text-xs text-center"
                  >
                    ย้อนกลับ
                  </button>
                </div>
              </form>
            )}

            <button
              type="button"
              onClick={() => {
                setShowManageModal(false);
                setShowAddCardForm(false);
              }}
              className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-full text-xs font-medium"
            >
              เสร็จสิ้น
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-fade-in border border-emerald-200 dark:border-slate-700">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-kanit">
                ชำระเงินสำเร็จ! 🎉
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ขอบคุณที่สมัครสมาชิก {planName}
                <br />
                สิทธิประโยชน์ VIP ของคุณเปิดใช้งานเรียบร้อยแล้ว
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/70 p-3 rounded-2xl text-left text-xs space-y-1.5 text-emerald-800 dark:text-emerald-300">
              <div className="flex justify-between">
                <span>หมายเลขคำสั่งซื้อ:</span>
                <span className="font-mono font-bold">#PM-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>ยอดเงินที่ชำระ:</span>
                <span className="font-bold">{priceFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span>ช่องทางชำระเงิน:</span>
                <span className="font-semibold">
                  {paymentMethod === "promptpay" ? "PromptPay" : paymentMethod === "card" ? "Credit/Debit Card" : "Mobile Banking"}
                </span>
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
