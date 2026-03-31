import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function ProfessionalReportSection({ state, onGenerateClick, onNavigate }) {
  if (state === 'none') {
    return (
      <div className="mb-10 relative rounded-[32px] p-[1px] bg-gradient-to-br from-[#7B24F4]/20 to-indigo-100 shadow-[0_8px_30px_rgba(123,36,244,0.06)] overflow-hidden">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[31px] p-7 relative overflow-hidden h-full">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-purple-100/60 to-indigo-50/60 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-[12px] flex items-center justify-center mr-3 text-[#7B24F4] border border-purple-100/50 shadow-inner">
                <FileText size={18} strokeWidth={2.5}/>
              </div>
              <h3 className="text-[17px] font-bold text-slate-800 tracking-wide">生成专业可解释报告</h3>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-6 font-medium">适用于收到阶段提醒后，生成结构化专业报告，以供就医时作为客观多导监测参考。</p>
            <button onClick={onGenerateClick} className="w-full py-4 bg-gradient-to-r from-[#7B24F4] to-[#6366F1] text-white rounded-[20px] text-[16px] font-bold shadow-[0_8px_24px_rgba(123,36,244,0.25)] hover:opacity-90 active:scale-95 transition-all">
              生成报告
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'generating') {
    return (
      <div className="mb-10 bg-white/90 backdrop-blur-xl rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white flex flex-col items-center justify-center h-[160px]">
         <Loader2 size={32} className="text-[#7B24F4] animate-spin mb-4" />
         <p className="text-[15px] font-bold text-slate-700 tracking-wide">正在深度分析睡眠特征...</p>
         <p className="text-[12px] text-slate-400 mt-1.5 font-medium">预计需要 1-2 分钟</p>
      </div>
    );
  }

  return (
    <div className="mb-10 bg-white/90 backdrop-blur-xl rounded-[32px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[17px] font-bold text-slate-800 flex items-center tracking-wide">专业可解释报告 <CheckCircle size={18} className="text-[#10B981] ml-2" strokeWidth={2.5} /></h3>
          <p className="text-[12px] text-slate-400 mt-1.5 font-medium">生成于 今天 08:30</p>
        </div>
        <span className="px-3 py-1 bg-[#ECFDF5] text-[#10B981] text-[11px] font-bold rounded-lg border border-[#D1FAE5]">已生成</span>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onNavigate('professionalReport')} className="flex-[2] py-4 bg-gradient-to-r from-[#7B24F4] to-[#6366F1] text-white rounded-[20px] text-[15px] font-bold shadow-[0_8px_24px_rgba(123,36,244,0.25)] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center">查看专业报告</button>
        <button className="flex-1 py-4 bg-[#F8FAFC] text-slate-600 rounded-[20px] text-[14px] font-bold border border-slate-100 hover:bg-slate-50 transition-colors active:scale-95">历史记录</button>
      </div>
    </div>
  );
}

/* =========================================
   一级 Tab 页面: 灯光中心
========================================= */
