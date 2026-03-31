import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function MetricRow({ label, value, reference, status, isWarning = false }) {
  const valueParts = value.split(/(\d+(?:\.\d+)?)/).filter(Boolean);

  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-b-0 animate-in fade-in duration-300">
      <div className="flex flex-col">
        <div className="flex items-baseline mb-0.5">
          <span className="text-[15px] text-slate-800 mr-2">{label}</span>
          <span className="text-[15px] text-slate-900 font-medium flex items-baseline">
            {valueParts.map((part, i) => (/\d/.test(part) ? <span key={i} className="font-semibold text-[18px]">{part}</span> : <span key={i} className="text-[13px] mx-[2px] text-slate-700">{part}</span>))}
          </span>
        </div>
        <div className="text-[12px] text-slate-400 font-medium">参考值：{reference}</div>
      </div>
      <div className="flex items-center">
        <span className={`text-[13px] ${isWarning ? 'text-[#F97316]' : 'text-[#22C55E]'}`}>{status}</span>
        <ChevronRight size={14} className="ml-0.5 opacity-30 text-slate-400" />
      </div>
    </div>
  );
}
