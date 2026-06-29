import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { cn } from '../../../utils';
import { Message } from '../../../store/chat';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[85%] sm:max-w-[75%]", isUser ? "flex-row-reverse" : "flex-row")}>
        
        {/* Avatar */}
        <div className={cn(
          "flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full",
          isUser ? "ml-3 bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300" : "mr-3 bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300"
        )}>
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>

        {/* Message Content */}
        <div className={cn(
          "flex flex-col",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "px-4 py-3 rounded-2xl",
            isUser 
              ? "bg-pink-600 text-white rounded-tr-none" 
              : "bg-white border border-gray-200 text-gray-900 shadow-sm rounded-tl-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          )}>
            <div className={cn("prose prose-sm max-w-none dark:prose-invert", isUser && "prose-p:text-white prose-a:text-pink-200")}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 mx-1">
            {format(new Date(message.timestamp), 'h:mm a')}
          </span>
        </div>
      </div>
    </div>
  );
};
