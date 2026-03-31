import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function ModernSleepStageDonut() {
  const stages = [
    { id: 'wake', label: 'WAKE', percent: 7.3, color: '#FE7A6B' }, 
    { id: 'rem', label: 'REM', percent: 21.6, color: '#F75185' }, 
    { id: 'n1', label: 'N1', percent: 11.1, color: '#D8B4FE' }, 
    { id: 'n2', label: 'N2', percent: 38.8, color: '#B44DFB' }, 
    { id: 'n3', label: 'N3', percent: 21.2, color: '#7B24F4' }  
  ];

  const radius = 38;
  const circumference = 2 * Math.PI * radius; 
  let currentOffset = 0;

  return (
    <div className="flex items-center justify-between px-1">
       {/* 环形图区域 */}
       <div className="relative w-[110px] h-[110px] shrink-0">
         <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="12" />
            {stages.map(stage => {
               const dash = (stage.percent / 100) * circumference;
               // 稍微减去一点长度，制造优美的圆角间隙
               const gap = 3; 
               const strokeDasharray = `${Math.max(0, dash - gap)} ${circumference}`;
               const strokeDashoffset = -currentOffset;
               currentOffset += dash;
               
               return (
                 <circle
                   key={stage.id}
                   cx="50" cy="50" r={radius}
                   fill="none"
                   stroke={stage.color}
                   strokeWidth="12"
                   strokeDasharray={strokeDasharray}
                   strokeDashoffset={strokeDashoffset}
                   strokeLinecap="round"
                   className="transition-all duration-700 ease-in-out hover:opacity-80 cursor-pointer"
                 />
               );
            })}
         </svg>
         
         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mb-0.5">Total</span>
            <span className="text-[18px] font-black text-slate-800 font-mono leading-none tracking-tight">406</span>
            <span className="text-[9px] text-slate-400 font-bold mt-0.5">min</span>
         </div>
       </div>

       {/* 紧凑对齐图例区域 */}
       <div className="flex-1 ml-6 flex flex-col gap-2.5">
          {stages.map(stage => (
             <div key={stage.id} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center">
                   <div className="w-2.5 h-2.5 rounded-full shadow-sm mr-2.5 group-hover:scale-125 transition-transform" style={{ backgroundColor: stage.color }}></div>
                   <span className="text-[11px] text-slate-500 font-bold font-mono tracking-wide">{stage.label}</span>
                </div>
                <span className="text-[12px] font-mono font-black text-slate-700 group-hover:text-blue-600 transition-colors">{stage.percent}%</span>
             </div>
          ))}
       </div>
    </div>
  );
}
