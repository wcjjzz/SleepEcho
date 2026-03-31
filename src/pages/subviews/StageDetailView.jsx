import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';
import ModernRadarChart from '../../components/stage-detail/ModernRadarChart';

export default function StageDetailView({ onBack }) {
  // 14天的状态模拟数据：1=正常(灰), 2=轻度(橙), 3=异常(红)
  const trendData = [1, 1, 2, 3, 3, 2, 1, 3, 3, 3, 3, 2, 3, 3];
  
  return (
    <div className="w-full h-full flex flex-col bg-[#F3F6FA] absolute top-0 left-0 z-[60] animate-in slide-in-from-right duration-400 overflow-hidden font-sans">
      
      {/* 顶部 Header */}
      <div className="bg-white/80 backdrop-blur-xl px-4 pt-12 pb-4 flex items-center border-b border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] shrink-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={22} strokeWidth={2.5}/>
        </button>
        <h2 className="text-[17px] font-bold text-slate-800 ml-2 tracking-wide">阶段特征预警评估</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-20 hide-scrollbar">
        
        {/* 1. 顶部状态卡 (极简网格排版) */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-3xl pointer-events-none -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-50/50 rounded-full blur-2xl pointer-events-none translate-y-8 -translate-x-8"></div>
          
          <div className="flex justify-between items-start mb-5 relative z-10">
            <div>
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 shadow-[0_0_8px_rgba(249,115,22,0.4)] animate-pulse"></div>
                <h3 className="text-[14px] font-bold text-orange-600 tracking-wide uppercase">建议关注风险</h3>
              </div>
              <p className="text-[20px] font-black text-slate-800 tracking-tight">连续特征异常</p>
            </div>
            <div className="bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
               <AlertCircle size={18} className="text-orange-500" strokeWidth={2.5} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-slate-50/50 p-3 rounded-[16px] border border-slate-100/60 relative z-10 mb-4">
            <div className="flex flex-col items-center justify-center border-r border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold mb-0.5">统计周期</span>
              <span className="text-[14px] font-black font-mono text-slate-700">14 天</span>
            </div>
            <div className="flex flex-col items-center justify-center border-r border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold mb-0.5">有效夜晚</span>
              <span className="text-[14px] font-black font-mono text-slate-700">12 晚</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] text-rose-400/80 font-bold mb-0.5">异常触发</span>
              <span className="text-[14px] font-black font-mono text-rose-500">8 晚</span>
            </div>
          </div>

          <p className="text-[12px] text-slate-600 font-medium leading-relaxed relative z-10 px-1">
            系统观察到您的睡眠结构近期出现了连续波动，与特定情绪压力下的弱特征表征存在统计学相似性。
          </p>
        </div>

        {/* 2. 阶段趋势简图 (14天轨迹热力柱) */}
        <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="flex items-center mb-4 pl-1">
             <Target size={14} className="text-slate-400 mr-2" strokeWidth={2.5} />
             <h4 className="text-[13px] font-bold text-slate-700 tracking-wide">近 14 天状态轨迹</h4>
          </div>
          <div className="flex items-end justify-between px-2 h-12 mb-2">
             {trendData.map((val, idx) => {
                const isNormal = val === 1;
                const isMild = val === 2;
                const height = isNormal ? 'h-4' : isMild ? 'h-8' : 'h-12';
                const bg = isNormal ? 'bg-slate-200' : isMild ? 'bg-orange-300' : 'bg-rose-500 shadow-sm';
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 group cursor-default">
                    <div className={`w-[8px] rounded-full transition-all duration-300 ${height} ${bg} group-hover:opacity-80`}></div>
                  </div>
                );
             })}
          </div>
          <div className="flex justify-between px-2 text-[9px] font-bold text-slate-400 font-mono">
            <span>DAY 1</span>
            <span className="text-rose-500">TODAY</span>
          </div>
        </div>

        {/* 3. 阶段特征贡献区 (现代 SVG 雷达图 + 简练总结) */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="bg-slate-50/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 text-purple-500 border border-slate-100">
                 <Activity size={10} strokeWidth={3}/>
              </div>
              <h3 className="text-[13px] font-bold text-slate-800 tracking-wide">
                 异常特征偏离度画像
              </h3>
            </div>
            <span className="text-[9px] font-mono text-slate-400 font-bold border border-slate-200 px-1.5 rounded">MEAN</span>
          </div>
          
          <div className="py-6 flex flex-col items-center bg-white relative">
             {/* 手绘的高级雷达图 */}
             <ModernRadarChart />
          </div>

          <div className="bg-slate-50/50 p-4 border-t border-slate-100">
            <div className="flex items-start">
               <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 mr-2.5 shrink-0"></div>
               <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                 在过去的 12 个有效夜晚中，您的<span className="font-bold text-slate-800">入睡潜伏期</span>显著延长，且 <span className="font-bold text-slate-800">REM 期占比</span>持续偏高，同时慢波睡眠（深睡）受到压缩。
               </p>
            </div>
          </div>
        </div>

        {/* 4. 行动建议区 */}
        <div className="mb-2">
          <h4 className="text-[13px] font-bold text-slate-700 tracking-wide mb-3 ml-1">改善建议</h4>
          <div className="space-y-2.5">
            <div className="bg-white p-3.5 rounded-[16px] border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-start">
               <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0 mr-3">
                 <Sun size={12} strokeWidth={3} />
               </div>
               <div>
                 <h5 className="text-[12px] font-bold text-slate-800 mb-0.5">严格限制睡前蓝光</h5>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">目前已为您自动配置夜间琥珀色暖光，请尽量在睡前 1 小时避免使用电子屏幕以重建褪黑素节律。</p>
               </div>
            </div>
            <div className="bg-white p-3.5 rounded-[16px] border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-start">
               <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mr-3">
                 <Sunrise size={12} strokeWidth={3} />
               </div>
               <div>
                 <h5 className="text-[12px] font-bold text-slate-800 mb-0.5">稳定晨间唤醒时间</h5>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">无论前夜入睡多晚，请在固定时间起床并接受明亮光照，这有助于锚定被打乱的生物钟。</p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================
   全新现代特征偏离雷达图 (Modern Radar Chart)
========================================= */
