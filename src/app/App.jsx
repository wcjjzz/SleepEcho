import React, { useState, useEffect } from 'react';
import StartupPage from '../pages/StartupPage';
import LoginPage from '../pages/auth/LoginPage';
import BindingPage from '../pages/auth/BindingPage';
import MainApp from '../pages/MainApp';

export default function App() {
  const [route, setRoute] = useState('startup');
  const [activeTab, setActiveTab] = useState('home'); 
  const [subView, setSubView] = useState(null); 

  useEffect(() => {
    if (route === 'startup') {
      const timer = setTimeout(() => setRoute('login'), 2500); 
      return () => clearTimeout(timer);
    }
  }, [route]);

  const renderRoute = () => {
    switch (route) {
      case 'startup': return <StartupPage onClick={() => setRoute('login')} />;
      case 'login': return <LoginPage onLogin={() => setRoute('binding')} />;
      case 'binding': return <BindingPage onNext={() => setRoute('main')} />;
      case 'main': return <MainApp activeTab={activeTab} setActiveTab={setActiveTab} subView={subView} setSubView={setSubView} />;
      default: return <StartupPage />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4 font-sans">
      <div className="w-full max-w-[400px] h-[800px] bg-[#FAFAF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white">
        {renderRoute()}
      </div>
    </div>
  );
}

/* =========================================
   基础页面 (Startup, Login, Binding)
========================================= */
