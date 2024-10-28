import React from 'react';
import { Send } from 'lucide-react';
import { InputFormProps } from '../types';

export function InputForm({ input, activeTab, onInputChange, onSubmit }: InputFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={
              activeTab === 'chat'
                ? 'Ask about research, engineering, or innovations...'
                : 'Describe the image you want to generate...'
            }
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Send className="w-5 h-5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </form>
  );
}