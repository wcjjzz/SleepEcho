import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function StartupPage({ onClick }) {
  return (
    <div onClick={onClick} className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 via-indigo-900 to-amber-100 cursor-pointer animate-in fade-in duration-1000">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/20">
          <Moon className="w-12 h-12 text-amber-200" />
        </div>
        <h1 className="text-4xl font-light text-white tracking-wider mb-2">SleepEcho</h1>
        <div className="w-12 h-1 bg-amber-200/50 rounded-full mb-6"></div>
      </div>
      <div className="pb-16 text-center">
        <p className="text-indigo-100/80 text-sm tracking-widest font-light">睡眠监测 · 智能调控 · 长期管理</p>
      </div>
    </div>
  );
}
