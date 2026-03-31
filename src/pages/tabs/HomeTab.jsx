import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function HomeTab({ onNavigate, setActiveTab }) {
  const adviceList = [
    "昨晚入睡偏晚，建议今晚提前进入助眠模式，保证明日精力。",
    "睡前可尝试聆听白噪音，有效遮蔽环境杂音，提升入睡速度。",
    "今日光照充足，褪黑素节律良好，今晚有望获得更优质深睡。"
  ];
  const [adviceIndex, setAdviceIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAdviceIndex((prev) => (prev + 1) % adviceList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [adviceList.length]);

  return (
    <div className="px-5 pt-12 pb-6 animate-in fade-in bg-[#FAFAF9] min-h-full">
      
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-[26px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight mb-1">早上好，Lin</h2>
          <p className="text-[13px] text-slate-500 font-medium">今天也要保持好状态</p>
        </div>
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white flex items-center justify-center relative cursor-pointer active:scale-95 transition-transform">
            <Bell size={18} className="text-slate-700" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#F75185] rounded-full border-2 border-white"></div>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] border-2 border-white">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Lin&backgroundColor=transparent" alt="avatar" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        <div 
          onClick={() => onNavigate('deviceSettings')} 
          className="flex-1 bg-white/80 backdrop-blur-xl px-3 py-2.5 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-white flex items-center cursor-pointer active:scale-95 transition-all group hover:shadow-[0_8px_30px_rgba(123,36,244,0.08)]"
        >
          <div className="w-8 h-8 rounded-[12px] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] flex items-center justify-center mr-2.5 shrink-0 text-[#7B24F4] shadow-inner">
            <Brain size={14} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-bold mb-0.5 leading-none tracking-wide">睡眠头环</p>
            <p className="text-[13px] font-extrabold text-slate-700 leading-none">电量 82%</p>
          </div>
        </div>
        <div 
          onClick={() => onNavigate('deviceSettings')} 
          className="flex-1 bg-white/80 backdrop-blur-xl px-3 py-2.5 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-white flex items-center cursor-pointer active:scale-95 transition-all group hover:shadow-[0_8px_30px_rgba(217,119,6,0.08)]"
        >
          <div className="w-8 h-8 rounded-[12px] bg-gradient-to-br from-amber-50 to-[#FEFBE8] flex items-center justify-center mr-2.5 shrink-0 text-[#D97706] shadow-inner">
            <Lightbulb size={14} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-bold mb-0.5 leading-none tracking-wide">调控灯</p>
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full mr-1.5 shadow-[0_0_6px_rgba(16,185,129,0.6)]"></div>
              <p className="text-[13px] font-extrabold text-[#10B981] leading-none">在线</p>
            </div>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onNavigate('stageDetail')} 
        className="relative bg-gradient-to-r from-[#FFFBF7] to-white rounded-[20px] px-4 py-3 shadow-[0_4px_12px_rgba(234,88,12,0.03)] border border-[#FFEDD5]/60 mb-5 flex items-center cursor-pointer active:scale-95 transition-transform overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FB923C] to-[#EA580C]"></div>
        <div className="relative w-8 h-8 rounded-full bg-[#FFF7ED] flex items-center justify-center mr-3 shrink-0 border border-[#FFEDD5] text-[#EA580C]">
           <div className="absolute inset-0 rounded-full border border-[#EA580C]/30 animate-ping"></div>
           <AlertCircle size={14} strokeWidth={2.5} className="relative z-10" />
        </div>
        <div className="flex-1 overflow-hidden pr-1">
          <div className="flex justify-between items-center mb-0.5">
            <h3 className="text-[14px] font-bold text-[#C2410C] tracking-wide">阶段特征预警评估</h3>
            <ChevronRight size={14} className="text-[#EA580C]/70" />
          </div>
          <p className="text-[11px] text-[#9A3412]/80 font-medium truncate">
            近期存在连续特征异常，建议查看详情。
          </p>
        </div>
      </div>

      <div className="relative rounded-[32px] p-[1px] overflow-hidden bg-gradient-to-br from-slate-700 via-indigo-900 to-slate-900 shadow-[0_12px_40px_rgba(49,46,129,0.15)] mb-5 group cursor-pointer active:scale-[0.98] transition-transform" onClick={() => setActiveTab('report')}>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[31px] px-6 py-5 relative overflow-hidden h-full">
          <div className="absolute -right-12 -top-12 w-56 h-56 bg-gradient-to-br from-[#7B24F4]/40 to-[#B44DFB]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-4">
            <div>
              <p className="text-[#A5B4FC] text-[12px] font-semibold tracking-widest uppercase mb-1">昨夜睡眠得分</p>
              <div className="flex items-baseline">
                <span className="text-[40px] font-extrabold text-white tracking-tighter leading-none">86</span>
                <span className="text-[14px] font-bold text-[#A5B4FC] ml-1.5">分</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#A5B4FC] text-[12px] font-semibold tracking-widest uppercase mb-1">总时长</p>
              <p className="text-[18px] font-bold text-white tracking-wide">7h 12m</p>
            </div>
          </div>

          <div className="w-full h-12 relative mb-4">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
               <defs>
                 <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#B44DFB" stopOpacity="0.5"/>
                   <stop offset="100%" stopColor="#7B24F4" stopOpacity="0"/>
                 </linearGradient>
               </defs>
               <path d="M0,25 C10,25 15,10 25,10 C35,10 40,28 50,28 C60,28 65,15 75,15 C85,15 90,26 100,26 L100,30 L0,30 Z" fill="url(#heroGradient)"/>
               <path d="M0,25 C10,25 15,10 25,10 C35,10 40,28 50,28 C60,28 65,15 75,15 C85,15 90,26 100,26" fill="none" stroke="#D8B4FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               <circle cx="25" cy="10" r="1.5" fill="#fff" />
               <circle cx="50" cy="28" r="1.5" fill="#7B24F4" />
               <circle cx="75" cy="15" r="1.5" fill="#F75185" />
            </svg>
          </div>

          <div className="mb-4 relative z-10 flex flex-col gap-2.5">
            <p className="text-[14px] font-bold text-white tracking-wide">深睡恢复较好，整体状态稳定。</p>
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-0.5">
              <span className="bg-white/10 backdrop-blur-sm text-[#E0E7FF] text-[10px] font-bold px-2 py-1.5 rounded-[8px] border border-white/10 shadow-sm whitespace-nowrap">深睡 2h 08m</span>
              <span className="bg-white/10 backdrop-blur-sm text-[#E0E7FF] text-[10px] font-bold px-2 py-1.5 rounded-[8px] border border-white/10 shadow-sm whitespace-nowrap">REM 1h 48m</span>
              <span className="bg-white/10 backdrop-blur-sm text-[#E0E7FF] text-[10px] font-bold px-2 py-1.5 rounded-[8px] border border-white/10 shadow-sm whitespace-nowrap">清醒 0 次</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-white/10 pt-3.5 relative z-10">
            <span className="text-[12px] font-bold text-[#A5B4FC] tracking-wide">23:15 入睡 - 06:27 唤醒</span>
            <div className="text-[12px] font-extrabold bg-white text-indigo-900 px-3.5 py-1.5 rounded-full flex items-center shadow-[0_4px_12px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-all">
              完整报告 <ArrowRight size={14} className="ml-1" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white/70 backdrop-blur-xl rounded-[20px] px-4 py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-white mb-6 flex items-start overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-purple-100/40 to-transparent pointer-events-none"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center mr-3 shrink-0 shadow-inner border border-white text-[#7B24F4] relative z-10 mt-1">
          <Sparkles size={14} strokeWidth={2.5} />
        </div>
        <div className="flex-1 overflow-hidden h-[54px] relative z-10 pr-1">
          <div 
            className="transition-transform duration-500 ease-in-out flex flex-col" 
            style={{ transform: `translateY(-${adviceIndex * 54}px)` }}
          >
            {adviceList.map((advice, idx) => (
              <div key={idx} className="h-[54px] flex flex-col justify-center">
                <h3 className="text-[13px] font-extrabold text-slate-800 mb-0.5 tracking-wide">今日小贴士</h3>
                <p className="text-[12px] text-slate-500 leading-[1.4] font-medium line-clamp-2">
                  {advice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-2">
        <div 
          onClick={() => onNavigate('monitoringPrep')} 
          className="w-full bg-gradient-to-r from-[#7B24F4] to-[#6366F1] rounded-[24px] py-4 px-5 shadow-[0_8px_24px_rgba(123,36,244,0.25)] flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 backdrop-blur-sm">
              <Moon size={20} className="text-white" strokeWidth={2.5}/>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[16px] font-bold text-white tracking-wide leading-tight">今晚监测准备</span>
              <span className="text-[12px] text-white/80 font-medium mt-0.5">设备与网络已就绪</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-white/80" />
        </div>

        <div className="relative bg-white/90 backdrop-blur-2xl rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-center mb-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-b from-amber-50 to-[#FEFBE8] rounded-[16px] flex items-center justify-center mr-4 text-[#D97706] shadow-inner border border-amber-100/50">
                <Sunrise size={22} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-slate-800 tracking-wide">当前执行方案</h3>
                <p className="text-[13px] font-bold text-[#D97706] mt-0.5">晨间唤醒模式</p>
              </div>
            </div>
            <span className="bg-[#EFF6FF] text-[#2563EB] text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-[#DBEAFE] shadow-sm">自动执行中</span>
          </div>
          
          <div className="relative z-10 bg-slate-50/80 backdrop-blur-md rounded-[20px] p-4 border border-slate-100 mb-5">
            <div className="flex justify-between items-center mb-1.5">
               <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">下一次执行</p>
               <span className="text-[10px] font-bold text-[#7B24F4] bg-purple-50 px-2 py-0.5 rounded">助眠场景</span>
            </div>
            <div className="flex items-center">
              <Moon size={16} className="text-[#7B24F4] mr-2" strokeWidth={2.5}/>
              <span className="text-[15px] font-extrabold text-slate-700">今日 22:30 (静谧夜晚)</span>
            </div>
          </div>

          <p className="relative z-10 text-[13px] text-slate-500 font-medium leading-relaxed mb-5 px-1">
            系统已按近期睡眠特征进行节律更新。你无需手动操作，将于预定时间平滑过渡。
          </p>

          <button onClick={() => setActiveTab('light')} className="relative z-10 w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-50 to-white text-slate-700 rounded-[20px] text-[14px] font-bold border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group">
            <span className="group-hover:text-[#D97706] transition-colors">查看光照联动方案</span>
            <div className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-amber-200 transition-colors">
               <ArrowRight size={14} className="text-slate-400 group-hover:text-[#D97706]" strokeWidth={2.5}/>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}

/* =========================================
   一级 Tab 页面: 记录中心
========================================= */
