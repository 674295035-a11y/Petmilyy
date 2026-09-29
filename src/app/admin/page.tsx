"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Users,
  Eye,
  TrendingUp,
  Globe,
  Clock,
  RefreshCw,
  BarChart3,
  Activity,
  Shield,
} from "lucide-react";

interface PageStat {
  page_path: string;
  count: number;
}

interface RecentView {
  id: string;
  page_path: string;
  visitor_id: string;
  session_id: string;
  user_email: string;
  referrer: string;
  created_at: string;
}

interface Stats {
  totalPageviews: number;
  uniqueVisitors: number;
  uniqueSessions: number;
  todayPageviews: number;
  todayUniqueVisitors: number;
  topPages: PageStat[];
  recentViews: RecentView[];
  loggedInUsers: number;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "เมื่อกี้";
  if (mins < 60) return `${mins} นาทีที่แล้ว`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} ชั่วโมงที่แล้ว`;
  return `${Math.floor(hrs / 24)} วันที่แล้ว`;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayISO = todayStart.toISOString();

      // All-time stats
      const [allRows, todayRows, recentRows] = await Promise.all([
        supabase.from("page_views").select("page_path, visitor_id, session_id, user_email"),
        supabase.from("page_views").select("page_path, visitor_id").gte("created_at", todayISO),
        supabase
          .from("page_views")
          .select("id, page_path, visitor_id, session_id, user_email, referrer, created_at")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      if (allRows.error) throw new Error(allRows.error.message);

      const all = allRows.data || [];
      const today = todayRows.data || [];
      const recent = recentRows.data || [];

      // Calculate stats
      const uniqueVisitors = new Set(all.map((r) => r.visitor_id).filter(Boolean)).size;
      const uniqueSessions = new Set(all.map((r) => r.session_id).filter(Boolean)).size;
      const loggedInUsers = new Set(all.map((r) => r.user_email).filter(Boolean)).size;
      const todayUniqueVisitors = new Set(today.map((r) => r.visitor_id).filter(Boolean)).size;

      // Top pages
      const pageCounts: Record<string, number> = {};
      all.forEach((r) => {
        pageCounts[r.page_path] = (pageCounts[r.page_path] || 0) + 1;
      });
      const topPages: PageStat[] = Object.entries(pageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([page_path, count]) => ({ page_path, count }));

      setStats({
        totalPageviews: all.length,
        uniqueVisitors,
        uniqueSessions,
        todayPageviews: today.length,
        todayUniqueVisitors,
        topPages,
        recentViews: recent as RecentView[],
        loggedInUsers,
      });
      setLastRefreshed(new Date());
    } catch (err: any) {
      setError(err?.message || "ไม่สามารถดึงข้อมูลได้ กรุณาตรวจสอบตาราง page_views ใน Supabase");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // auto-refresh every 60s
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">PETMILY Admin</h1>
              <p className="text-xs text-slate-400">Pageview Analytics Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastRefreshed && (
              <span className="text-xs text-slate-500 hidden sm:block">
                อัปเดต: {lastRefreshed.toLocaleTimeString("th-TH")}
              </span>
            )}
            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 text-sm font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              รีเฟรช
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Error */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-900/40 border border-rose-500/40 text-rose-300 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Stat Cards */}
        {isLoading && !stats ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-800/60 animate-pulse border border-slate-700/40" />
            ))}
          </div>
        ) : stats ? (
          <>
            {/* Main KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Unique Visitors */}
              <div className="col-span-2 sm:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/25 relative overflow-hidden">
                <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-xs text-orange-300 font-semibold uppercase tracking-wide mb-1">Unique Visitors</p>
                <p className="text-4xl font-extrabold text-white">{formatNumber(stats.uniqueVisitors)}</p>
                <p className="text-xs text-slate-400 mt-1">ผู้เข้าชมทั้งหมด (ไม่ซ้ำเครื่อง)</p>
              </div>

              {/* Total Pageviews */}
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs text-slate-400 mb-1">Pageviews ทั้งหมด</p>
                <p className="text-3xl font-bold text-white">{formatNumber(stats.totalPageviews)}</p>
              </div>

              {/* Sessions */}
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center mb-2">
                  <Activity className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-xs text-slate-400 mb-1">Sessions ทั้งหมด</p>
                <p className="text-3xl font-bold text-white">{formatNumber(stats.uniqueSessions)}</p>
              </div>

              {/* Today Pageviews */}
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400 mb-1">Pageviews วันนี้</p>
                <p className="text-3xl font-bold text-white">{formatNumber(stats.todayPageviews)}</p>
              </div>

              {/* Today Unique */}
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center mb-2">
                  <Globe className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-xs text-slate-400 mb-1">Visitors วันนี้</p>
                <p className="text-3xl font-bold text-white">{formatNumber(stats.todayUniqueVisitors)}</p>
              </div>

              {/* Logged In Users */}
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4 text-rose-400" />
                </div>
                <p className="text-xs text-slate-400 mb-1">ผู้ใช้ที่ล็อกอิน</p>
                <p className="text-3xl font-bold text-white">{formatNumber(stats.loggedInUsers)}</p>
              </div>
            </div>

            {/* Top Pages */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-orange-400" />
                <h2 className="text-sm font-bold text-white">หน้าที่มีคนเข้าชมมากที่สุด</h2>
              </div>
              <div className="space-y-2">
                {stats.topPages.map((page, i) => {
                  const maxCount = stats.topPages[0]?.count || 1;
                  const pct = Math.round((page.count / maxCount) * 100);
                  return (
                    <div key={page.page_path} className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 w-4 shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-medium text-slate-200 truncate">
                            {page.page_path}
                          </span>
                          <span className="text-xs text-slate-400 ml-2 shrink-0">{formatNumber(page.count)}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Views */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/40">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-teal-400" />
                <h2 className="text-sm font-bold text-white">การเข้าชมล่าสุด (Real-time)</h2>
              </div>
              <div className="space-y-2">
                {stats.recentViews.length === 0 ? (
                  <p className="text-xs text-slate-500">ยังไม่มีข้อมูลการเข้าชม</p>
                ) : (
                  stats.recentViews.map((view) => (
                    <div
                      key={view.id}
                      className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0 gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                          <div className="w-2 h-2 rounded-full bg-orange-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-200 truncate">{view.page_path}</p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {view.user_email ? `👤 ${view.user_email}` : `🔑 ${(view.visitor_id || "unknown").slice(0, 14)}...`}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">{timeAgo(view.created_at)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : null}

        <p className="text-center text-xs text-slate-600 pb-4">
          PETMILY Admin Panel • ข้อมูลจาก Supabase • อัปเดตอัตโนมัติทุก 60 วินาที
        </p>
      </div>
    </div>
  );
}
