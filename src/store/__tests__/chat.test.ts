import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from '../chat';

describe('Chat Store', () => {
  beforeEach(() => {
    useChatStore.setState({
      conversations: [],
      activeConversationId: null,
      isLoading: false,
      isStreaming: false,
    });
  });

  it('should create a new conversation', () => {
    const id = useChatStore.getState().createConversation('Test Conv');
    const state = useChatStore.getState();
    expect(state.conversations.length).toBe(1);
    expect(state.conversations[0].title).toBe('Test Conv');
    expect(state.activeConversationId).toBe(id);
  });

  it('should add a message', () => {
    const id = useChatStore.getState().createConversation('Test Conv');
    useChatStore.getState().addMessage(id, {
      id: 'msg1',
      role: 'user',
      text: 'Hello',
      timestamp: new Date().toISOString()
    });

    const state = useChatStore.getState();
    expect(state.conversations[0].messages.length).toBe(1);
    expect(state.conversations[0].messages[0].text).toBe('Hello');
  });
});
