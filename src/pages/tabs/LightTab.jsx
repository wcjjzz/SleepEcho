import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function LightTab() {
  const [scene, setScene] = useState('morning');
  const [brightness, setBrightness] = useState(80);
  const [colorTemp, setColorTemp] = useState(4500);
  const [autoUpdate, setAutoUpdate] = useState(true);

  // 全新配置：场景氛围与视觉变量深度绑定
  const sceneConfig = {
    morning: {
      id: 'morning', name: '晨间自然唤醒', time: '06:10 - 06:40',
      desc: '基于连续监测结果自动生成。当前正通过渐进式冷白光有效抑制晨间皮质醇分泌迟滞。',
      icon: <Sunrise size={36} strokeWidth={1.5}/>,
      bg: 'from-orange-100 via-amber-50 to-sky-100', 
      textMain: 'text-amber-900', textSub: 'text-amber-800/80', textMuted: 'text-amber-700/60',
      accent: 'bg-amber-500', 
      cardActive: 'ring-2 ring-amber-400 shadow-xl shadow-amber-300/40',
      cardBg: 'from-orange-50 to-amber-100/80'
    },
    sky: {
      id: 'sky', name: '蓝天白云', time: '10:00 - 15:00',
      desc: '模拟正午高色温自然光照，强效抑制白天褪黑素分泌，维持高度专注与清醒节律。',
      icon: <Cloud size={36} strokeWidth={1.5}/>,
      bg: 'from-blue-100 via-sky-50 to-white', 
      textMain: 'text-sky-900', textSub: 'text-sky-800/80', textMuted: 'text-sky-700/60',
      accent: 'bg-sky-500', 
      cardActive: 'ring-2 ring-sky-400 shadow-xl shadow-sky-300/40',
      cardBg: 'from-blue-50 to-sky-100/80'
    },
    sunset: {
      id: 'sunset', name: '落日晚霞', time: '18:30 - 19:30',
      desc: '过渡期暖色调光效，模拟日落光谱变化规律，向大脑发送黄昏信号，开始平缓情绪。',
      icon: <Sun size={36} strokeWidth={1.5}/>,
      bg: 'from-rose-200 via-orange-100 to-purple-100', 
      textMain: 'text-rose-900', textSub: 'text-rose-800/80', textMuted: 'text-rose-700/60',
      accent: 'bg-rose-500', 
      cardActive: 'ring-2 ring-rose-400 shadow-xl shadow-rose-300/40',
      cardBg: 'from-rose-50 to-orange-100/80'
    },
    night: {
      id: 'night', name: '静谧夜晚', time: '22:30 - 23:15',
      desc: '极低色温的琥珀色弱光，彻底滤除蓝光波段，为褪黑素的自然大量分泌创造绝佳环境。',
      icon: <Moon size={36} strokeWidth={1.5}/>,
      bg: 'from-slate-900 via-indigo-950 to-purple-950', 
      textMain: 'text-indigo-50', textSub: 'text-indigo-200/80', textMuted: 'text-indigo-300/60',
      accent: 'bg-indigo-400', 
      cardActive: 'ring-2 ring-indigo-400 shadow-xl shadow-indigo-500/40',
      cardBg: 'from-indigo-900/80 to-purple-900/60'
    }
  };

  const currentTheme = sceneConfig[scene];
  const isDark = scene === 'night';

  const darkOverlayOpacity = (1 - brightness / 100) * 0.75; 
  const warmOpacity = colorTemp < 4500 ? ((4500 - colorTemp) / 2500) * 0.45 : 0;
  const coolOpacity = colorTemp > 4500 ? ((colorTemp - 4500) / 2500) * 0.4 : 0;

  const handleSceneChange = (id) => {
    setScene(id);
    setAutoUpdate(true); 
    if(id === 'night') { setBrightness(15); setColorTemp(2500); }
    else if(id === 'morning') { setBrightness(80); setColorTemp(4500); }
    else if(id === 'sky') { setBrightness(100); setColorTemp(6000); }
    else { setBrightness(60); setColorTemp(3500); }
  };

  const handleManualAdjust = (setter, value) => {
    setter(value);
    if (autoUpdate) setAutoUpdate(false); 
  };

  const handleResumeAuto = () => {
    setAutoUpdate(true);
    if(scene === 'night') { setBrightness(15); setColorTemp(2500); }
    else if(scene === 'morning') { setBrightness(80); setColorTemp(4500); }
    else if(scene === 'sky') { setBrightness(100); setColorTemp(6000); }
    else { setBrightness(60); setColorTemp(3500); }
  };

  return (
    <div className="relative min-h-full w-full flex flex-col">
      {/* 动态环境光 */}
      <div className={`absolute top-0 left-0 right-0 bottom-[-100px] bg-gradient-to-br ${currentTheme.bg} transition-colors duration-1000 ease-in-out z-0`}></div>
      <div className="absolute top-0 left-0 right-0 bottom-[-100px] bg-black transition-opacity duration-200 pointer-events-none z-0" style={{ opacity: darkOverlayOpacity }}></div>
      <div className="absolute top-0 left-0 right-0 bottom-[-100px] bg-orange-500 transition-opacity duration-200 pointer-events-none mix-blend-color z-0" style={{ opacity: warmOpacity }}></div>
      <div className="absolute top-0 left-0 right-0 bottom-[-100px] bg-sky-500 transition-opacity duration-200 pointer-events-none mix-blend-color z-0" style={{ opacity: coolOpacity }}></div>

      <div className="relative z-10 px-5 pt-12 pb-8 animate-in fade-in flex-1">
        
        {/* 顶部视觉区 */}
        <div className={`backdrop-blur-2xl rounded-[32px] p-6 mb-6 border transition-all duration-700 relative overflow-hidden shadow-2xl ${
          isDark ? 'bg-black/20 border-white/10 shadow-black/50' : 'bg-white/40 border-white/60 shadow-slate-300/30'
        }`}>
          <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none transition-colors duration-1000 ${currentTheme.accent}`}></div>
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className={`flex items-center px-4 py-2 rounded-full border text-[12px] font-bold tracking-wide transition-all duration-500 backdrop-blur-md ${
              autoUpdate 
                ? (isDark ? 'bg-white/10 border-white/20 text-indigo-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white/60 border-white text-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.5)]') 
                : (isDark ? 'bg-black/30 border-black/50 text-indigo-300/60' : 'bg-white/30 border-white/30 text-slate-600')
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2.5 transition-all duration-500 ${autoUpdate ? currentTheme.accent + ' animate-pulse shadow-[0_0_8px_currentColor]' : 'bg-slate-400'}`}></span>
              {autoUpdate ? '自动无感调控中' : '已手动干预'}
            </div>

            <div className="flex items-center h-8">
              {autoUpdate ? (
                <div className="flex items-center animate-in fade-in duration-300">
                  <span className={`text-[12px] font-medium mr-2 transition-colors ${currentTheme.textSub}`}>自动更新</span>
                  <div onClick={() => setAutoUpdate(!autoUpdate)} className={`w-[42px] h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${currentTheme.accent}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 translate-x-[18px]`}></div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleResumeAuto}
                  className={`flex items-center h-8 px-3.5 rounded-full backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-right-2 ${currentTheme.accent} text-white text-[12px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:opacity-90 active:scale-95`}
                >
                  <RefreshCw size={14} className="mr-1.5" strokeWidth={2.5} />
                  恢复自动
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center relative z-10 mb-6">
            <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center mb-4 transition-colors duration-700 shadow-inner ${
              isDark ? 'bg-white/5 text-indigo-300 border border-white/10' : 'bg-white/80 text-amber-500 border border-white'
            }`}>
               {currentTheme.icon}
            </div>
            <h2 className={`text-[24px] font-extrabold mb-1 tracking-wide transition-colors duration-700 ${currentTheme.textMain}`}>
              {currentTheme.name}
            </h2>
            <p className={`text-[15px] font-medium font-mono transition-colors duration-700 ${currentTheme.textSub}`}>
              {currentTheme.time}
            </p>
          </div>

          <p className={`text-[13px] leading-relaxed font-medium text-center relative z-10 transition-colors duration-700 ${currentTheme.textSub}`}>
            {currentTheme.desc}
          </p>
        </div>

        {/* 手动调节控制台 */}
        <div className="mb-8 relative z-10">
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className={`text-[16px] font-bold tracking-wide transition-colors ${currentTheme.textMain}`}>环境光微调</h3>
            <span className={`text-[11px] font-medium transition-colors ${currentTheme.textMuted}`}>滑动干预当前氛围</span>
          </div>

          <div className={`backdrop-blur-2xl rounded-[32px] p-6 border transition-all duration-700 ${
            isDark ? 'bg-black/20 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-white/40 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
          }`}>
            
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3.5">
                <div className={`flex items-center text-[14px] font-medium ${currentTheme.textSub}`}>
                  <Sun size={16} className="mr-2 opacity-70" /> 亮度控制
                </div>
                <span className={`text-[16px] font-extrabold font-mono ${currentTheme.textMain}`}>{brightness}<span className="text-[12px] ml-0.5 opacity-60">%</span></span>
              </div>
              <div className="relative h-3 rounded-full bg-black/10 dark:bg-black/30 flex items-center shadow-inner">
                <div className={`absolute left-0 h-full rounded-full transition-all duration-150 ${currentTheme.accent}`} style={{ width: `${brightness}%` }}></div>
                <input 
                  type="range" min="1" max="100" 
                  value={brightness} 
                  onChange={(e) => handleManualAdjust(setBrightness, e.target.value)} 
                  className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="absolute w-6 h-6 bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.2)] border border-slate-100 pointer-events-none z-10 transition-all duration-150 flex items-center justify-center" style={{ left: `calc(${brightness}% - 12px)` }}>
                  <div className={`w-2 h-2 rounded-full ${currentTheme.accent}`}></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3.5">
                <div className={`flex items-center text-[14px] font-medium ${currentTheme.textSub}`}>
                  <SlidersHorizontal size={16} className="mr-2 opacity-70" /> 色温冷暖
                </div>
                <span className={`text-[16px] font-extrabold font-mono ${currentTheme.textMain}`}>{colorTemp}<span className="text-[12px] ml-0.5 opacity-60">K</span></span>
              </div>
              <div className="relative h-3 rounded-full bg-gradient-to-r from-[#FF8A00] via-[#FFD68C] to-[#C4DEFF] flex items-center shadow-inner opacity-90">
                <input 
                  type="range" min="2000" max="7000" step="50"
                  value={colorTemp} 
                  onChange={(e) => handleManualAdjust(setColorTemp, e.target.value)} 
                  className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="absolute w-6 h-6 bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.25)] border border-slate-100 pointer-events-none z-10 transition-all duration-150 flex items-center justify-center" style={{ left: `calc(${((colorTemp-2000)/5000)*100}% - 12px)` }}>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 预设情绪场景区 */}
        <div className="relative z-10">
          <h3 className={`text-[16px] font-bold tracking-wide mb-4 px-1 transition-colors ${currentTheme.textMain}`}>场景切换</h3>
          <div className="grid grid-cols-2 gap-3.5 mb-2">
            {Object.values(sceneConfig).map(s => {
              const isActive = scene === s.id;
              return (
                <div 
                  key={s.id} 
                  onClick={() => handleSceneChange(s.id)}
                  className={`relative overflow-hidden rounded-[24px] p-5 flex flex-col items-start cursor-pointer transition-all duration-700 backdrop-blur-xl border ${
                    isActive 
                      ? s.cardActive + ' scale-[1.02] ' + (isDark ? 'bg-white/10 border-transparent' : 'bg-white/60 border-transparent')
                      : (isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 scale-100' : 'bg-white/30 border-white/50 hover:bg-white/50 shadow-sm scale-100')
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.cardBg} opacity-50 transition-opacity duration-700 ${isActive ? 'opacity-100' : ''}`}></div>
                  {isActive && <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl ${s.accent} opacity-40 animate-pulse`}></div>}
                  
                  <div className={`relative z-10 mb-4 transition-colors duration-500 ${isActive ? s.textMain : isDark ? 'text-indigo-300/60' : 'text-slate-500/80'}`}>
                    {React.cloneElement(s.icon, { size: 28 })}
                  </div>
                  <span className={`relative z-10 text-[14px] font-bold tracking-wide transition-colors duration-500 ${isActive ? s.textMain : isDark ? 'text-indigo-200/60' : 'text-slate-600'}`}>
                    {s.name}
                  </span>
                  
                  {isActive && (
                     <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${s.accent} shadow-[0_0_10px_currentColor] animate-pulse`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================
   一级 Tab 页面: 我的配置中心 (恢复缺失代码)
========================================= */
