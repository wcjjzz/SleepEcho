import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function MicroMetric({ label, value, unit, icon, color, bg }) {
  return (
    <div className="flex items-center p-2 rounded-[12px] border border-slate-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all">
       <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center mr-2.5 ${bg} ${color}`}>
         {React.cloneElement(icon, { size: 16, strokeWidth: 2.5 })}
       </div>
       <div className="flex flex-col flex-1">
         <span className="text-[10px] text-slate-500 font-bold leading-none mb-1">{label}</span>
         <div className="flex items-baseline leading-none">
            <span className="text-[15px] font-black text-slate-800 font-mono tracking-tight">{value}</span>
            <span className="text-[9px] text-slate-400 ml-0.5 font-bold">{unit}</span>
         </div>
       </div>
    </div>
  );
}

/* =========================================
   全新现代环形图表 (Modern Donut Chart)
========================================= */
