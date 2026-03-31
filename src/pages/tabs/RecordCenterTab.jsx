import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function RecordCenterTab({ onNavigate }) {
  return (
    <div className="min-h-full bg-[#FAFAF9] relative animate-in fade-in">
      <div className="px-5 pt-12 pb-2 flex justify-between items-center sticky top-0 bg-[#FAFAF9]/90 backdrop-blur-md z-30">
        <h1 className="text-[26px] font-bold text-slate-800 tracking-wide">记录</h1>
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 rounded-full active:scale-95 transition-transform">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="px-5 pb-8 pt-4 space-y-6">
        
        <div className="relative rounded-[32px] p-[1px] overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-white shadow-[0_4px_20px_rgba(123,36,244,0.03)]">
          <div className="bg-white/80 backdrop-blur-xl rounded-[31px] p-6 relative overflow-hidden h-full">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-purple-200/50 to-indigo-100/50 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-center relative z-10">
              <div className="flex flex-col flex-1 items-start">
                <span className="text-[11px] text-slate-400 font-semibold mb-1.5 tracking-widest uppercase">当前状态</span>
                <span className="text-[17px] font-bold text-slate-800 flex items-center tracking-tight">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>监测中
                </span>
              </div>
              
              <div className="w-px h-8 bg-slate-200/60 mx-1"></div>
              
              <div className="flex flex-col flex-1 items-center">
                <span className="text-[11px] text-slate-400 font-semibold mb-1.5 tracking-widest uppercase">专业报告</span>
                <span className="text-[17px] font-bold text-slate-800 tracking-tight">3 <span className="text-[12px] font-medium text-slate-400 ml-0.5">份</span></span>
              </div>

              <div className="w-px h-8 bg-slate-200/60 mx-1"></div>

              <div className="flex flex-col flex-1 items-end">
                <span className="text-[11px] text-slate-400 font-semibold mb-1.5 tracking-widest uppercase">方案更新</span>
                <span className="text-[17px] font-bold text-slate-800 tracking-tight">今日</span>
              </div>
            </div>
          </div>
        </div>
        
        <div onClick={() => onNavigate('professionalReport')} className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100/60 transition-all group hover:shadow-[0_12px_40px_rgba(123,36,244,0.06)] cursor-pointer">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-b from-purple-50 to-[#F5F3FF] rounded-[18px] text-[#7B24F4] flex items-center justify-center mr-4 border border-purple-100/50 shadow-inner">
                <FileSearch size={22} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-slate-800 tracking-wide">专业睡眠报告</h3>
                <p className="text-[12px] text-slate-400 mt-0.5 font-medium">已生成 3 份正式报告</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#FAFAFA] to-[#F8FAFC] rounded-[24px] p-5 border border-slate-100/80 mb-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7B24F4] opacity-80"></div>
            <div className="flex justify-between items-center mb-2 pl-1">
              <span className="text-[14px] font-bold text-slate-700">1月13日 监测报告</span>
              <span className="bg-[#ECFDF5] text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded border border-[#D1FAE5]">最新生成</span>
            </div>
            <p className="text-[12px] text-slate-400 font-medium pl-1">今天 08:30 自动生成</p>
          </div>
          
          <div className="w-full flex items-center justify-between pt-1">
            <span className="text-[13px] font-bold text-slate-600 group-hover:text-[#7B24F4] transition-colors">查看全部报告</span>
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-50 transition-colors">
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#7B24F4] transition-colors" />
            </div>
          </div>
        </div>

        <div onClick={() => onNavigate('stageDetail')} className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100/60 transition-all group hover:shadow-[0_12px_40px_rgba(234,88,12,0.06)] cursor-pointer">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-b from-orange-50 to-[#FFF7ED] rounded-[18px] text-[#EA580C] flex items-center justify-center mr-4 border border-[#FFEDD5]/60 shadow-inner">
                <Activity size={22} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-slate-800 tracking-wide">阶段特征预警评估</h3>
                <p className="text-[12px] text-slate-400 mt-0.5 font-medium">连续特征分析与建议</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#FFFCF9] to-white rounded-[24px] p-5 border border-[#FFEDD5]/40 mb-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FB923C] opacity-80"></div>
            <div className="flex justify-between items-center mb-2.5 pl-1">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#EA580C] mr-2 shadow-[0_0_6px_rgba(234,88,12,0.4)]"></span>
                <span className="text-[14px] font-bold text-[#C2410C]">建议关注</span>
              </div>
              <span className="text-[11px] text-[#EA580C]/60 font-bold bg-orange-50 px-2 py-0.5 rounded">1/1 - 1/14</span>
            </div>
            <p className="text-[12px] text-[#9A3412]/80 leading-relaxed font-medium pl-1">
              近期睡眠结构存在波动，提示连续异常。
            </p>
          </div>
          
          <div className="w-full flex items-center justify-between pt-1">
            <span className="text-[13px] font-bold text-slate-600 group-hover:text-[#EA580C] transition-colors">查看预警详情</span>
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#EA580C] transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100/60 transition-all group hover:shadow-[0_12px_40px_rgba(217,119,6,0.06)] cursor-pointer">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-b from-amber-50 to-[#FEFBE8] rounded-[18px] text-[#D97706] flex items-center justify-center mr-4 border border-amber-100/50 shadow-inner">
                <Sun size={22} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-slate-800 tracking-wide">灯光方案记录</h3>
                <p className="text-[12px] text-slate-400 mt-0.5 font-medium">最近于 1月14日 更新</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50/20 to-white rounded-[24px] p-5 border border-amber-100/30 mb-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FBBF24] opacity-80"></div>
            <div className="flex justify-between items-center mb-2.5 pl-1">
              <span className="text-[14px] font-bold text-slate-700">静谧夜晚方案</span>
              <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#DBEAFE]">自动生成</span>
            </div>
            <p className="text-[12px] text-slate-500/90 leading-relaxed font-medium pl-1">
              系统基于近期节律变动生成的助眠配置。
            </p>
          </div>
          
          <div className="w-full flex items-center justify-between pt-1">
            <span className="text-[13px] font-bold text-slate-600 group-hover:text-[#D97706] transition-colors">查看所有方案</span>
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#D97706] transition-colors" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================
   一级 Tab 页面: 报告中心
========================================= */
