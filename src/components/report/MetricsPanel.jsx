import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';
import LegendRow from './LegendRow';
import MetricRow from './MetricRow';

export default function MetricsPanel({ viewMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDay = viewMode === 'day';
  const prefix = isDay ? '' : '日均';
  
  const donutData = isDay 
    ? { deep: 32, light: 42, rem: 26, total: 100 }
    : { deep: 30, light: 45, rem: 25, total: 100 };

  const metricsList = [
    ...(!isDay ? [{ id: 'sleep_time', label: `${prefix}入睡时间`, value: "02:38", reference: "<00:00", status: "偏晚", isWarning: true }] : []),
    { id: 'duration', label: `${prefix}夜间睡眠`, value: "6 小时 46 分钟", reference: "6-10 小时", status: "正常" },
    { id: 'deep_ratio', label: `${prefix}深睡比例`, value: `${donutData.deep}%`, reference: "20-60%", status: "正常" },
    { id: 'light_ratio', label: `${prefix}浅睡比例`, value: `${donutData.light}%`, reference: "<55%", status: "正常" },
    { id: 'rem_ratio', label: `${prefix}快速眼动比例`, value: `${donutData.rem}%`, reference: "10-30%", status: "正常" },
    { id: 'continuity', label: `${prefix}深睡连续性`, value: "74 分", reference: "70-100 分", status: "正常" },
    ...(isDay ? [{ id: 'awake', label: "清醒次数", value: "0 次", reference: "0-1 次", status: "正常" }] : []),
    { id: 'breath', label: `${prefix}呼吸质量`, value: "94 分", reference: "70-100 分", status: "正常" }
  ];

  const visibleMetrics = isExpanded ? metricsList : metricsList.slice(0, 4);

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white mb-6 overflow-hidden transition-all duration-300 relative">
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-indigo-50/60 to-purple-50/40 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center px-4 pt-4 pb-5 border-b border-slate-100/60">
          <div className="w-[72px] h-[72px] relative flex items-center justify-center shrink-0">
            <svg viewBox="0 0 96 96" className="absolute inset-0 w-full h-full transform -rotate-90 filter drop-shadow-sm">
              <circle cx="48" cy="48" r="38" fill="none" stroke="#F8FAFC" strokeWidth="12" />
              <circle cx="48" cy="48" r="38" fill="none" stroke="#B44DFB" strokeWidth="12" />
              <circle cx="48" cy="48" r="38" fill="none" stroke="#7B24F4" strokeWidth="12" strokeDasharray={`${(donutData.deep / donutData.total) * 238.76} 238.76`} strokeLinecap="round" />
              <circle cx="48" cy="48" r="38" fill="none" stroke="#F75185" strokeWidth="12" strokeDasharray={`${(donutData.rem / donutData.total) * 238.76} 238.76`} strokeDashoffset={-((donutData.deep + donutData.light) / donutData.total) * 238.76} strokeLinecap="round" />
            </svg>
            <div className="flex flex-col items-center text-center leading-tight">
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">睡眠</span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">比例</span>
            </div>
          </div>

          <div className="flex-1 ml-6 space-y-3">
             <LegendRow color="bg-[#7B24F4]" label="深睡" value="2 小时 8 分钟" prefix={prefix} />
             <LegendRow color="bg-[#B44DFB]" label="浅睡" value="2 小时 50 分钟" prefix={prefix} />
             <LegendRow color="bg-[#F75185]" label="快速眼动" value="1 小时 48 分钟" prefix={prefix} />
          </div>
        </div>

        <div className="px-5 pb-1 transition-all duration-300">
          {visibleMetrics.map(metric => (
            <MetricRow 
              key={metric.id}
              label={metric.label} 
              value={metric.value} 
              reference={metric.reference}
              status={metric.status} 
              isWarning={metric.isWarning} 
            />
          ))}
        </div>

        <div className="pb-3 pt-2 text-center mt-1">
           <button onClick={() => setIsExpanded(!isExpanded)} className="text-[13px] text-slate-400 hover:text-slate-600 font-bold inline-flex items-center justify-center transition-colors">
             {isExpanded ? '收起' : '更多分析'} <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
           </button>
        </div>
      </div>
    </div>
  );
}
