import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function DayHypnogramChart() {
  const [selectedIndex, setSelectedIndex] = useState(6);
  const svgRef = useRef(null);

  const stages = [
    { id: 0, type: 'light', duration: 29, startTime: '02:38', endTime: '03:07' },
    { id: 1, type: 'deep', duration: 45, startTime: '03:07', endTime: '03:52' },
    { id: 2, type: 'light', duration: 15, startTime: '03:52', endTime: '04:07' },
    { id: 3, type: 'rem', duration: 22, startTime: '04:07', endTime: '04:29' },
    { id: 4, type: 'light', duration: 35, startTime: '04:29', endTime: '05:04' },
    { id: 5, type: 'deep', duration: 40, startTime: '05:04', endTime: '05:44' },
    { id: 6, type: 'light', duration: 29, startTime: '05:44', endTime: '06:13' },
    { id: 7, type: 'wake', duration: 8, startTime: '06:13', endTime: '06:21' },
    { id: 8, type: 'rem', duration: 42, startTime: '06:21', endTime: '07:03' },
    { id: 9, type: 'light', duration: 20, startTime: '07:03', endTime: '07:23' },
    { id: 10, type: 'deep', duration: 43, startTime: '07:23', endTime: '08:06' },
    { id: 11, type: 'light', duration: 27, startTime: '08:06', endTime: '08:33' },
    { id: 12, type: 'rem', duration: 44, startTime: '08:33', endTime: '09:17' },
    { id: 13, type: 'light', duration: 7, startTime: '09:17', endTime: '09:24' }
  ];

  const colors = { wake: '#FE7A6B', rem: '#F75185', light: '#B44DFB', deep: '#7B24F4' };
  const labels = { wake: '清醒', rem: '快速眼动', light: '浅睡', deep: '深睡' };
  const yPositions = { wake: 30, rem: 65, light: 100, deep: 135 };

  const svgWidth = 1000;
  const svgHeight = 165; 
  
  const totalDuration = stages.reduce((acc, stage) => acc + stage.duration, 0);
  let currentX = 0;
  
  const processedStages = stages.map(stage => {
    const width = (stage.duration / totalDuration) * svgWidth;
    const startX = currentX;
    const endX = currentX + width;
    currentX = endX;
    return { ...stage, startX, endX, width };
  });

  const handleInteraction = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    
    const percentage = x / rect.width;
    const mappedX = percentage * svgWidth;
    
    const index = processedStages.findIndex(s => mappedX >= s.startX && mappedX <= s.endX);
    if (index !== -1 && index !== selectedIndex) setSelectedIndex(index);
  };

  const selectedStage = processedStages[selectedIndex];
  const activeColor = colors[selectedStage?.type || 'light'];

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mb-5 mt-0 transition-all duration-300">
        <p className="text-[14px] text-slate-500 mb-0.5 font-medium tracking-wide">
          {selectedStage?.startTime} - {selectedStage?.endTime}
        </p>
        <div className="flex items-baseline">
          <span className="text-[15px] font-medium text-slate-700 mr-2">
            {labels[selectedStage?.type]}
          </span>
          <span className="text-[36px] font-medium tracking-tight" style={{ color: activeColor, lineHeight: 1 }}>
            {selectedStage?.duration}
          </span>
          <span className="text-[14px] font-medium text-slate-800 ml-1.5">
            分钟
          </span>
        </div>
      </div>

      <div className="relative w-full h-[180px] select-none touch-none overflow-hidden" onPointerDown={handleInteraction} onPointerMove={(e) => { if (e.buttons === 1 || e.pointerType === 'touch') handleInteraction(e); }}>
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-px h-full bg-slate-100"></div>
        </div>

        {selectedStage && (
          <div className="absolute top-0 bottom-[14px] transition-all duration-200 pointer-events-none" style={{ left: `${(selectedStage.startX / svgWidth) * 100}%`, width: `${(selectedStage.width / svgWidth) * 100}%` }}>
             <div className="w-full h-full rounded-sm" style={{ backgroundColor: activeColor, opacity: 0.12 }}></div>
          </div>
        )}

        <svg ref={svgRef} width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none" className="relative z-10 overflow-visible">
          <defs>
            <linearGradient id="sleepGlobalVerticalGrad" x1="0" y1="0" x2="0" y2={svgHeight} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FE7A6B" />
              <stop offset="35%" stopColor="#F75185" />
              <stop offset="65%" stopColor="#B44DFB" />
              <stop offset="100%" stopColor="#7B24F4" />
            </linearGradient>
          </defs>

          {processedStages.map((stage, index) => {
            if (index === 0) return null;
            const prev = processedStages[index - 1];
            return (
              <line key={`vline-${index}`} x1={stage.startX} y1={yPositions[prev.type]} x2={stage.startX} y2={yPositions[stage.type]} stroke="url(#sleepGlobalVerticalGrad)" strokeWidth={1.5} opacity={0.4} strokeLinecap="square" />
            );
          })}

          {processedStages.map((stage, index) => (
            <rect key={`rect-${index}`} x={stage.startX} y={yPositions[stage.type] - 12} width={Math.max(0, stage.width - 0.5)} height={24} rx={3} fill="url(#sleepGlobalVerticalGrad)" />
          ))}
        </svg>

        <div className="absolute bottom-1 left-0 right-0 flex justify-center pointer-events-none">
           <div className="w-full max-w-[150px] h-[6px] bg-slate-100/80 rounded-full"></div>
        </div>

        {selectedStage && (
          <div className="absolute top-0 bottom-0 pointer-events-none transition-all duration-200 z-20 flex flex-col items-center" style={{ left: `${((selectedStage.startX + selectedStage.width / 2) / svgWidth) * 100}%`, transform: 'translateX(-50%)' }}>
             <div className="w-[1px] h-full" style={{ backgroundColor: activeColor, opacity: 0.4 }}></div>
             <div className="absolute bottom-[-3px] w-[18px] h-[18px] bg-white rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.12)] border border-slate-50 flex items-center justify-center"></div>
          </div>
        )}
      </div>

      <div className="w-full flex justify-between px-2 mt-4 text-[13px] text-slate-500 font-medium">
        <div className="flex flex-col items-start leading-snug">
          <span className="opacity-70 mb-0.5 text-[11px]">1/13</span>
          <span>入睡 02:38</span>
        </div>
        <div className="flex flex-col items-end leading-snug">
          <span className="opacity-70 mb-0.5 text-[11px]">1/13</span>
          <span>醒来 09:24</span>
        </div>
      </div>
    </div>
  );
}
