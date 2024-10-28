import { Message } from '../types';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export async function generateChatResponse(messages: Message[]): Promise<string> {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing Mistral API key');
  }

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-medium',
        messages: [
          {
            role: 'system',
            content: `You are InnovAI, an advanced AI innovation agent specializing in helping inventors and researchers. 
                     You excel at:
                     - Analyzing research papers and providing insights
                     - Offering engineering solutions and technical calculations
                     - Suggesting innovative approaches to technical challenges
                     - Explaining complex scientific concepts
                     - Helping with technical documentation and specifications
                     
                     Provide detailed, technically accurate responses focused on innovation and engineering excellence.`
          },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate AI response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
}