import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function ProfileTab({ onNavigate }) {
  const menuItems = [
    { icon: <Settings2 size={18}/>, label: '设备与自动化设置', color: 'text-indigo-500', bg: 'bg-indigo-50', action: () => onNavigate('deviceSettings') },
    { icon: <Bell size={18}/>, label: '通知设置', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: <Brain size={18}/>, label: '自动监测设置', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: <Lightbulb size={18}/>, label: '自动应用灯光方案', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: <Shield size={18}/>, label: '隐私与帮助', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: <Info size={18}/>, label: '关于 SleepEcho', color: 'text-slate-500', bg: 'bg-slate-100' },
  ];

  return (
    <div className="px-5 pt-12 pb-6 animate-in fade-in">
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-indigo-100 overflow-hidden mr-4">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Lin&backgroundColor=e0e7ff" alt="avatar" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-slate-800">Lin.</h2>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">个人用户</span>
            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded">已加入 42 天</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden mb-6">
        {menuItems.map((item, idx) => (
          <div key={idx} onClick={item.action} className={`p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 transition-colors ${idx !== menuItems.length - 1 ? 'border-b border-slate-50' : ''}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mr-3 ${item.bg} ${item.color}`}>
                {item.icon}
              </div>
              <span className="text-sm text-slate-700">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </div>
        ))}
      </div>
      <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-sm text-slate-500 font-medium flex items-center justify-center">
        <LogOut size={16} className="mr-2" /> 退出登录
      </button>
    </div>
  );
}

/* =========================================
   子视图: 阶段特征预警评估独立页 (恢复缺失代码)
========================================= */
