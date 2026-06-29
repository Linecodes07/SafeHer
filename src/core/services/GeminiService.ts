import { Message } from '../../store/chat';

export const GeminiService = {
  async sendMessageStream(
    messages: Message[],
    onChunk: (text: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void
  ) {
    const formattedMessages = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const systemInstruction = {
      role: 'system',
      parts: [{
        text: `You are a supportive, respectful, and calm AI assistant for SafeHer, an application designed to help users dealing with domestic violence and unsafe situations. 
        
Guidelines:
1. Provide educational information on domestic violence, healthy relationships, safety planning, and digital privacy.
2. If the user appears to be in immediate danger, gently encourage them to use the app's SOS feature or contact local emergency services. Do not try to act as an emergency responder.
3. Be non-judgmental and supportive.
4. Clearly state that you are an AI, not a licensed therapist, lawyer, or emergency responder.
5. Offer helpful, practical steps for safety planning.
6. Avoid making promises about outcomes.
7. Use Markdown for formatting, including lists and bold text where helpful.`
      }]
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedMessages,
          systemInstruction,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) {
        throw new Error('Failed to get stream reader');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '');
            if (dataStr === '[DONE]') {
              onComplete();
              return;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.error) {
                throw new Error(data.error);
              }
              if (data.text) {
                onChunk(data.text);
              }
            } catch (e) {
              // Ignore parse errors on incomplete chunks
            }
          }
        }
      }
      onComplete();
    } catch (error: any) {
      onError(error);
    }
  }
};
