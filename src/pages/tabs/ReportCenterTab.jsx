import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';
import DayHypnogramChart from '../../charts/DayHypnogramChart';
import WeekBarChart from '../../charts/WeekBarChart';
import MonthBarChart from '../../charts/MonthBarChart';
import LegendItem from '../../components/report/LegendItem';
import MetricsPanel from '../../components/report/MetricsPanel';
import InterpretationCard from '../../components/report/InterpretationCard';
import ProfessionalReportSection from '../../components/report/ProfessionalReportSection';

export default function ReportCenterTab({ onNavigate }) {
  const [viewMode, setViewMode] = useState('day');
  const [reportState, setReportState] = useState('none');
  const [showModal, setShowModal] = useState(false);

  const timeLabel = {
    day: "2025年1月13日 周一",
    week: "25年1月13日 - 25年1月19日",
    month: "2025年1月"
  };

  const handleGenerateReport = () => {
    setShowModal(false);
    setReportState('generating');
    setTimeout(() => {
      setReportState('generated');
    }, 2500);
  };

  return (
    <div className="min-h-full bg-[#FAFAF9] relative animate-in fade-in">
      <div className="px-5 pt-12 pb-4 flex justify-between items-center sticky top-0 bg-[#FAFAF9]/90 backdrop-blur-md z-30">
        <h1 className="text-[26px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight">睡眠</h1>
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 rounded-full active:scale-95 transition-transform">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="px-5 pb-6">
        <div className="flex justify-center mb-7 mt-2">
          <div className="flex space-x-10 relative">
            {['day', 'week', 'month'].map((mode) => {
              const labels = { day: '日', week: '周', month: '月' };
              const isActive = viewMode === mode;
              return (
                <div key={mode} onClick={() => setViewMode(mode)} className="flex flex-col items-center cursor-pointer group">
                  <span className={`text-[16px] pb-2 transition-colors duration-300 ${isActive ? 'text-[#7B24F4] font-bold' : 'text-slate-400 font-medium group-hover:text-slate-600'}`}>
                    {labels[mode]}
                  </span>
                  {isActive && (
                    <div className="w-5 h-[3px] bg-[#7B24F4] rounded-full absolute bottom-0 shadow-[0_2px_8px_rgba(123,36,244,0.5)] animate-in fade-in zoom-in duration-300"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`flex justify-between items-center ${viewMode === 'day' ? 'mb-4' : 'mb-8'}`}>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-[#7B24F4] transition-colors active:scale-95">
            <ChevronLeft size={18} strokeWidth={2.5}/>
          </button>
          <div className="flex flex-col items-center cursor-pointer group">
            <span className="text-[14px] font-medium text-slate-500 flex items-center hover:text-slate-700 transition-colors tracking-wide">
              {timeLabel[viewMode]}
              {viewMode !== 'day' && <ChevronDown size={14} className="ml-1 opacity-50" />}
            </span>
            {viewMode === 'day' && (
              <span className="text-[36px] font-extrabold text-slate-800 mt-0.5 flex items-baseline tracking-tighter">
                6 <span className="text-[16px] font-bold mx-1 text-slate-600 tracking-normal">小时</span> 46 <span className="text-[16px] font-bold ml-1 text-slate-600 tracking-normal">分钟</span>
              </span>
            )}
            {viewMode === 'week' && <span className="text-[13px] text-slate-400 mt-2 font-medium">1月13日</span>}
            {viewMode === 'month' && <span className="text-[13px] text-slate-400 mt-2 font-medium">1月13日</span>}
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-[#7B24F4] transition-colors active:scale-95">
            <ChevronRight size={18} strokeWidth={2.5}/>
          </button>
        </div>

        <div className="mb-8 relative">
          <div className="relative z-10">
            {viewMode === 'day' && <DayHypnogramChart />}
            {viewMode === 'week' && <WeekBarChart />}
            {viewMode === 'month' && <MonthBarChart />}
          </div>
          
          <div className="flex justify-center space-x-6 mt-8 relative z-10">
            <LegendItem color="bg-[#7B24F4]" label="深睡" />
            <LegendItem color="bg-[#B44DFB]" label="浅睡" />
            <LegendItem color="bg-[#F75185]" label="快速眼动" />
            <LegendItem color="bg-[#FE7A6B]" label="清醒" />
          </div>
        </div>

        <MetricsPanel viewMode={viewMode} />
        <InterpretationCard viewMode={viewMode} />

        {viewMode === 'day' && (
          <ProfessionalReportSection state={reportState} onGenerateClick={() => setShowModal(true)} onNavigate={onNavigate} />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-7 w-full max-w-[340px] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-[#F5F3FF] rounded-[20px] flex items-center justify-center mb-5 text-[#7B24F4] border border-purple-100 shadow-inner">
              <FileSearch size={26} strokeWidth={2} />
            </div>
            <h3 className="text-[19px] font-bold text-slate-800 mb-2">生成专业可解释报告</h3>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-8 font-medium">
              这将基于当前这一晚的睡眠监测结果，应用专业算法生成更详细的睡眠结构与医学特征报告。该报告更适合在就医时提供给医生参考。生成过程需要一定时间。
            </p>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-[20px] text-[15px] font-bold hover:bg-slate-100 transition-colors">
                取消
              </button>
              <button onClick={handleGenerateReport} className="flex-[1.5] py-4 bg-gradient-to-r from-[#7B24F4] to-[#6366F1] text-white rounded-[20px] text-[15px] font-bold shadow-[0_6px_20px_rgba(123,36,244,0.3)] hover:opacity-90 transition-all active:scale-95">
                开始生成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
