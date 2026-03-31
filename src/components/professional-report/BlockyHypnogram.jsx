import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';
import UnifiedMetric from './UnifiedMetric';

export default function BlockyHypnogram({ epoch, blocks, totalEpochs }) {
  const yPos = { WAKE: 15, REM: 35, N1: 55, N2: 75, N3: 95 };
  
  return (
    <div className="relative w-full h-[110px] select-none pl-6 pr-2">
      {/* 纵轴标签 */}
      <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between text-[8px] font-bold font-mono text-slate-400 py-2">
         <span>W</span><span className="text-rose-400">R</span><span>N1</span><span>N2</span><span className="text-indigo-600">N3</span>
      </div>
      
      {/* 绘图区域 */}
      <svg viewBox={`0 0 ${totalEpochs} 110`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
           <linearGradient id="blockGrad" x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor="#FB7185" /> {/* Rose-400 */}
             <stop offset="100%" stopColor="#8B5CF6" /> {/* Violet-500 */}
           </linearGradient>
        </defs>
        
        {/* 背景虚线辅助线 */}
        {[15, 35, 55, 75, 95].map(y => (
          <line key={y} x1="0" y1={y} x2={totalEpochs} y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
        ))}

        {/* 极细的连接线 (正交直角折线) */}
        {blocks.map((block, i) => {
           if (i === 0) return null;
           const prev = blocks[i-1];
           return (
             <polyline
               key={`line-${i}`}
               points={`${prev.rawEnd},${yPos[prev.stage]} ${prev.rawEnd},${yPos[block.stage]} ${block.start},${yPos[block.stage]}`}
               fill="none" stroke="#E2E8F0" strokeWidth="1.5"
             />
           );
        })}
        
        {/* 圆角分期渐变块 */}
        {blocks.map((block, i) => (
           <rect
             key={`block-${i}`}
             x={block.start}
             y={yPos[block.stage] - 8}
             width={block.end - block.start}
             height={16}
             rx="4"
             fill="url(#blockGrad)"
             className="drop-shadow-sm transition-all duration-300 hover:opacity-80 cursor-pointer"
           />
        ))}
        
        {/* 联动的游标指示器 (Scrubber) */}
        <g className="transition-all duration-75" style={{ transform: `translateX(${epoch}px)` }}>
           <rect x="-15" y="0" width="30" height="110" fill="#F8FAFC" opacity="0.8" rx="6" />
           <line x1="0" y1="0" x2="0" y2="110" stroke="#818CF8" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

// 辅助组件：统一风格的高质感网格指标 (UnifiedMetric)
