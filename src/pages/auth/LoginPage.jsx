import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  return (
    <div className="w-full h-full flex flex-col bg-slate-50 relative animate-in slide-in-from-bottom-4 duration-500">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-indigo-100 to-slate-50 -z-10"></div>
      <div className="px-8 pt-24 pb-8">
        <h1 className="text-3xl font-medium text-slate-800 mb-2">欢迎来到</h1>
        <h2 className="text-4xl font-light text-indigo-600 tracking-wide mb-10">SleepEcho</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <Smartphone className="w-5 h-5 text-slate-400 mr-3" />
              <input type="text" placeholder="手机号/邮箱" className="bg-transparent border-none outline-none w-full text-slate-700" />
            </div>
            <div className="flex items-center bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <Shield className="w-5 h-5 text-slate-400 mr-3" />
              <input type="password" placeholder="密码" className="bg-transparent border-none outline-none w-full text-slate-700" />
            </div>
          </div>
          <div className="flex justify-between items-center text-sm px-1">
            <span className="text-slate-500">验证码登录</span>
            <span className="text-slate-500">忘记密码？</span>
          </div>
          <button onClick={onLogin} className="w-full bg-indigo-600 text-white rounded-2xl py-4 font-medium text-lg shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
            登录 / 注册
          </button>
        </div>
      </div>
      <div className="mt-auto pb-10 px-8 flex items-start text-xs text-slate-400">
        <div className="w-4 h-4 rounded-full border border-slate-300 mr-2 flex-shrink-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
        </div>
        <p>我已阅读并同意 <span className="text-indigo-500">《用户协议》</span> 与 <span className="text-indigo-500">《隐私政策》</span></p>
      </div>
    </div>
  );
}
