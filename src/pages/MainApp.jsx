import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, Sun, Folder, User, ChevronRight, Brain, Lightbulb, Bell, LogOut, CheckCircle, ChevronLeft, Moon, Cloud, Sunrise, Settings2, Activity, Download, Shield, Info, Smartphone, ArrowLeft, AlertCircle, Battery, Clock, ChevronDown, MoreHorizontal, Loader2, Sparkles, Search, Calendar, ArrowRight, Target, AlignLeft, Eye, SkipBack, SkipForward, RefreshCw, BarChart, SlidersHorizontal, FileSearch, Filter, Play } from 'lucide-react';
import NavItem from '../components/navigation/NavItem';
import HomeTab from './tabs/HomeTab';
import ReportCenterTab from './tabs/ReportCenterTab';
import LightTab from './tabs/LightTab';
import RecordCenterTab from './tabs/RecordCenterTab';
import ProfileTab from './tabs/ProfileTab';
import StageDetailView from './subviews/StageDetailView';
import DeviceSettingsView from './subviews/DeviceSettingsView';
import MonitoringPrepView from './subviews/MonitoringPrepView';
import ProfessionalReportView from './subviews/ProfessionalReportView';

export default function MainApp({ activeTab, setActiveTab, subView, setSubView }) {
  if (subView === 'stageDetail') return <StageDetailView onBack={() => setSubView(null)} />;
  if (subView === 'deviceSettings') return <DeviceSettingsView onBack={() => setSubView(null)} />;
  if (subView === 'monitoringPrep') return <MonitoringPrepView onBack={() => setSubView(null)} onNavigate={setSubView} />;
  if (subView === 'professionalReport') return <ProfessionalReportView onBack={() => setSubView(null)} />;

  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAF9] relative overflow-hidden animate-in fade-in duration-300">
      <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        {activeTab === 'home' && <HomeTab onNavigate={setSubView} setActiveTab={setActiveTab} />}
        {activeTab === 'report' && <ReportCenterTab onNavigate={setSubView} />}
        {activeTab === 'light' && <LightTab />}
        {activeTab === 'archive' && <RecordCenterTab onNavigate={setSubView} />}
        {activeTab === 'profile' && <ProfileTab onNavigate={setSubView} />}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50">
        <NavItem icon={<Home />} label="首页" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavItem icon={<FileText />} label="报告" isActive={activeTab === 'report'} onClick={() => setActiveTab('report')} />
        <NavItem icon={<Sun />} label="灯光" isActive={activeTab === 'light'} onClick={() => setActiveTab('light')} />
        <NavItem icon={<Folder />} label="记录" isActive={activeTab === 'archive'} onClick={() => setActiveTab('archive')} />
        <NavItem icon={<User />} label="我的" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </div>
    </div>
  );
}
