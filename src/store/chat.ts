import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  isStreaming: boolean;
  
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: string | null) => void;
  createConversation: (title?: string) => string;
  deleteConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, text: string) => void;
  setStreaming: (isStreaming: boolean) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  isLoading: false,
  isStreaming: false,

  setConversations: (conversations) => set({ conversations }),
  
  setActiveConversation: (id) => set({ activeConversationId: id }),

  createConversation: (title = 'New Conversation') => {
    const newConv: Conversation = {
      id: uuidv4(),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
    };
    set((state) => ({
      conversations: [newConv, ...state.conversations],
      activeConversationId: newConv.id,
    }));
    return newConv.id;
  },

  deleteConversation: (id) => set((state) => ({
    conversations: state.conversations.filter((c) => c.id !== id),
    activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
  })),

  addMessage: (conversationId, message) => set((state) => {
    const updatedConversations = state.conversations.map((c) => {
      if (c.id === conversationId) {
        // If it's the first user message, we could update the title here 
        const isFirstUserMsg = message.role === 'user' && c.messages.filter(m => m.role === 'user').length === 0;
        return {
          ...c,
          title: isFirstUserMsg ? message.text.slice(0, 30) + (message.text.length > 30 ? '...' : '') : c.title,
          messages: [...c.messages, message],
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    
    // Move updated conversation to top
    const convIndex = updatedConversations.findIndex(c => c.id === conversationId);
    if (convIndex > 0) {
      const conv = updatedConversations[convIndex];
      updatedConversations.splice(convIndex, 1);
      updatedConversations.unshift(conv);
    }
    
    return { conversations: updatedConversations };
  }),

  updateMessage: (conversationId, messageId, text) => set((state) => ({
    conversations: state.conversations.map((c) => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: c.messages.map((m) => m.id === messageId ? { ...m, text } : m),
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    }),
  })),

  setStreaming: (isStreaming) => set({ isStreaming }),
}));
