import React from 'react';
import { Brain, Image } from 'lucide-react';
import { HeaderProps, TabType } from '../types';

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs: { id: TabType; icon: React.ReactNode; label: string }[] = [
    { id: 'chat', icon: <Brain className="w-5 h-5" />, label: 'AI Assistant' },
    { id: 'image', icon: <Image className="w-5 h-5" />, label: 'Image Generation' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-b border-white/10 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-tektur font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              InnovAI
            </h1>
            <div className="flex space-x-4">
              {tabs.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === id
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}