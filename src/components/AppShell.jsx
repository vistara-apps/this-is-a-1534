import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Zap, BarChart3, Settings, Upload, PlusCircle } from 'lucide-react';

export function AppShell({ children }) {
  const [activeTab, setActiveTab] = useState('generate');

  const tabs = [
    { id: 'generate', label: 'Generate', icon: PlusCircle },
    { id: 'campaigns', label: 'My Ads', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">AdSpark AI</h1>
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white border border-white/20'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-between px-6">
            <h2 className="text-xl font-semibold text-white capitalize">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <ConnectButton />
          </header>

          {/* Content */}
          <main className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
            {React.cloneElement(children, { activeTab })}
          </main>
        </div>
      </div>
    </div>
  );
}