import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { v4 as uuidv4 } from 'uuid';
import { Bot, MessageSquarePlus, Menu, X, ShieldAlert, Trash2, Settings } from 'lucide-react';
import { useChatStore, Message } from '../../../store/chat';
import { GeminiService } from '../../../core/services/GeminiService';
import { ChatBubble } from '../components/ChatBubble';
import { ChatInput } from '../components/ChatInput';
import { SuggestionChips } from '../components/SuggestionChips';
import { ChatSettingsModal } from '../components/ChatSettingsModal';
import { ChatRepository } from '../repositories/ChatRepository';
import { useAuthStore } from '../../../store/auth';
import { cn } from '../../../utils';

export const AiAssistantScreen: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    conversations, 
    activeConversationId, 
    isStreaming,
    setConversations,
    createConversation,
    setActiveConversation,
    deleteConversation,
    addMessage,
    updateMessage,
    setStreaming,
  } = useChatStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Load conversations from Firestore on mount
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      try {
        const fetched = await ChatRepository.getConversations(user.uid);
        if (fetched.length > 0) {
          setConversations(fetched);
          if (!activeConversationId) {
            setActiveConversation(fetched[0].id);
          }
        } else {
          // No history, create initial
          if (conversations.length === 0 && !activeConversationId) {
            createConversation();
          }
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchConversations();
  }, [user, setConversations, setActiveConversation, createConversation]);

  // Sync active conversation to Firestore when it changes
  useEffect(() => {
    if (user && activeConversation && activeConversation.messages.length > 0) {
      ChatRepository.saveConversation(user.uid, activeConversation).catch(err => {
        console.error('Failed to sync conversation:', err);
      });
    }
  }, [user, activeConversation?.messages, activeConversation?.title]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation?.messages, isStreaming]);

  const handleSend = async (text: string) => {
    if (!activeConversationId || !user) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    addMessage(activeConversationId, userMessage);

    const botMessageId = uuidv4();
    const initialBotMessage: Message = {
      id: botMessageId,
      role: 'model',
      text: '',
      timestamp: new Date().toISOString()
    };

    addMessage(activeConversationId, initialBotMessage);
    setStreaming(true);

    const allMessages = [...(activeConversation?.messages || []), userMessage];

    let fullResponse = '';
    
    await GeminiService.sendMessageStream(
      allMessages,
      (chunk) => {
        fullResponse += chunk;
        updateMessage(activeConversationId, botMessageId, fullResponse);
      },
      () => {
        setStreaming(false);
      },
      (error) => {
        console.error('Chat error:', error);
        updateMessage(activeConversationId, botMessageId, fullResponse + '\n\n**[Error: Failed to generate a response. Please try again later.]**');
        setStreaming(false);
      }
    );
  };

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    
    try {
      await ChatRepository.deleteConversation(user.uid, id);
      deleteConversation(id);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out dark:bg-gray-900 dark:border-gray-800 md:relative md:translate-x-0 flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Bot className="h-5 w-5 mr-2 text-pink-600" />
            AI Assistant
          </h2>
          <div className="flex items-center">
            <button onClick={() => setIsSettingsOpen(true)} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-md dark:hover:bg-gray-800 mr-1 hidden md:block">
              <Settings className="h-5 w-5" />
            </button>
            <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:bg-gray-100 p-1.5 rounded-md dark:hover:bg-gray-800">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-3">
          <button 
            onClick={() => {
              createConversation();
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="flex items-center justify-center w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium shadow-sm"
          >
            <MessageSquarePlus className="h-4 w-4 mr-2" />
            New Chat
          </button>
        </div>

        <div className="px-3 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 border-transparent focus:border-pink-500 focus:bg-white dark:focus:bg-gray-900 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none transition-colors"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2 mt-2">Recent</div>
          {isLoadingHistory ? (
            <div className="flex justify-center py-4">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-pink-200 border-t-pink-600"></div>
            </div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <div key={conv.id} className="relative group">
                <button
                  onClick={() => {
                    setActiveConversation(conv.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors truncate pr-10",
                    activeConversationId === conv.id 
                      ? "bg-pink-50 text-pink-700 font-medium dark:bg-pink-900/30 dark:text-pink-300" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  {conv.title}
                </button>
                <button 
                  onClick={(e) => handleDeleteConversation(conv.id, e)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:opacity-100"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
              No conversations found.
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-950 relative">
        {/* Header */}
        <header className="flex-shrink-0 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 flex items-center justify-between dark:border-gray-800 dark:bg-gray-900/80 sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-3 text-gray-500 hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-800 md:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
              {activeConversation?.title || 'New Conversation'}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-xs font-medium px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
              <ShieldAlert className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">AI guidance. Not emergency advice.</span>
              <span className="sm:hidden">Not emergency advice</span>
            </div>
            <button onClick={() => setIsSettingsOpen(true)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-md dark:hover:bg-gray-800 md:hidden">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
          <div className="max-w-4xl mx-auto">
            {activeConversation?.messages.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
                <div className="h-16 w-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 dark:bg-pink-900/30">
                  <Bot className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">How can I help you today?</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
                  I can provide educational information, help with safety planning, or discuss digital privacy.
                </p>
                <SuggestionChips onSelect={handleSend} />
              </motion.div>
            ) : (
              <div className="space-y-6 pb-4">
                {activeConversation?.messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
                {isStreaming && activeConversation?.messages[activeConversation.messages.length - 1]?.role === 'user' && (
                  <div className="flex items-center text-gray-500 text-sm mt-4 ml-14">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="flex-shrink-0 relative z-20">
          <ChatInput onSend={handleSend} isStreaming={isStreaming} disabled={!activeConversation} />
        </div>
      </main>

      {/* Settings Modal */}
      <ChatSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
