export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type TabType = 'chat' | 'image';

export interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export interface ChatMessageProps {
  message: Message;
}

export interface InputFormProps {
  input: string;
  activeTab: TabType;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}