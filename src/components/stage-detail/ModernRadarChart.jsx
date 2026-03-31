import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function ModernRadarChart() {
  const size = 200;
  const center = size / 2;
  const radius = 65;
  const levels = 4; // 内部网格圈数

  // 数据配置：[入睡潜伏期, 觉醒频次, 睡眠维持率(反转表示偏离), REM占比, 深睡占比, 浅睡占比]
  // 值域 0-100，代表异常偏离程度。值越大越靠外
  const dataFeatures = [
    { label: '入睡潜伏期', value: 91 },
    { label: '觉醒频次', value: 100 },
    { label: '睡眠维持率', value: 19 },
    { label: 'REM占比', value: 96 },
    { label: '深睡占比', value: 86 },
    { label: '浅睡占比', value: 19 }
  ];

  const numPoints = dataFeatures.length;
  const angleStep = (Math.PI * 2) / numPoints;

  // 辅助函数：根据比例计算极坐标点
  const getPoint = (val, i) => {
    // 旋转 -90度 让第一个点在正上方
    const angle = i * angleStep - Math.PI / 2;
    const r = (val / 100) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  // 1. 生成背景网格 (同心多边形)
  const gridPolygons = [];
  for (let level = 1; level <= levels; level++) {
    const levelPoints = [];
    for (let i = 0; i < numPoints; i++) {
      const pt = getPoint((level / levels) * 100, i);
      levelPoints.push(`${pt.x},${pt.y}`);
    }
    gridPolygons.push(levelPoints.join(' '));
  }

  // 2. 生成对角连接线
  const crossLines = [];
  for (let i = 0; i < numPoints; i++) {
    const pt = getPoint(100, i);
    crossLines.push({ x1: center, y1: center, x2: pt.x, y2: pt.y });
  }

  // 3. 生成真实数据多边形
  const dataPoints = dataFeatures.map((d, i) => getPoint(d.value, i));
  const dataPolygonStr = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-[240px] h-[220px] flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
           {/* 高级紫粉渐变填充 */}
           <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="rgba(167, 139, 250, 0.4)" /> {/* Violet 400 */}
             <stop offset="100%" stopColor="rgba(244, 114, 182, 0.2)" /> {/* Rose 400 */}
           </linearGradient>
        </defs>

        {/* 绘制同心网格 */}
        {gridPolygons.map((pts, idx) => (
          <polygon key={`grid-${idx}`} points={pts} fill="none" stroke="#E2E8F0" strokeWidth="1" />
        ))}

        {/* 绘制对角线 */}
        {crossLines.map((line, idx) => (
          <line key={`line-${idx}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#E2E8F0" strokeWidth="1" />
        ))}

        {/* 绘制数据多边形 */}
        <polygon 
          points={dataPolygonStr} 
          fill="url(#radarFill)" 
          stroke="#8B5CF6" 
          strokeWidth="2" 
          strokeLinejoin="round" 
          className="drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]"
        />

        {/* 绘制顶点圆点 */}
        {dataPoints.map((p, idx) => (
          <circle key={`dot-${idx}`} cx={p.x} cy={p.y} r="3.5" fill="#8B5CF6" stroke="#fff" strokeWidth="1.5" />
        ))}
      </svg>

      {/* 外部渲染 HTML 标签和数值 (比纯 SVG 文本更容易排版) */}
      {dataFeatures.map((d, i) => {
        // 让标签稍微比最大半径再往外延展一点
        const labelPos = getPoint(130, i);
        // 微调各点对齐方式
        let alignClass = "text-center transform -translate-x-1/2 -translate-y-1/2";
        if (i === 1 || i === 2) alignClass = "text-left transform -translate-y-1/2 translate-x-2";
        if (i === 4 || i === 5) alignClass = "text-right transform -translate-y-1/2 -translate-x-2";

        return (
          <div key={`label-${i}`} className={`absolute flex flex-col items-center justify-center ${alignClass}`} style={{ left: labelPos.x + 20, top: labelPos.y }}>
            <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{d.label}</span>
            <span className="text-[12px] font-black font-mono text-slate-800 leading-none mt-0.5">{d.value}</span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================
   子视图: 设备设置页 (恢复缺失代码)
========================================= */
