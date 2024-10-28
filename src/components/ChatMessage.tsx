import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Copy, Check } from 'lucide-react';
import { ChatMessageProps } from '../types';

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className={`flex gap-4 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex gap-3 max-w-3xl p-4 rounded-lg ${
          isUser ? 'bg-blue-500/20' : 'bg-purple-500/20'
        }`}
      >
        <div className="flex-shrink-0">
          {isUser ? (
            <User className="w-6 h-6 text-blue-400" />
          ) : (
            <Bot className="w-6 h-6 text-purple-400" />
          )}
        </div>
        <div className="prose prose-invert max-w-none overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const code = String(children).replace(/\n$/, '');

                if (!inline && match) {
                  return (
                    <div className="syntax-highlighter-container group relative">
                      <button
                        onClick={() => copyToClipboard(code)}
                        className="absolute right-2 top-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-10 flex items-center gap-2"
                        title="Copy code"
                      >
                        {copiedCode === code ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-white/70" />
                            <span className="text-sm text-white/70">Copy</span>
                          </>
                        )}
                      </button>
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.5rem',
                          background: '#1a1a1a',
                        }}
                        {...props}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
                return <code className={className} {...props}>{children}</code>;
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}