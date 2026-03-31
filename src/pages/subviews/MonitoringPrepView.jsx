import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function MonitoringPrepView({ onBack, onNavigate }) {
  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAF9] absolute top-0 left-0 z-50 animate-in slide-in-from-bottom duration-400 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-indigo-950 via-slate-800 to-[#FAFAF9] -z-10 opacity-90"></div>
      <div className="px-5 pt-12 pb-4 flex items-center relative shrink-0 text-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-white/80 hover:text-white transition-colors"><ArrowLeft size={20} /></button>
        <h2 className="text-lg font-semibold ml-2 tracking-wide">今晚监测准备</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4 pb-8 hide-scrollbar relative z-10">
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full blur-2xl"></div>
          <div className="flex items-center mb-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mr-4 shadow-sm border border-[#D1FAE5]">
              <CheckCircle size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-slate-800 tracking-wide mb-1">今晚已准备就绪</h3>
              <p className="text-[12px] text-slate-500">设备与系统运行正常</p>
            </div>
          </div>
          <div className="bg-[#F8FAFC] rounded-[20px] p-5 space-y-4 border border-slate-100 relative z-10">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500 flex items-center"><Brain size={16} className="mr-2 text-[#8B5CF6]"/> 睡眠头环</span>
              <span className="font-semibold text-slate-700">已连接</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500 flex items-center"><Battery size={16} className="mr-2 text-[#10B981]"/> 当前电量</span>
              <span className="font-bold text-[#10B981]">82% (充足)</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-500 flex items-center"><Activity size={16} className="mr-2 text-[#3B82F6]"/> 信号质量</span>
              <span className="font-semibold text-slate-700">良好</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mr-3">
                <Lightbulb size={18} />
              </div>
              <h4 className="text-[16px] font-bold text-slate-800">智能灯光配置</h4>
            </div>
            <span className="text-[11px] font-medium bg-[#ECFDF5] text-[#10B981] px-2.5 py-1 rounded-md">自动应用开启</span>
          </div>
          <div className="flex items-center justify-between bg-[#F8FAFC] p-4 rounded-[20px] border border-slate-100">
            <div>
              <p className="text-[11px] text-slate-400 mb-1.5 font-medium">今晚生效预设模式</p>
              <p className="text-[14px] font-bold text-slate-700">静谧夜晚 <span className="font-normal text-slate-500 text-[12px] ml-1">(预计 22:30 执行)</span></p>
            </div>
            <Moon size={24} className="text-indigo-300 opacity-80" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#5B21B6] flex items-center justify-center mr-3">
              <Clock size={16} strokeWidth={2.5}/>
            </div>
            <h4 className="text-[16px] font-bold text-slate-800">监测计划安排</h4>
          </div>
          <div className="bg-[#F8FAFC] rounded-[20px] p-5 border border-slate-100">
            <p className="text-[13px] text-slate-600 leading-relaxed">
              入睡后系统将自动开启无感深度监测，明早醒来将自动同步并生成完整的睡眠可解释报告。
            </p>
          </div>
        </div>

        <div className="px-2 mt-2 mb-4">
          <h4 className="text-[12px] font-semibold text-[#64748B] mb-3 ml-1 tracking-widest">睡前贴士</h4>
          <ul className="space-y-3">
            <li className="flex items-start text-[13px] text-[#64748B] font-medium leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 mr-3 shrink-0"></div>
              请确保头环电极紧密贴合前额皮肤
            </li>
            <li className="flex items-start text-[13px] text-[#64748B] font-medium leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 mr-3 shrink-0"></div>
              睡前 30 分钟尽量减少高亮度屏幕使用
            </li>
            <li className="flex items-start text-[13px] text-[#64748B] font-medium leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 mr-3 shrink-0"></div>
              保持卧室内安静舒适的温度
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 p-6 pb-8 flex flex-col gap-3.5 z-50 shrink-0 relative">
        <button className="w-full py-4 bg-[#5B21B6] text-white rounded-[20px] text-[16px] font-semibold shadow-[0_4px_16px_rgba(91,33,182,0.25)] active:scale-95 transition-transform flex items-center justify-center">
          开始监测
        </button>
        <button onClick={onBack} className="w-full py-4 bg-[#F8FAFC] text-slate-600 rounded-[20px] text-[15px] font-medium border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all">
          稍后
        </button>
        <button onClick={() => { onBack(); setTimeout(() => onNavigate('deviceSettings'), 150); }} className="mt-1 text-[13px] text-slate-400 hover:text-slate-600 font-medium transition-colors text-center">
          前往设备与自动化设置 &rarr;
        </button>
      </div>
    </div>
  );
}

/* =========================================
   专业可解释报告独立页
========================================= */
