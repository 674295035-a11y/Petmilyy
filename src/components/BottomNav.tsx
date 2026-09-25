"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, MessageSquare, User } from "lucide-react";
import { usePetContext } from "@/lib/petContext";

interface BottomNavProps {
  role?: "user" | "vet";
}

export const BottomNav: React.FC<BottomNavProps> = ({ role }) => {
  const pathname = usePathname();
  const { isPremium } = usePetContext();
  const isVet = role === "vet" || pathname.startsWith("/vet");

  // Chat tab only visible for premium users (or those with local saved premium status)
  const showChat =
    isPremium ||
    (typeof window !== "undefined" &&
      localStorage.getItem("petmily_is_premium") === "true");

  const userNavItems = [
    {
      name: "หน้าหลัก",
      href: "/home",
      icon: Home,
      isActive: pathname === "/home" || pathname === "/" || pathname === "/dashboard",
      show: true,
    },
    {
      name: "คลินิก",
      href: "/clinic",
      icon: Building2,
      isActive: pathname.startsWith("/clinic"),
      show: true,
    },
    {
      name: "แชท",
      href: "/chat",
      icon: MessageSquare,
      isActive: pathname.startsWith("/chat") && !pathname.startsWith("/vet"),
      show: showChat,
    },
    {
      name: "โปรไฟล์",
      href: "/profile",
      icon: User,
      isActive:
        pathname.startsWith("/profile") ||
        pathname.startsWith("/expenses") ||
        pathname.startsWith("/history") ||
        pathname.startsWith("/premium"),
      show: true,
    },
  ];

  const vetNavItems = [
    {
      name: "หน้าหลัก",
      href: "/vet/home",
      icon: Home,
      isActive: pathname === "/vet/home" || pathname === "/vet",
      show: true,
    },
    {
      name: "แชท",
      href: "/vet/chat",
      icon: MessageSquare,
      isActive: pathname.startsWith("/vet/chat"),
      show: true,
    },
    {
      name: "โปรไฟล์",
      href: "/vet/profile",
      icon: User,
      isActive: pathname.startsWith("/vet/profile"),
      show: true,
    },
  ];

  const navItems = (isVet ? vetNavItems : userNavItems).filter((item) => item.show);

  return (
    <nav className="w-full bg-[#82D0D6] dark:bg-[#1E293B] border-t border-teal-300/40 dark:border-slate-800 flex items-center justify-around py-2 px-2 select-none z-40 sticky bottom-0 shrink-0 transition-colors duration-200">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              item.isActive
                ? "text-slate-900 dark:text-teal-300 font-bold"
                : "text-slate-700/80 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
            }`}
          >
            <div
              className={`p-1 transition-transform duration-200 ${
                item.isActive ? "scale-110" : "hover:scale-105 active:scale-95"
              }`}
            >
              <Icon
                className="w-6 h-6"
                strokeWidth={item.isActive ? 2.6 : 1.9}
                fill={item.isActive ? "currentColor" : "none"}
              />
            </div>
            <span className="text-[12px] tracking-tight mt-0.5">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
