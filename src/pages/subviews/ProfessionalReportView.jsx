import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';
import BlockyHypnogram from '../../components/professional-report/BlockyHypnogram';
import UnifiedMetric from '../../components/professional-report/UnifiedMetric';
import MicroMetric from '../../components/professional-report/MicroMetric';
import ModernSleepStageDonut from '../../components/professional-report/ModernSleepStageDonut';

export default function ProfessionalReportView({ onBack }) {
  const [epoch, setEpoch] = useState(453);
  const [waveformType, setWaveformType] = useState('raw'); // 新增状态：raw (原始波形) 或 heatmap (模型热度图)
  const totalEpochs = 960; 

  const handlePrevEpoch = () => setEpoch(prev => Math.max(1, prev - 1));
  const handleNextEpoch = () => setEpoch(prev => Math.min(totalEpochs, prev + 1));

  // --- 全新块状分期趋势图的数据源 (对齐 image_98c67c.png) ---
  const hypnogramBlocks = useMemo(() => {
    const raw = [
      { duration: 40, stage: 'WAKE' }, { duration: 20, stage: 'N1' }, { duration: 100, stage: 'N2' },
      { duration: 90, stage: 'N3' }, { duration: 70, stage: 'N2' }, { duration: 60, stage: 'REM' },
      { duration: 20, stage: 'N1' }, { duration: 100, stage: 'N2' }, { duration: 60, stage: 'N3' },
      { duration: 40, stage: 'N2' }, { duration: 80, stage: 'REM' }, { duration: 40, stage: 'WAKE' },
      { duration: 100, stage: 'N2' }, { duration: 100, stage: 'REM' }, { duration: 40, stage: 'WAKE' }
    ];
    let current = 0;
    return raw.map(b => {
      const start = current;
      const end = current + b.duration;
      current = end;
      // 微调块的大小，预留出竖直连接线的间隙空间，完美对齐设计图
      return { start: start + 2, end: end - 2, stage: b.stage, rawStart: start, rawEnd: end };
    });
  }, []);

  // 0. 当前 Epoch 的预测分期 (通过块状数据精准映射)
  const currentStage = useMemo(() => {
    // 修复边界逻辑：epoch 是 1-based 的，匹配范围必须是严格的 (rawStart, rawEnd]
    const block = hypnogramBlocks.find(b => epoch > b.rawStart && epoch <= b.rawEnd) || hypnogramBlocks[0];
    return block.stage;
  }, [epoch, hypnogramBlocks]);

  // 1 & 2. 生成对齐真实 PSG 生理特征的波形与 XAI 热力信号 (彻底解决高密度糊化问题，重构 N1 与 REM 真实感)
  const signalData = useMemo(() => {
    const pointsCount = 350; // 完美匹配手机端图表容器的物理像素宽度，一像素一点，消除抗锯齿糊化
    const eegPts = [];
    const eogPts = [];
    let eegLine = "";
    let eogLine = "";
    
    const eegXAI = [];
    const eogXAI = [];

    // 高斯包络函数，用于构建局部突发波形 (如纺锤波、K复合波)
    const gaussian = (x, mean, std) => Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
    
    // 一阶高斯导数函数，用于构建真实的尖锐、短促、突发的快速眼动 (Saccade/REMs)
    const saccade = (t, center, amp, width) => amp * ((t - center) / width) * Math.exp(-0.5 * Math.pow((t - center) / width, 2));

    // 根据 epoch 生成几个固定的随机时间点 (0-30s)，用于放置局部特征
    const p1 = 5 + (epoch * 3.7) % 20; 
    const p2 = 8 + (epoch * 7.1) % 15;
    const p3 = 12 + (epoch * 11.3) % 10;

    for (let i = 0; i <= pointsCount; i++) {
      const t_sec = (i / pointsCount) * 30; // 时间 0-30s
      const x = (i / pointsCount) * 100;
      
      let eegY = 0;
      let eogY = 0;
      let eegW = 0.1; // XAI 权重
      let eogW = 0.1; 

      // 制造自然的不规则基线漂移
      const drift = Math.sin(t_sec * 0.15 + epoch) * 2 + Math.sin(t_sec * 0.05) * 1;

      // ==========================================
      // 根据睡眠分期构建真实生理特征 
      // ==========================================
      switch (currentStage) {
        case 'WAKE':
          // EEG: 闭眼安静清醒，Alpha节律(视觉 2.2Hz 模拟，更稀疏) 
          eegY = 7 * Math.sin(2 * Math.PI * 2.2 * t_sec + epoch) * (0.6 + 0.4 * Math.sin(t_sec * 0.8));
          eegY += 2 * Math.sin(2 * Math.PI * 0.8 * t_sec); 
          // EOG: 基本平静，偶尔有眨眼或缓慢游走
          eogY = 2 * Math.sin(2 * Math.PI * 0.2 * t_sec); 
          if (Math.abs(t_sec - p1) < 1.0) eogY += 10 * gaussian(t_sec, p1, 0.15); // 眨眼伪影减弱
          
          eegW = 0.3 + 0.2 * Math.sin(t_sec); 
          eogW = 0.1;
          break;

        case 'N1':
          // EEG: Alpha 衰减，背景转为低幅松散的混合频率 (Theta 波为主，掺杂更慢的波)，体现过渡期
          eegY = 3.5 * Math.sin(2 * Math.PI * 1.4 * t_sec + epoch) + 
                 2.0 * Math.sin(2 * Math.PI * 0.5 * t_sec + epoch * 0.5) + 
                 1.5 * Math.sin(2 * Math.PI * 2.5 * t_sec);
          eegY -= 12 * gaussian(t_sec, p2, 0.25); // 保留偶尔的顶尖波 (Vertex sharp wave)
          
          // EOG: 标志性的慢滚动眼动 (Slow Rolling Eye Movements - SEM)
          // 特征：非规则、平缓的缓慢游走，而不是规则的连续正弦波
          eogY = 6.0 * Math.sin(2 * Math.PI * 0.06 * t_sec + epoch) + 
                 4.0 * Math.sin(2 * Math.PI * 0.11 * t_sec + epoch * 1.2) + 
                 3.0 * Math.sin(2 * Math.PI * 0.03 * t_sec);
          
          eegW = 0.2 + 0.6 * gaussian(t_sec, p2, 0.6); 
          eogW = 0.6 + 0.3 * Math.sin(2 * Math.PI * 0.06 * t_sec + epoch); 
          break;

        case 'N2':
          // EEG: 核心是 Spindle(纺锤波) 和 K-Complex
          eegY = 3.0 * Math.sin(2 * Math.PI * 1.0 * t_sec + epoch); 
          // 纺锤波 (为了保证彻底不糊，视觉频率降到 3.8Hz，振幅适度减小)
          eegY += 11 * gaussian(t_sec, p1, 0.6) * Math.sin(2 * Math.PI * 3.8 * t_sec);
          eegY += 9 * gaussian(t_sec, p2, 0.5) * Math.sin(2 * Math.PI * 4.0 * t_sec);
          // K-Complex (巨大的负正双相慢波)
          eegY += -24 * gaussian(t_sec, p3, 0.35) * Math.sin(2 * Math.PI * 0.8 * (t_sec - p3));
          
          // EOG: 完全平静，无眼动
          eogY = 1.0 * Math.sin(2 * Math.PI * 0.3 * t_sec); 
          
          eegW = 0.1 + 0.8 * gaussian(t_sec, p1, 0.8) + 0.8 * gaussian(t_sec, p2, 0.7) + 0.9 * gaussian(t_sec, p3, 0.6);
          eogW = 0.05;
          break;

        case 'N3':
          // EEG: Delta 慢波主导，高幅、宽大
          eegY = 20 * Math.sin(2 * Math.PI * 0.3 * t_sec + epoch) +
                 10 * Math.sin(2 * Math.PI * 0.5 * t_sec + epoch * 1.5) +
                 3  * Math.sin(2 * Math.PI * 1.0 * t_sec);
          // EOG: 平静，额叶串扰
          eogY = 5 * Math.sin(2 * Math.PI * 0.3 * t_sec + epoch); 
          
          eegW = 0.6 + 0.2 * Math.sin(2 * Math.PI * 0.3 * t_sec + epoch); 
          eogW = 0.1;
          break;

        case 'REM':
          // EEG: 极低振幅混合频率，没有纺锤波/K复合波
          eegY = 2.5 * Math.sin(2 * Math.PI * 1.6 * t_sec + epoch) + 
                 1.5 * Math.sin(2 * Math.PI * 0.7 * t_sec + epoch * 0.8) +
                 1.0 * Math.sin(2 * Math.PI * 2.8 * t_sec);
                 
          // EOG: 簇间的绝对平静基线
          eogY = 1.0 * Math.sin(2 * Math.PI * 0.1 * t_sec); 
          
          // 构造两组真实、突发、短促且尖锐的快速眼动簇 (REMs burst)
          if (Math.abs(t_sec - p1) < 2.0) {
            eogY += saccade(t_sec, p1 - 0.4, 25, 0.08) + 
                    saccade(t_sec, p1 + 0.15, -20, 0.10) + 
                    saccade(t_sec, p1 + 0.5, 15, 0.09);
          }
          if (Math.abs(t_sec - p3) < 1.5) {
            eogY += saccade(t_sec, p3 - 0.2, -28, 0.07) + 
                    saccade(t_sec, p3 + 0.3, 22, 0.09);
          }
          
          eegW = 0.1;
          // 模型权重精准聚焦这些短促的快速眼动尖峰
          eogW = 0.1 + 0.85 * gaussian(t_sec, p1, 0.8) + 0.8 * gaussian(t_sec, p3, 0.6); 
          break;
      }

      // 极致削弱高频毛刺与底噪，保证线条干净锐利
      const noiseSeed = i * 0.1 + epoch;
      eegY += (Math.sin(noiseSeed * 23) * 0.15) + (Math.sin(noiseSeed * 11) * 0.1) + drift;
      eogY += (Math.sin(noiseSeed * 19) * 0.1) + (Math.sin(noiseSeed * 7) * 0.08) + drift * 0.5;

      // 映射到 SVG 坐标系 (中心点为 50)
      const finalEegY = 50 - eegY; 
      const finalEogY = 50 - eogY;

      eegPts.push({ x, y: finalEegY, w: Math.max(0, Math.min(1, eegW)) });
      eogPts.push({ x, y: finalEogY, w: Math.max(0, Math.min(1, eogW)) });

      eegLine += `${x},${finalEegY} `;
      eogLine += `${x},${finalEogY} `;
    }

    // 构建分段染色的热力图线段 (XAI)
    const getColor = (weight) => {
      if (weight > 0.8) return '#be123c'; // Rose-700
      if (weight > 0.6) return '#f43f5e'; // Rose-500
      if (weight > 0.4) return '#fb7185'; // Rose-400
      if (weight > 0.2) return '#fecdd3'; // Rose-200
      return '#fff1f2';                   // Rose-50
    };

    for (let i = 0; i < pointsCount - 1; i++) {
      const eW = eegPts[i].w;
      // 热力图线宽也调细，避免连成一片
      eegXAI.push({ x1: eegPts[i].x, y1: eegPts[i].y, x2: eegPts[i+1].x, y2: eegPts[i+1].y, color: getColor(eW), strokeWidth: eW > 0.6 ? 1.2 : 0.8 });
      
      const oW = eogPts[i].w;
      eogXAI.push({ x1: eogPts[i].x, y1: eogPts[i].y, x2: eogPts[i+1].x, y2: eogPts[i+1].y, color: getColor(oW), strokeWidth: oW > 0.6 ? 1.2 : 0.8 });
    }

    return { 
      eeg: { line: eegLine, xai: eegXAI }, 
      eog: { line: eogLine, xai: eogXAI } 
    };
  }, [epoch, currentStage]);

  // 新增逻辑：按睡眠阶段向下寻找 Epoch
  const handleFindNextStage = (targetStage) => {
    let nextEpoch = null;

    // 辅助函数：精准获取指定 epoch 对应的睡眠阶段
    const getStageForEpoch = (e) => {
      const block = hypnogramBlocks.find(b => e > b.rawStart && e <= b.rawEnd);
      return block ? block.stage : null;
    };

    // 1. 严格从当前 epoch + 1 开始向后逐帧寻找符合 targetStage 的 epoch
    for (let e = epoch + 1; e <= totalEpochs; e++) {
      if (getStageForEpoch(e) === targetStage) {
        nextEpoch = e;
        break;
      }
    }

    // 2. 如果后半夜没找到，则折返从头开始找 (循环查找)
    if (nextEpoch === null) {
      for (let e = 1; e < epoch; e++) {
        if (getStageForEpoch(e) === targetStage) {
          nextEpoch = e;
          break;
        }
      }
    }

    if (nextEpoch !== null) {
      setEpoch(nextEpoch);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F3F6FA] absolute top-0 left-0 z-[60] animate-in slide-in-from-right duration-400 overflow-hidden font-sans">
      
      {/* 顶部标题 */}
      <div className="bg-white/80 backdrop-blur-xl px-4 pt-12 pb-4 flex items-center justify-between border-b border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] shrink-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={22} strokeWidth={2.5}/>
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-[17px] font-bold text-slate-800 tracking-wide">专业可解释报告</h2>
          <p className="text-[10px] font-medium text-slate-400 mt-1 font-mono tracking-wider">SE-RPT-20250113-0924</p>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        
        {/* 说明横幅 */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-800 to-indigo-900 px-5 py-2.5 flex items-start justify-center shadow-inner">
          <p className="text-[11px] text-blue-100/90 leading-relaxed font-medium text-center tracking-wide">
            本报告提供客观多导睡眠结构参考及深度模型特征追溯，仅供专业评估辅助使用。
          </p>
        </div>

        <div className="px-3 py-4 space-y-4">
          
          {/* =========================================
              核心模块 1: 统一设计的高质感宏观指标总览
          ========================================= */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-5 relative z-10">
              <h3 className="text-[15px] font-bold text-slate-800 flex items-center tracking-wide">
                <BarChart size={16} className="mr-2 text-blue-500" strokeWidth={2.5}/> 核心客观指标总览
              </h3>
              <span className="text-[9px] font-bold font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/50">01/13 监测</span>
            </div>

            {/* 新版块状睡眠分期图 (Blocky Hypnogram) */}
            <div className="w-full relative mb-5 z-10">
              <BlockyHypnogram epoch={epoch} blocks={hypnogramBlocks} totalEpochs={totalEpochs} />
            </div>

            {/* 统一的高质感极简指标网格 */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-5 pt-4 border-t border-slate-50 relative z-10">
               <UnifiedMetric label="总睡眠 (TST)" value="406" unit="min" />
               <UnifiedMetric label="睡眠效率" value="92.5" unit="%" highlight />
               <UnifiedMetric label="深睡占比" value="21.2" unit="%" highlight />
               <UnifiedMetric label="入睡潜伏期" value="14" unit="min" />
               <UnifiedMetric label="REM潜伏期" value="89" unit="min" />
               <UnifiedMetric label="觉醒时长" value="32" unit="min" />
            </div>
          </div>

          {/* =========================================
              核心模块 2: 多导微观指标分析 (图表置顶，指标聚拢，极致紧凑)
          ========================================= */}
          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-slate-100">
            <div className="bg-slate-50/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 text-blue-500 border border-slate-100">
                 <Activity size={10} strokeWidth={3}/>
              </div>
              <h3 className="text-[14px] font-bold text-slate-800 tracking-wide">
                 多导微观指标分析
              </h3>
            </div>
            
            <div className="p-0">
              {/* 占比图置于上方，作为结构概览 */}
              <div className="px-5 py-5 bg-white">
                 <ModernSleepStageDonut />
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              {/* 核心生理特征参数聚拢于下方，形成紧凑网格 */}
              <div className="px-3 py-4 bg-slate-50/50">
                <div className="flex items-center mb-3 pl-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shadow-sm"></div>
                  <h4 className="text-[11px] font-bold text-slate-600 tracking-wide">核心特征参数</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <MicroMetric label="觉醒指数 (ArI)" value="4.2" unit="次/时" icon={<Bell/>} color="text-amber-500" bg="bg-amber-50" />
                  <MicroMetric label="入睡潜伏期(SL)" value="14.0" unit="min" icon={<Clock/>} color="text-emerald-500" bg="bg-emerald-50" />
                  <MicroMetric label="纺锤波密度" value="3.8" unit="/min" icon={<Activity/>} color="text-blue-500" bg="bg-blue-50" />
                  <MicroMetric label="慢波(SWA)能量" value="65.2" unit="µV²" icon={<Brain/>} color="text-indigo-500" bg="bg-indigo-50" />
                  <MicroMetric label="K-复合波频次" value="1.2" unit="/min" icon={<Target/>} color="text-purple-500" bg="bg-purple-50" />
                  <MicroMetric label="REM 眼动密度" value="24" unit="%" icon={<Eye/>} color="text-rose-500" bg="bg-rose-50" />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              核心模块 3: 高效紧凑控制台 (集合切换波形、寻找阶段与滑动条)
          ========================================= */}
          <div className="bg-white rounded-[20px] p-4 shadow-[0_8px_24px_rgba(59,130,246,0.06)] border border-blue-100/50 mt-5 relative z-20 flex flex-col gap-4">
             {/* 第一行：Pred 和 Epoch信息 */}
             <div className="flex justify-between items-end px-1">
                <div className="flex items-center bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50 shadow-sm">
                  <span className="text-blue-400 mr-1.5 uppercase font-bold text-[10px]">Pred</span>
                  <span className="text-blue-600 font-black text-[18px] leading-none font-mono">{currentStage}</span>
                </div>
                <div className="flex items-baseline font-mono">
                  <span className="text-[11px] text-blue-400/80 mr-1.5 font-bold tracking-widest uppercase">EPOCH</span>
                  <span className="text-[22px] font-black text-slate-800 leading-none tracking-tight">{epoch}</span>
                  <span className="text-[13px] text-slate-400 leading-none ml-1 font-medium">/ 960</span>
                </div>
             </div>

             {/* 第二行：滑动控制条 */}
             <div className="flex items-center gap-3">
                <button onClick={handlePrevEpoch} className="w-9 h-9 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all border border-slate-200 shadow-sm">
                   <SkipBack size={16} strokeWidth={2.5}/>
                </button>
                
                <div className="flex-1 relative h-[8px] bg-blue-100/50 rounded-full border border-blue-200/50 shadow-inner">
                   <div className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: `${(epoch / totalEpochs) * 100}%` }}></div>
                   <input 
                      type="range" min="1" max={totalEpochs} 
                      value={epoch} onChange={(e) => setEpoch(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                   <div 
                      className="absolute w-4 h-4 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-slate-200 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75" 
                      style={{ left: `calc(${(epoch / totalEpochs) * 100}% - 8px)` }}
                   ></div>
                </div>

                <button onClick={handleNextEpoch} className="w-9 h-9 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all border border-slate-200 shadow-sm">
                   <SkipForward size={16} strokeWidth={2.5}/>
                </button>
             </div>

             {/* 第三行：操作栏 (波形切换 + 寻找阶段) 在同一行 */}
             <div className="flex justify-between items-center pt-3 border-t border-slate-100/80">
                {/* 1. 波形视图切换 */}
                <div className="flex bg-slate-100/80 p-0.5 rounded-[10px]">
                   <button
                     onClick={() => setWaveformType('raw')}
                     className={`px-2 py-1.5 text-[11px] font-bold rounded-[8px] transition-all duration-300 ${waveformType === 'raw' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     波形
                   </button>
                   <button
                     onClick={() => setWaveformType('heatmap')}
                     className={`px-2 py-1.5 text-[11px] font-bold rounded-[8px] transition-all duration-300 ${waveformType === 'heatmap' ? 'bg-white shadow-sm text-rose-500' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     热力
                   </button>
                </div>

                {/* 2. 寻找下个阶段 */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold mr-0.5 whitespace-nowrap">寻:</span>
                  {['WAKE', 'N1', 'N2', 'N3', 'REM'].map(s => {
                     const isCurrent = currentStage === s;
                     return (
                       <button
                         key={s}
                         onClick={() => handleFindNextStage(s)}
                         className={`px-1.5 py-1 rounded-[6px] text-[9px] font-bold transition-all shadow-sm border ${isCurrent ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'} active:scale-95`}
                       >
                         {s}
                       </button>
                     )
                  })}
                </div>
             </div>
          </div>

          {/* =========================================
              核心模块 4: EEG / EOG 双通道波形展示
          ========================================= */}
          <div className="flex flex-col gap-4 w-full mt-4 mb-2">
            
            {/* 卡片 1: EEG */}
            <div className="bg-white rounded-[20px] border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col pt-1">
               <div className="flex justify-between items-center px-4 py-3">
                  <div className="text-[14px] font-bold text-slate-800 flex items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mr-2.5 transition-colors ${waveformType === 'raw' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`}></div>
                    脑电信号 <span className="text-[12px] text-slate-500 font-medium ml-1.5">(EEG C4-M1)</span>
                  </div>
                  <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono font-bold border border-slate-200/50">100 Hz</span>
               </div>

               <div className="relative h-[110px] bg-white w-full px-2">
                 <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#F1F5F9" strokeWidth="0.5" strokeDasharray="2 2" />
                    {waveformType === 'raw' ? (
                      <polyline points={signalData.eeg.line} fill="none" stroke="#3B82F6" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      signalData.eeg.xai.map((seg, idx) => (
                        <line key={idx} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} stroke={seg.color} strokeWidth={seg.strokeWidth} strokeLinecap="round" />
                      ))
                    )}
                 </svg>
               </div>
               
               <div className="flex justify-between px-5 pb-3 pt-1 border-t border-slate-50 text-[11px] text-slate-400 font-mono font-bold">
                 <span>0s</span><span>10s</span><span>20s</span><span>30s</span>
               </div>
            </div>

            {/* 卡片 2: EOG */}
            <div className="bg-white rounded-[20px] border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col pt-1">
               <div className="flex justify-between items-center px-4 py-3">
                  <div className="text-[14px] font-bold text-slate-800 flex items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mr-2.5 transition-colors ${waveformType === 'raw' ? 'bg-[#06B6D4] shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]'}`}></div>
                    眼电信号 <span className="text-[12px] text-slate-500 font-medium ml-1.5">(EOG E1-M2)</span>
                  </div>
                  <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono font-bold border border-slate-200/50">50 Hz</span>
               </div>

               <div className="relative h-[80px] bg-white w-full px-2">
                 <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#F1F5F9" strokeWidth="0.5" strokeDasharray="2 2" />
                    {waveformType === 'raw' ? (
                      <polyline points={signalData.eog.line} fill="none" stroke="#06B6D4" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      signalData.eog.xai.map((seg, idx) => (
                        <line key={idx} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} stroke={seg.color} strokeWidth={seg.strokeWidth} strokeLinecap="round" />
                      ))
                    )}
                 </svg>
               </div>
               
               <div className="flex justify-between px-5 pb-3 pt-1 border-t border-slate-50 text-[11px] text-slate-400 font-mono font-bold">
                 <span>0s</span><span>10s</span><span>20s</span><span>30s</span>
               </div>
            </div>

          </div>

          <div className="bg-white rounded-[16px] p-5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)] relative overflow-hidden mt-6">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <h4 className="text-[13px] font-bold text-slate-800 mb-2.5 pl-2">客观结果摘要</h4>
            <div className="space-y-2.5 pl-2">
              <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                <span className="font-bold text-slate-800">结构总结：</span>本次监测有效数据段完整，整体睡眠效率处于基线标准区间，慢波睡眠（N3）维持稳定。
              </p>
              <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                <span className="font-bold text-slate-800">解释说明：</span>上方的每个通道展示了垂直同轴的数据分析。<span className="text-blue-500 font-bold">蓝色波形</span>代表仪器采样的原始生理电信号，下方的<span className="text-rose-500 font-bold">红色波形</span>代表深度模型在分期（如 REM）时所聚焦的特征片段权重。
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 底部操作区 */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-100 p-4 pb-6 flex items-center justify-between z-20 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <button className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 active:scale-95 transition-all px-2">
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-1 shadow-sm">
            <Download size={18} />
          </div>
          <span className="text-[10px] font-bold">导出 PDF</span>
        </button>
        <button className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 active:scale-95 transition-all px-2">
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-1 shadow-sm">
            <Folder size={18} />
          </div>
          <span className="text-[10px] font-bold">保存档案</span>
        </button>
        <button className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-800 active:scale-95 transition-all px-2">
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-1 shadow-sm">
            <Calendar size={18} />
          </div>
          <span className="text-[10px] font-bold">历史报告</span>
        </button>
        
        <div className="w-px h-10 bg-slate-200 mx-2"></div>
        
        <button onClick={onBack} className="bg-slate-800 text-white px-6 py-3.5 rounded-full text-[14px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-slate-700 active:scale-95 transition-all">
          返回普通报告
        </button>
      </div>

    </div>
  );
}

/* =========================================
   全新现代分期图表 (Blocky Hypnogram)
========================================= */
