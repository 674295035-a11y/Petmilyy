"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, MessageSquare, User } from "lucide-react";

interface BottomNavProps {
  role?: "user" | "vet";
}

export const BottomNav: React.FC<BottomNavProps> = ({ role }) => {
  const pathname = usePathname();
  const isVet = role === "vet" || pathname.startsWith("/vet");

  const userNavItems = [
    {
      name: "หน้าหลัก",
      href: "/home",
      icon: Home,
      isActive: pathname === "/home" || pathname === "/" || pathname === "/dashboard",
    },
    {
      name: "คลินิก",
      href: "/clinic",
      icon: Building2,
      isActive: pathname.startsWith("/clinic"),
    },
    {
      name: "แชท",
      href: "/chat",
      icon: MessageSquare,
      isActive: pathname.startsWith("/chat") && !pathname.startsWith("/vet"),
    },
    {
      name: "โปรไฟล์",
      href: "/profile",
      icon: User,
      isActive: pathname.startsWith("/profile") || pathname.startsWith("/expenses") || pathname.startsWith("/history") || pathname.startsWith("/premium"),
    },
  ];

  const vetNavItems = [
    {
      name: "หน้าหลัก",
      href: "/vet/home",
      icon: Home,
      isActive: pathname === "/vet/home" || pathname === "/vet",
    },
    {
      name: "แชท",
      href: "/vet/chat",
      icon: MessageSquare,
      isActive: pathname.startsWith("/vet/chat"),
    },
    {
      name: "โปรไฟล์",
      href: "/vet/profile",
      icon: User,
      isActive: pathname.startsWith("/vet/profile"),
    },
  ];

  const navItems = isVet ? vetNavItems : userNavItems;

  return (
    <nav className="w-full bg-[#82D0D6] border-t border-teal-300/40 flex items-center justify-around py-2 px-2 select-none z-40 sticky bottom-0 shrink-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              item.isActive
                ? "text-slate-900 font-bold"
                : "text-slate-700/80 hover:text-slate-900 font-medium"
            }`}
          >
            <div
              className={`p-1 transition-transform duration-200 ${
                item.isActive ? "scale-110" : "hover:scale-105"
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
