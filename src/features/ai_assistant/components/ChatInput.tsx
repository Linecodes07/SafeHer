import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '../../../utils';

interface ChatInputProps {
  onSend: (text: string) => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isStreaming, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !isStreaming && !disabled) {
      onSend(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 dark:bg-gray-900 dark:border-gray-800">
      <div className="relative max-w-4xl mx-auto flex items-end bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-pink-500/50 focus-within:border-pink-500 transition-all px-4 py-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message SafeHer AI..."
          className="flex-1 max-h-[120px] bg-transparent resize-none outline-none py-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          rows={1}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || isStreaming || disabled}
          className={cn(
            "mb-1 ml-2 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full transition-colors",
            text.trim() && !isStreaming && !disabled
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
          )}
        >
          {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 ml-0.5" />}
        </button>
      </div>
      <div className="mt-2 text-center">
        <p className="text-[10px] text-gray-500 dark:text-gray-400">
          AI can make mistakes. Always verify important information and use the SOS feature if you are in danger.
        </p>
      </div>
    </div>
  );
};
