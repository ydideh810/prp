import React from 'react';
import { Message, TabType } from './types';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { InputForm } from './components/InputForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { generateImage } from './utils/imageGeneration';
import { generateChatResponse } from './utils/chat';

function App() {
  const [activeTab, setActiveTab] = React.useState<TabType>('chat');
  const [messages, setMessages] = React.useState<Message[]>([{
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m InnovAI, your innovation assistant. I can help analyze research papers, provide engineering insights, and assist with technical innovations. How can I help you today?'
  }]);
  const [imageMessages, setImageMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await generateChatResponse(messages.concat(userMessage));
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please check your API key configuration or try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setImageMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const imageUrl = await generateImage(input);
      const imageMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `![Generated Image](${imageUrl})`,
      };
      setImageMessages(prev => [...prev, imageMessage]);
    } catch (error) {
      console.error('Image generation error:', error);
      setImageMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I apologize, but I encountered an error generating the image. Please try again with a different description.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessages = activeTab === 'chat' ? messages : imageMessages;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-20 pb-24 max-w-7xl mx-auto px-4">
        <div className="chat-gradient rounded-lg p-4 min-h-[calc(100vh-12rem)] overflow-y-auto">
          {displayMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
        </div>
      </main>

      <InputForm
        input={input}
        activeTab={activeTab}
        onInputChange={setInput}
        onSubmit={activeTab === 'chat' ? handleChatSubmit : handleImageGeneration}
      />
    </div>
  );
}

export default App;