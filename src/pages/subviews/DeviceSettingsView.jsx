import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function DeviceSettingsView({ onBack }) {
  const [headbandAuto, setHeadbandAuto] = useState(true);
  const [lightAuto, setLightAuto] = useState(true);
  const [overridePlan, setOverridePlan] = useState(false);
  const [stageWarning, setStageWarning] = useState(true);

  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAF9] absolute top-0 left-0 z-50 animate-in slide-in-from-right duration-300">
      <div className="px-5 pt-12 pb-4 bg-white flex items-center relative border-b border-slate-100 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600"><ArrowLeft size={20} /></button>
        <h2 className="text-lg font-medium text-slate-800 ml-2">设备与自动化设置</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-24 hide-scrollbar">
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between border-b border-slate-50 pb-5 mb-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-[16px] flex items-center justify-center mr-4 text-indigo-500">
                <Brain size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-slate-800 tracking-wide">TH25A 脑电监测头环</h3>
                <p className="text-[11px] text-emerald-500 flex items-center mt-1 font-medium bg-emerald-50 w-fit px-2 py-0.5 rounded-md"><CheckCircle size={12} className="mr-1"/> 已连接</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-slate-500 flex items-center"><Battery size={16} className="mr-2 text-slate-400"/> 当前电量</span>
              <span className="font-semibold text-slate-700">82%</span>
            </div>
            <div className="flex justify-between items-center text-[14px] pt-1">
              <span className="text-slate-700 font-medium">夜间自动启动监测</span>
              <div onClick={() => setHeadbandAuto(!headbandAuto)} className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${headbandAuto ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${headbandAuto ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-[#F8FAFC] hover:bg-slate-100 text-indigo-600 rounded-[16px] text-[14px] font-semibold transition-colors border border-slate-100">
              重新连接
            </button>
            <button className="flex-1 py-3 bg-[#F8FAFC] hover:bg-slate-100 text-slate-500 rounded-[16px] text-[14px] font-medium transition-colors border border-slate-100">
              解除绑定
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between border-b border-slate-50 pb-5 mb-5">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-50/80 rounded-[16px] flex items-center justify-center mr-4 text-amber-500">
                <Lightbulb size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-slate-800 tracking-wide">SleepEcho 智能调控灯</h3>
                <p className="text-[11px] text-emerald-500 flex items-center mt-1 font-medium bg-emerald-50 w-fit px-2 py-0.5 rounded-md"><CheckCircle size={12} className="mr-1"/> 在线</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-slate-500 flex items-center"><Sun size={16} className="mr-2 text-slate-400"/> 当前模式</span>
              <span className="font-semibold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-lg">晨间唤醒</span>
            </div>
            <div className="flex justify-between items-center text-[14px] pt-1">
              <span className="text-slate-700 font-medium">自动应用夜间光照方案</span>
              <div onClick={() => setLightAuto(!lightAuto)} className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${lightAuto ? 'bg-[#22C55E]' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${lightAuto ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-[#F8FAFC] hover:bg-slate-100 text-[#D97706] rounded-[16px] text-[14px] font-semibold transition-colors border border-slate-100">
              测试灯光
            </button>
            <button className="flex-1 py-3 bg-[#F8FAFC] hover:bg-slate-100 text-slate-500 rounded-[16px] text-[14px] font-medium transition-colors border border-slate-100">
              解除绑定
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <h3 className="text-[16px] font-bold text-slate-800 mb-5">自动化与偏好设置</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="pr-4">
                <p className="text-[14px] font-medium text-slate-800 mb-1">手动调节后允许方案覆盖</p>
                <p className="text-[12px] text-slate-400 leading-snug">下次方案触发时自动覆盖您的手动设置</p>
              </div>
              <div onClick={() => setOverridePlan(!overridePlan)} className={`w-12 h-6 rounded-full flex items-center px-1 shrink-0 cursor-pointer transition-colors ${overridePlan ? 'bg-[#7B24F4]' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${overridePlan ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <div className="w-full h-px bg-slate-50"></div>
            <div className="flex justify-between items-center">
              <div className="pr-4">
                <p className="text-[14px] font-medium text-slate-800 mb-1">阶段预警通知偏好</p>
                <p className="text-[12px] text-slate-400 leading-snug">当检测到睡眠健康风险时推送通知</p>
              </div>
              <div onClick={() => setStageWarning(!stageWarning)} className={`w-12 h-6 rounded-full flex items-center px-1 shrink-0 cursor-pointer transition-colors ${stageWarning ? 'bg-[#FB7185]' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${stageWarning ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center py-4 bg-transparent border border-dashed border-slate-300 hover:border-slate-400 rounded-[20px] text-[14px] text-slate-500 font-medium transition-colors mb-4">
          + 添加新设备
        </button>
      </div>
    </div>
  );
}

/* =========================================
   子视图: 今晚监测准备页 (恢复缺失代码)
========================================= */
