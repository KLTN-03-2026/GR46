import { Logger } from '@nestjs/common';

const logger = new Logger('OpenAiClient');
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export type OpenAiMessage =
  | { role: 'system' | 'user' | 'assistant'; content: string; name?: string }
  | {
      role: 'assistant';
      content: string | null;
      tool_calls?: Array<{
        id: string;
        type: 'function';
        function: { name: string; arguments: string };
      }>;
    }
  | { role: 'tool'; content: string; tool_call_id: string };

export type OpenAiResponse = {
  choices: Array<{
    message: {
      role: string;
      content: string | null;
      tool_calls?: Array<{
        id: string;
        type: 'function';
        function: { name: string; arguments: string };
      }>;
    };
    finish_reason: string;
  }>;
};

export async function callOpenAi(
  messages: OpenAiMessage[],
  tools?: unknown[],
): Promise<OpenAiResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  if (!apiKey) {
    throw new Error('Chua cau hinh OPENAI_API_KEY trong .env');
  }
  const body: Record<string, unknown> = {
    model,
    messages,
    temperature: 0.4,
  };
  if (tools && tools.length > 0) {
    body.tools = tools;
    body.tool_choice = 'auto';
  }
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    logger.error(`OpenAI API error ${res.status}: ${text}`);
    throw new Error(`OpenAI loi: ${res.status}`);
  }
  return (await res.json()) as OpenAiResponse;
}
