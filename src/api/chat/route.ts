import { MistralStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    return new Response('Missing Mistral API key', { status: 400 });
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
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
                     You analyze research papers, provide technical insights, and help with engineering concepts.
                     Your responses should be detailed, technically accurate, and focused on innovation.`
          },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate AI response');
    }

    const stream = MistralStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500 }
    );
  }
}