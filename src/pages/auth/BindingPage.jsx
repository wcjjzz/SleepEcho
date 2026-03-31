import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function BindingPage({ onNext }) {
  const [headbandStatus, setHeadbandStatus] = useState('searching');
  const [lightStatus, setLightStatus] = useState('unconnected');

  useEffect(() => { setTimeout(() => setHeadbandStatus('connected'), 1500); }, []);
  const handleConnectLight = () => {
    setLightStatus('searching');
    setTimeout(() => setLightStatus('connected'), 1500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-16 pb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-slate-800">连接设备</h1>
        <button onClick={onNext} className="text-sm text-slate-500">稍后设置</button>
      </div>
      <div className="px-6 space-y-4">
        <p className="text-sm text-slate-500 mb-6">为了获得完整的睡眠健康管理体验，请连接您的专属设备。</p>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${headbandStatus === 'connected' ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-100 text-slate-400'}`}>
            <Brain className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-800">睡眠监测头环</h3>
            <p className="text-xs text-slate-500 mt-1">{headbandStatus === 'connected' ? 'TH25A - 已连接' : '正在搜索附近设备...'}</p>
          </div>
          <div>{headbandStatus === 'connected' ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>}</div>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${lightStatus === 'connected' ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-400'}`}>
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-800">智能睡眠调控灯</h3>
            <p className="text-xs text-slate-500 mt-1">{lightStatus === 'connected' ? '已连接' : lightStatus === 'searching' ? '正在连接...' : '未连接'}</p>
          </div>
          <div>
            {lightStatus === 'connected' ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : lightStatus === 'searching' ? <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div> : 
              <button onClick={handleConnectLight} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">去绑定</button>
            }
          </div>
        </div>
      </div>
      <div className="mt-auto p-6">
        <button onClick={onNext} className={`w-full py-4 rounded-2xl font-medium text-lg transition-colors ${headbandStatus === 'connected' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}>
          进入首页
        </button>
      </div>
    </div>
  );
}

/* =========================================
   主应用框架 & 导航
========================================= */
