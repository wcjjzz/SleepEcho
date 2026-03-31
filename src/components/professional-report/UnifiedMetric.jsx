import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';
import MicroMetric from './MicroMetric';

export default function UnifiedMetric({ label, value, unit, highlight }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-400 font-bold mb-1 tracking-wider">{label}</span>
      <div className="flex items-baseline">
        <span className={`text-[18px] font-black font-mono tracking-tight leading-none ${highlight ? 'text-blue-600' : 'text-slate-800'}`}>{value}</span>
        <span className="text-[10px] text-slate-500 font-medium ml-1">{unit}</span>
      </div>
    </div>
  );
}

// 辅助组件：微观特征卡片 (MicroMetric) - 承担所有指标的紧凑展示
