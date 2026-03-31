import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function LegendRow({ color, label, value, prefix }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <div className="flex items-center"><div className={`w-1.5 h-1.5 rounded-full mr-2 ${color}`}></div><span className="text-slate-500">{prefix}{label}</span></div>
      <span className="text-slate-700 font-medium tracking-wide">{value}</span>
    </div>
  );
}
