import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function NavItem({ icon, label, isActive, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center justify-center cursor-pointer">
      <div className={`mb-1 transition-colors ${isActive ? 'text-[#7B24F4]' : 'text-slate-400'}`}>
        {React.cloneElement(icon, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
      </div>
      <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-[#7B24F4]' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
}

/* =========================================
   一级 Tab 页面: 首页
========================================= */
