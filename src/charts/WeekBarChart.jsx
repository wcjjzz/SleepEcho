import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function WeekBarChart() {
  const data = [
    { day: '1/6', deep: 30, light: 40, rem: 20, wake: 5 },
    { day: '周二', deep: 35, light: 45, rem: 15, wake: 0 },
    { day: '周三', deep: 25, light: 50, rem: 25, wake: 10 },
    { day: '周四', deep: 40, light: 35, rem: 20, wake: 0 },
    { day: '周五', deep: 20, light: 60, rem: 15, wake: 5 },
    { day: '周六', deep: 45, light: 30, rem: 30, wake: 0 },
    { day: '1/13', deep: 32, light: 42, rem: 26, wake: 0, active: true },
  ];

  return (
    <div className="relative h-[220px] w-full mt-6 px-2">
      <div className="absolute top-0 right-2 text-[12px] text-slate-500 flex items-center font-medium bg-slate-50 px-2 py-1 rounded-md">
        6 小时 46 分钟 <Info size={14} className="ml-1.5 opacity-70" />
      </div>
      <div className="absolute inset-0 top-10 bottom-8 border-b border-slate-200/60 z-0">
        <div className="w-full h-px bg-slate-100 absolute top-[33%]"></div>
        <div className="w-full h-px bg-slate-100 absolute top-[66%]"></div>
      </div>
      <div className="absolute inset-0 top-10 bottom-8 flex justify-between items-end px-6 z-10">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center group cursor-pointer w-[12%] h-full justify-end relative">
            <div className={`absolute inset-0 -mx-1 bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${d.active ? 'opacity-100 bg-purple-50/50' : ''}`}></div>
            <div className={`w-3.5 rounded-full overflow-hidden flex flex-col justify-end transition-all duration-300 z-10 ${d.active ? 'opacity-100 shadow-md' : 'opacity-50 group-hover:opacity-80 scale-95'}`} style={{ height: `${d.deep + d.light + d.rem + d.wake}%` }}>
              <div style={{ height: `${(d.wake / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#FE7A6B] w-full"></div>
              <div style={{ height: `${(d.rem / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#F75185] w-full"></div>
              <div style={{ height: `${(d.light / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#B44DFB] w-full"></div>
              <div style={{ height: `${(d.deep / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#7B24F4] w-full"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 text-[11px] text-slate-400">
        {data.map((d, i) => (
          <div key={i} className="w-[12%] text-center">
            {d.day.includes('/') ? 
              <div className="flex flex-col items-center"><span className="mb-0.5">{d.day}</span><span className={`font-semibold ${d.active ? 'text-[#7B24F4]' : 'text-slate-700'}`}>周一</span></div> 
              : <span className="mt-4 block font-medium">{d.day}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
