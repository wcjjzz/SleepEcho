import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function InterpretationCard({ viewMode }) {
  const summary = viewMode === 'day' 
    ? "睡眠质量良好。然而，入睡时间是 02:38，有些晚。最近 7 天有多天重复发生该问题。晚睡时通常伴随超负荷用眼，容易使眼肌疲劳，长期以往，会导致视力下降。"
    : viewMode === 'week'
    ? "本周睡眠节律较为平稳，但日均入睡时间持续偏晚（均值 02:38）。深睡与浅睡比例保持在健康区间，整体精力恢复尚可。"
    : "本月睡眠结构整体健康，深睡连续性表现优异。但在月中阶段出现了明显的入睡时间后移现象，建议关注夜间作息规律。";

  return (
    <div className="mb-8">
      <h3 className="text-[18px] font-bold text-slate-800 mb-4 ml-1">解读与建议</h3>
      <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100/80">
        <div className="relative pl-3.5 mb-5">
          <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#7B24F4] rounded-full opacity-80"></div>
          <p className="text-[15px] text-slate-700 leading-relaxed font-medium tracking-wide">
            {summary}
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#F5F3FF] to-[#FAFAF9] rounded-[20px] p-4.5 flex items-start border border-[#EDE9FE]">
          <div className="w-8 h-8 bg-white rounded-full text-[#7B24F4] flex items-center justify-center shrink-0 mr-3.5 shadow-[0_2px_8px_rgba(123,36,244,0.12)]">
             <Sparkles size={16} strokeWidth={2.5} />
          </div>
          <div className="pt-0.5">
            <span className="text-[13px] font-bold text-[#7B24F4] mb-1 block">行动建议</span>
            <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
              睡前可尝试聆听白噪音，白噪音在人类可听范围内是均匀分布的，它对于外界影响睡眠的声音变化有遮蔽效应，能够促进入睡，提升睡眠质量。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
