import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function MonthBarChart() {
  const data = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    deep: 20 + Math.random() * 20,
    light: 30 + Math.random() * 30,
    rem: 15 + Math.random() * 15,
    wake: Math.random() * 5,
    active: i === 12 
  }));

  return (
    <div className="relative h-[220px] w-full mt-6 px-2">
      <div className="absolute top-0 right-2 text-[12px] text-slate-500 flex items-center font-medium bg-slate-50 px-2 py-1 rounded-md">
        6 小时 35 分钟 <Info size={14} className="ml-1.5 opacity-70" />
      </div>
      <div className="absolute inset-0 top-10 bottom-8 border-b border-slate-200/60 z-0">
        <div className="w-full h-px bg-slate-100 absolute top-[50%]"></div>
      </div>
      <div className="absolute inset-0 top-10 bottom-8 flex justify-between items-end px-3 z-10">
        {data.map((d, i) => (
          <div key={i} className="w-[3%] h-full flex items-end justify-center cursor-pointer group">
            <div className={`w-[4px] rounded-full overflow-hidden flex flex-col justify-end transition-all duration-300 ${d.active ? 'opacity-100 scale-110 shadow-sm' : 'opacity-40 group-hover:opacity-80'}`} style={{ height: `${(d.deep + d.light + d.rem + d.wake) * 0.8}%` }}>
              <div style={{ height: `${(d.wake / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#FE7A6B] w-full"></div>
              <div style={{ height: `${(d.rem / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#F75185] w-full"></div>
              <div style={{ height: `${(d.light / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#B44DFB] w-full"></div>
              <div style={{ height: `${(d.deep / (d.deep + d.light + d.rem + d.wake)) * 100}%` }} className="bg-[#7B24F4] w-full"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-1 left-0 right-0 flex justify-between px-3 text-[11px] text-slate-400 font-medium">
        <span>1/6</span>
        <span className="text-[#7B24F4] font-bold">1/13</span>
        <span>1/20</span>
        <span>1/27</span>
      </div>
    </div>
  );
}
